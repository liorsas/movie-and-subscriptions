const jFile = require("jsonfile");

function writeToUserFile(obj) {
  return new Promise((resolve, reject) => {
    jFile.writeFile(__dirname + "/users.json", obj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("succeded");
      }
    });
  });
}

module.exports = { writeToUserFile };
