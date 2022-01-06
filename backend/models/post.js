module.exports = (sequelize, DataTypes ) => {
    const Post = sequelize.define('Post', {// MySQL 에는 'User' => users 로 테이블이 생성된다.
        //id가 기본적으로 들어있다.
        content:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // UserId
    }, {
        charset: 'utf8mb4', // 이렇게 셋팅안하면 한글(이모지)넣을시 에라남.
        collate: 'utf8mb4_general_ci', //한글(이모지)저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers'}); // 좋아요 누른 유저들
        db.Post.belongsTo(db.Post, {as: 'Retweet'});
    };
    return Post;
}