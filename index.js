const serverless = require('serverless-http');
const { createApp } = require('@lhci/server');

let handler;

module.exports.handler = async (event, context, callback) => {
  try {
    if (!handler) {
      const { app } = await createApp({
        storage: {
          storageMethod: 'sql',
          sqlDialect: 'postgres',
          sqlConnectionSsl: true,
          sqlConnectionUrl: process.env.DB_URL,
          sqlDialectOptions: { ssl: true },
        },
      });
      handler = serverless(app);
    }
    const result = await handler(event, context);
    return result;
  } catch (err) {
    console.error(err);
    callback(err);
  }
};
