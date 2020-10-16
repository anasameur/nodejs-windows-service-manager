import arg from "arg";
import inquirer from "inquirer";
import { installService, uninstallService } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--script-path": String,
      "--service-name": String,
      "--service-description": String,
      "-s": "--script-path",
      "-n": "--service-name",
      "-d": "--service-description",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    scriptPath: args["--script-path"],
    serviceName: args["--service-name"],
    serviceDescription: args["--service-description"],
    command: args._[0],
  };
}

async function promptForMissingOptions(options) {
  const questions = [];

  if (!options.command) {
    questions.push({
      type: "list",
      name: "command",
      message: "Please choose which action to use",
      choices: ["install", "uninstall"],
    });
  }

  if (!options.scriptPath) {
    questions.push({
      type: "input",
      name: "scriptPath",
      message: "Please specify a script path",
    });
  }

  if (!options.serviceName) {
    questions.push({
      type: "input",
      name: "serviceName",
      message: "Please specify a service name",
    });
  }

  if (!options.serviceDescription) {
    questions.push({
      type: "input",
      name: "serviceDescription",
      message: "Please specify a service description",
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    scriptPath: options.scriptPath || answers.scriptPath,
    serviceName: options.serviceName || answers.serviceName,
    serviceDescription:
      options.serviceDescription || answers.serviceDescription,
    command: options.command || answers.command,
  };
}

export async function cli(args) {
  let options;
  try {
    options = parseArgumentsIntoOptions(args);
  } catch (error) {
    console.log("Usage: node-service-manegement <command> [...options]");
  }
  options = await promptForMissingOptions(options);
  switch (options.command) {
    case "install":
      installService(options);
      break;
    case "uninstall":
      uninstallService(options);
      break;
    default:
      break;
  }
}
