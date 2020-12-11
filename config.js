var mongo_url;
if (process.env.MONGO_HOST !== undefined) {
  mongo_url = 'mongodb://'+ process.env.MONGO_HOST +':27017/graymatter';
}
const config = {
    mongoURL: mongo_url || 'mongodb://mongo:27017/graymatter',
    port: process.env.PORT || 8000,
    secret: 'your_jwt_secret'
  };
  
module.exports = config;