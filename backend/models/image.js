module.exports = (sequelize, DataTypes ) => {
    const Image = sequelize.define('Image', {// MySQL 에는 'User' => users 로 테이블이 생성된다.
        //id가 기본적으로 들어있다.
        src: {
            type:DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8', // 이렇게 셋팅안하면 한글넣을시 에라남.
        collate: 'utf8_general_ci', //한글저장
    });
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
}