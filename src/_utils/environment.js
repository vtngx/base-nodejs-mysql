// eslint-disable-next-line no-undef
const getEnvironmentSetting = async () => {
  // let databaseAccount;
  // let googleCloudServicePath;
  // let googleCloudService;

  process.env.NODE_ENV = process.env.NODE_ENV || 'localhost';

  console.log('Init - Start on environment:' + process.env.NODE_ENV);
  const config = await require('../config/config.json');

  switch (process.env.NODE_ENV) {
    case 'development':
      // databaseAccount = await JSON.stringify(require('../config/keys/dev/databaseAccount.json'));
      // googleCloudService = await JSON.stringify(require('../config/keys/dev/googleCloudService.json'));
      // googleCloudServicePath = 'config/keys/dev/googleCloudService.json';
      break;
    case 'production':
      break;
    default:
      process.env.databaseAccount = JSON.stringify(config[process.env.NODE_ENV]);
      break;
  }

  // eslint-disable-next-line require-atomic-updates
  // process.env.databaseAccount = databaseAccount;
  // process.env.googleCloudService = googleCloudService;
  // process.env.googleCloudServicePath = googleCloudServicePath;

  console.log('Init - Start on environment successfully.');
};

module.exports = {
  getEnvironmentSetting: getEnvironmentSetting
};
