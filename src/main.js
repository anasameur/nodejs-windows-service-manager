import chalk from "chalk";
import { Service } from "node-windows";

export async function installService(options) {
  // Create a new service object
  var svc = new Service({
    name: options.serviceName,
    description: options.serviceDescription,
    script: options.scriptPath,
  });

  try {
    svc.install();
  } catch (error) {
    console.error("%s install the service", chalk.red.bold("ERROR"));
  }
  // Listen for the "install" event, which indicates the
  // process is available as a service.
  svc.on("install", function () {
    console.log("%s Service installed successfuly.", chalk.green.bold("DONE"));
    console.log("Starting the service .....");
    svc.start();
    
  });
  svc.on("install", function () {
    console.log("%s Service Started successfuly.", chalk.green.bold("DONE"));
  });
  svc.on("error", function (error) {
    console.log("%s an error occured", chalk.red.bold("ERROR"),error);
  });
  return true;
}

export async function uninstallService(options) {
  // Create a new service object
  var svc = new Service({
    name: options.serviceName,
    script: options.scriptPath,
  });

  try {
    svc.uninstall();
  } catch (error) {
    console.error("%s uninstall the service", chalk.red.bold("ERROR"));
  }

  // Listen for the "uninstall" event so we know when it's done.
  svc.on("uninstall", function () {
    console.log("%s Service uninstall successfuly.", chalk.green.bold("DONE"));
    console.log("The service exists: ", svc.exists);
  });
  return true;
}
