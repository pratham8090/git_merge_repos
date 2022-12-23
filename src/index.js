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
  commands.push("cd " + fileNameRepoAll);
  commands.push("git clone " + req.body.repo_1);
  commands.push("git clone " + req.body.repo_2);

  commands.push("cd " + fileNameRepo1);
  commands.push("rm -r .git");
  commands.push("cd ..");

  commands.push("cd " + fileNameRepo2);
  commands.push("rm -r .git");
  commands.push("cd ..");

  commands.push('git commit -m "merge rep-frontend"');
  commands.push('git push');

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
    console.log('Running ['+ commands[i] +']');
    await exec(commands[i], (error, stdout, stderr) => {
      if (error) {
        console.log(`Error while running ${commands[i]}: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`Stderr while running ${commands[i]}: ${stderr}`);
        return;
      }
      console.log(`Stdout while running ${commands[i]}: ${stdout}`);
    });
  }
});

app.listen(process.env.PORT || 5000, function () {
  console.log("Express app running on port " + (process.env.PORT || 5000));
});
