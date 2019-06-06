//CHECK env
const env = process.env.NODE_ENV || 'production';

//GET .env config file
const config = require('./config.json');
const envConfig = config[env];

// add .env config values to process.env
Object.keys(envConfig).forEach(key => (process.env[key] = envConfig[key]));
