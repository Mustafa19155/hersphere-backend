const Promotion = require("../models/promotion");
const Job = require("../models/job");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const Workplace = require("../models/workplace");

exports.influencerAnalysis = async (req, res, next) => {
  try {
    const promotions = await Promotion.find({
      influencerID: req.userId,
    }).populate("transactionID reviewID");

    const totalPromotions = promotions.length;
    // check for successful promotions
    const successfulPromotions = promotions.filter(
      (promotion) => promotion.status === "completed"
    ).length;

    // check for pending promotions
    const pendingPromotions = promotions.filter(
      (promotion) => promotion.status === "pending"
    ).length;

    // check for rejected promotions
    const rejectedPromotions = promotions.filter(
      (promotion) => promotion.status === "rejected"
    ).length;

    // check for failed promotions
    const failedPromotions = promotions.filter(
      (promotion) => promotion.status === "failed"
    ).length;

    // calculate success rate
    let successRate;

    if (successfulPromotions === 0 && failedPromotions === 0) {
      successRate = 0;
    } else {
      successRate =
        (successfulPromotions / (successfulPromotions + failedPromotions)) *
        100;
    }

    // divide promotions in 12 months
    const monthlyPromotions = [];
    for (let i = 0; i < 12; i++) {
      const monthPromotions = promotions.filter(
        (promotion) => promotion.createdAt.getMonth() === i
      );
      monthlyPromotions.push(monthPromotions.length);
    }

    // calculate total earnings
    const totalEarnings = promotions
      .filter((pr) => pr.status == "completed")
      .reduce((acc, promotion) => acc + promotion.transactionID.amount, 0);

    // calculate average rating
    const averageRating =
      promotions
        .filter((pr) => pr.reviewID)
        .reduce((acc, promotion) => {
          console.log(promotion.reviewID);
          if (promotion.reviewID) {
            return acc + promotion.reviewID.rating;
          }
          return acc;
        }, 0) / promotions.filter((pr) => pr.reviewID).length;

    // calculate accpeted promotions
    const acceptedPromotions = promotions.filter(
      (promotion) =>
        promotion.status === "completed" ||
        promotion.status === "not-started" ||
        promotion.status === "failed"
    ).length;

    res.status(200).json({
      acceptedPromotions,
      totalPromotions,
      successfulPromotions,
      pendingPromotions,
      rejectedPromotions,
      failedPromotions,
      successRate,
      monthlyPromotions,
      totalEarnings,
      averageRating,
    });
  } catch (err) {
    next(err);
  }
};

exports.startupAnalysis = async (req, res, next) => {
  try {
    const workplaces = await Workplace.find();
    const jobs = await Job.find();
    const promotions = await Promotion.find().populate("transactionID");

    // calculate job acceptance rate
    const jobAcceptanceRate =
      (jobs.filter((job) => job.employee.userID).length / jobs.length) * 100;

    // calculate total spent
    const totalSpent =
      promotions
        .filter((pro) => pro.status != "failed" && pro.transactionID)
        .reduce((acc, promotion) => acc + promotion.transactionID.amount, 0) +
      jobs.reduce((acc, job) => acc + job.price, 0);

    res.json({
      totalWorkplaces: workplaces.length,
      totalJobs: jobs.length,
      totalPromotions: promotions.length,
      jobAcceptanceRate,
      totalSpent,
    });
  } catch (err) {
    next(err);
  }
};
// Function to calculate Jaccard similarity
const calculateJaccardSimilarity = (skillTokens, groupKeyTokens) => {
  const intersectionSize = skillTokens.filter((token) =>
    groupKeyTokens.includes(token)
  ).length;
  const unionSize =
    skillTokens.length + groupKeyTokens.length - intersectionSize;
  return intersectionSize / unionSize;
};

// Function to group similar skills together
function groupSimilarSkills(skillsMap) {
  const groupedSkills = new Map();
  const threshold = 0.5; // Adjust as needed

  skillsMap.forEach((count, skill) => {
    let matchedGroup = null;
    const skillTokens = new Set(tokenizer.tokenize(skill));

    groupedSkills.forEach((groupSkills, groupKey) => {
      const groupKeyTokens = new Set(tokenizer.tokenize(groupKey));
      const similarity = calculateJaccardSimilarity(
        [...skillTokens],
        [...groupKeyTokens]
      );

      if (similarity >= threshold) {
        matchedGroup = groupKey;
      }
    });

    if (matchedGroup) {
      groupedSkills.get(matchedGroup).push(skill);
    } else {
      groupedSkills.set(skill, [skill]);
    }
  });

  return groupedSkills;
}

exports.skillRecommendation = async (req, res, next) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find();

    // Extract skills from jobs and count their occurrences
    const skillsMap = new Map();
    jobs.forEach((job) => {
      job.skillset.forEach((skill) => {
        const normalizedSkill = skill.toLowerCase();
        if (skillsMap.has(normalizedSkill)) {
          skillsMap.set(normalizedSkill, skillsMap.get(normalizedSkill) + 1);
        } else {
          skillsMap.set(normalizedSkill, 1);
        }
      });
    });

    // Group similar skills together
    const groupedSkills = groupSimilarSkills(skillsMap);

    const recommendedSkills = Array.from(groupedSkills.entries())
      .sort((a, b) => b[1].length - a[1].length) // Sort by group size in descending order
      .map(([_, skills]) => skills[0])
      .slice(0, 5); // Extract only the representative skill from each group

    res.json({ recommendedSkills });
  } catch (error) {
    // Handle errors
    next(error);
  }
};
