const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");

async function convertModel(pbFilePath, outputDir) {
  // Load the TensorFlow model
  const model = await tf.node.loadSavedModel(pbFilePath, ["serve"]);

  // Convert the TensorFlow model to JSON
  const jsonModel = model.toJSON();

  // Write the JSON model to a file
  fs.writeFileSync(`${outputDir}/model.json`, JSON.stringify(jsonModel));

  console.log("Model converted to JSON successfully.");
}

// Example usage:
const pbFilePath = "./one_step";
const outputDir = "./a";

convertModel(pbFilePath, outputDir);
