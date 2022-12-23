const express = require("express");
const app = express();
const cors = require("cors");
const { exec } = require("child_process");
var path = require("path");

app.use(express.json());

app.use(cors());

app.post("/test", async function (req, res) {
  let fileNameRepoAll = path.basename(req.body.repo_all);
  fileNameRepoAll = fileNameRepoAll.substring(0, fileNameRepoAll.indexOf("."));

  let fileNameRepo1 = path.basename(req.body.repo_1);
  fileNameRepo1 = fileNameRepo1.substring(0, fileNameRepo1.indexOf("."));

  let fileNameRepo2 = path.basename(req.body.repo_2);
  fileNameRepo2 = fileNameRepo2.substring(0, fileNameRepo2.indexOf("."));

  let commands = [];
  commands.push("git clone " + req.body.repo_all);
  
  commands.push(
    "git clone " + req.body.repo_1 + " " + fileNameRepoAll + "/repo1"
  );
  commands.push(
    "git clone " + req.body.repo_2 + " " + fileNameRepoAll + "/repo2"
  );

  commands.push("rm -rf git_merge/repo1/.git");
  commands.push("rm -rf git_merge/repo2/.git");

  commands.push("git add .");
  commands.push('git commit -m "merge rep-frontend"');
  commands.push("git push");

  for (let i = 0; i < commands.length; i++) {
    await new Promise((resolve, reject) => {
      console.log("Running [" + commands[i] + "]");
      exec(commands[i], (error, stdout, stderr) => {
        if (error) {
          console.log(`Error while running ${commands[i]}: ${error.message}`);
          reject(error);
        }
        if (stderr) {
          console.log(`Stderr while running ${commands[i]}: ${stderr}`);
          resolve(stderr);
        }
        console.log(`Stdout while running ${commands[i]}: ${stdout}`);
        resolve(stdout);
      });
    });
  }
  
  return res.send({ success: true });
});

app.listen(process.env.PORT || 5000, function () {
  console.log("Express app running on port " + (process.env.PORT || 5000));
});
