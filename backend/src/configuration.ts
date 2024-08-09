export default () => ({
  environment: process.env.NODE_ENV || 'development',
  deploymentMode: process.env.DEPLOYMENT_MODE || 'API',
  port: parseInt(process.env.PORT, 10) || 3200,
  database: {
    url: process.env.DATABASE_URL,
  },
});
