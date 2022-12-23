const express = require("express");
const app = express();
const cors = require("cors");
const { exec } = require("child_process");
var path = require("path");

app.use(express.json());

app.use(cors());

app.post("/test", async function (req, res) {
  //   return res.send(req.body);
  let fileNameRepoAll = path.basename(req.body.repo_all);
  fileNameRepoAll = fileNameRepoAll.substring(0, fileNameRepoAll.indexOf("."));

  let fileNameRepo1 = path.basename(req.body.repo_1);
  fileNameRepo1 = fileNameRepo1.substring(0, fileNameRepo1.indexOf("."));

  let fileNameRepo2 = path.basename(req.body.repo_2);
  fileNameRepo2 = fileNameRepo2.substring(0, fileNameRepo2.indexOf("."));

  let commands = [];
  commands.push("git clone " + req.body.repo_all);
  // commands.push("cd " + fileNameRepoAll);
  commands.push("git clone " + req.body.repo_1 + " "+ fileNameRepoAll +"/repo1");
  commands.push("git clone " + req.body.repo_2 + " "+ fileNameRepoAll +"/repo2");

  // commands.push("cd " + fileNameRepo1);
  commands.push("rmdir repo1/.git");
  // commands.push("cd ..");

  // commands.push("cd " + fileNameRepo2);
  commands.push("rmdir repo2/.git");
  // commands.push("cd ..");

  // commands.push('git commit -m "merge rep-frontend"');
  // commands.push('git push');

  // console.log(commands);
  // return;

  // exec("git clone " + req.body.repo_all, (error, stdout, stderr) => {
  //   if (error) {
  //     console.log(`error: ${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.log(`stderr: ${stderr}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  // });
  
  for (let i = 0; i < commands.length; i++) {
      console.log("inLoop")
    await new Promise((resolve, reject) => {
      console.log("inFunction")
      console.log('Running ['+ commands[i] +']');
      exec(commands[i], (error, stdout, stderr) => {
        if (error) {
          console.log(`Error while running ${commands[i]}: ${error.message}`);
          reject(error)
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
});

app.listen(process.env.PORT || 5000, function () {
  console.log("Express app running on port " + (process.env.PORT || 5000));
});
