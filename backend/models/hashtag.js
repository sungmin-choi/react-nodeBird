module.exports = (sequelize, DataTypes ) => {
    const Hashtag = sequelize.define('Hashtag', {// MySQL 에는 'User' => users 로 테이블이 생성된다.
        //id가 기본적으로 들어있다.
        name: {
            type:DataTypes.STRING(20),
        },
    }, {
        charset: 'utf8mb4', // 이렇게 셋팅안하면 한글넣을시 에라남.
        collate: 'utf8mb4_general_ci', //한글저장
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'}); // 다대다 관계
    };
    return Hashtag;
}