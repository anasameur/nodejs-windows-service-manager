var Service = require('node-windows').Service;

const args = process.argv.slice(2);
const command = args[0];
const serviceScript = args[1];
const serviceName = args[2];
const serviceDescription = args[3];
console.log(command);

// Create a new service object
var svc = new Service({
  name: serviceName,
  description: serviceDescription,
  script: serviceScript
});

switch (command) {
  case 'install':
    svc.install();
    // Listen for the "install" event, which indicates the
    // process is available as a service.
    svc.on('install', function () {
      console.log('Service installed successfuly.');
      console.log('Starting the service .....')
      svc.start();
      console.log('Service Started successfuly')
    });
    break;
  case 'uninstall':
    // Uninstall the service.
    svc.uninstall();
    // Listen for the "uninstall" event so we know when it's done.
    svc.on('uninstall', function () {
      console.log('Uninstall complete.');
      console.log('The service exists: ', svc.exists);
    });
    break;
  default:
    console.log('The service manager accept install or uninstall command \n pls try again with one of this tow option')
    break;
}
