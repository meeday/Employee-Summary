const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];
// Write code to use inquirer to gather information about the development team members,
function init() {
  // first prompt to select the type of employee
  inquirer
    .prompt([{
      type: "list",
      message: "What is the job title of your employee?",
      name: "jobTitle",
      choices: ["Manager", "Engineer", "Intern", "Employee List Complete"]
    }])
    // if function runs different prompt functions based on type of employee selected
    .then((answers) => {
      if (answers.jobTitle === "Manager") {
        renderManager();
      } else if (answers.jobTitle === "Engineer") {
        renderEngineer();
      } else if (answers.jobTitle === "Intern") {
        renderIntern();
      } else {
        writeFile();
      }
    });
}
// prompt questions for manager
function renderManager() {
  inquirer
    .prompt([{
        type: "input",
        name: "name",
        message: "What is the manager's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is the manager's ID?"
      },
      {
        type: "input",
        name: "email",
        message: "What is you manager's Email"
      },
      {
        type: "input",
        name: "OfficeNumber",
        message: "What is your manager's office number?",
      }
    ]).then(answers => {
      const manager = new Manager(answers.name, answers.id, answers.email, answers.OfficeNumber);
      team.push(manager);
      init();
    });

}
// prompt questions for engineer
function renderEngineer() {
  inquirer
    .prompt([{
        type: "input",
        name: "name",
        message: "What is your engineer's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is your engineer's ID?"
      },
      {
        type: "input",
        name: "email",
        message: "What is your engineer's Email"
      },
      {
        type: "input",
        name: "github",
        message: "What is your engineer's gitHub username?"
      }
    ])
    .then(answers => {
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      team.push(engineer);
      init();
    });
}
// prompt questions for intern
function renderIntern() {
  inquirer
    .prompt([{
        type: "input",
        name: "name",
        message: "What is your intern's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is your intern's ID?"
      },
      {
        type: "input",
        name: "email",
        message: "What is your intern's Email"
      },
      {
        type: "input",
        name: "school",
        message: "What school did your intern attend?"
      }
    ])
    .then(answers => {
      const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
      team.push(intern);
      init();
    });
}

init();

function writeFile() {
  console.log("File created!");
  fs.writeFileSync(outputPath, render(team), "utf-8");
}