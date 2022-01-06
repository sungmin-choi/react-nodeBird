module.exports = (sequelize, DataTypes ) => {
    const User = sequelize.define('User', {// MySQL 에는 'User' => users 로 테이블이 생성된다.
        //id가 기본적으로 들어있다.
        email: {
            type: DataTypes.STRING(30),
            allowNull: false, //필수
            unique: true, //고유한값
        },
        nicknameL: {
            type: DataTypes.STRING(30),
            allowNull: false, //필수
        },
        password: {
            type: DataTypes.STRING(100),// 비밀번호는 암호화 되기떄문에 길게 설정해놓는다.
            allowNull: false, //필수
        },
    }, {
        charset: 'utf8', // 이렇게 셋팅안하면 한글넣을시 에라남.
        collate: 'utf8_general_ci', //한글저장
    });
    User.associate = (db) => { //관계 설정하는 구간.
        db.User.hasMany(db.Post); // 유저가 많은 포스트를 가질 수 있다.
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked'}); // 내가 좋아요 누른 포스트들 {테이블 이름은 : Like, User 이름을 Liked 로}
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Follwer', foreignKey: 'FollowingId'});
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Following', foreignKey: 'FollowerId'});
    };
    return User;
}