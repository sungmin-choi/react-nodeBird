const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; //설정한 config 에서 'development' config 가져오자.
const db ={};

const sequelize = new Sequelize(config.database, config.username, config.password, config);// 시퀄라이즈 노드랑mysql 연결해주는 역할.

db.Comment = require('./comment')(sequelize, Sequelize); // 모델 불러오고 실행해준다.
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Post = require('./Post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
