module.exports = (sequelize, DataTypes ) => {
    const Comment = sequelize.define('Comment', {// MySQL 에는 'User' => users 로 테이블이 생성된다.
        //id가 기본적으로 들어있다.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // UserId: 1, 관계가 belongsTo 인경우 어디에 해당하는지 관계 colum 이 생긴다.
        // PostId: 3,
    }, {
        charset: 'utf8mb4', // 이렇게 셋팅안하면 한글넣을시 에라남.
        collate: 'utf8mb4_general_ci', //한글저장
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
}