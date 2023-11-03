const jwt = require("jsonwebtoken");

exports.verifyJWT = async (req, res, next) => {
  //   const token = req.headers.authorization?.split(" ")[1];
  // const token = req.headers.cookie.split("jwt=")[1];
  const token = req.headers.authorization;
  //   console.log(token.split("jwt=")[1]);
  // const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).send("Unauthorized");
  } else {
    try {
      const data = jwt.verify(token, process.env.TOKEN_SECRET);
      req.userId = data.userId;
      next();
    } catch (err) {
      return res.status(401).send("Unauthorized");
    }
  }
};
