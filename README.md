# π― React-nodeBird νλ‘μ νΈ

> νλ‘ νΈ: React λ₯Ό ν΅ν νΈμν° ν΄λ‘  νλ‘μ νΈ (Next.js)νλ μμν¬λ₯Ό ν΅ν ssr κΈ°λ²μ μ μ νκ² μ¬μ©νμ¬ μ΅μ ν ν νλ‘μ νΈ μλλ€.<br>

> λ°±μλ:

# π Tech Stack

<p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
    <img src="https://img.shields.io/badge/Next-0f0303?style=flat-square&logo=Next.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/express-fff?style=flat-square&logo=express.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/AntDesign-546de5?style=flat-square&logo=antDesign&logoColor=white"/>
    <img src="https://img.shields.io/badge/styledComponents-c44569?style=flat-square&logo=styledComponents&logoColor=white"/>
</p>

# π― κ΅¬νκΈ°λ₯

### `pages:`

1.ννμ΄μ§(index.js)

2.νλ‘ννμ΄μ§(profile.js)

3.νμκ°μνμ΄μ§(signup.js)

### `components`:

1.μ±λ μ΄μμ(AppLayout.js)

> pageλ€ κ°μΈλ λ μ΄μμ μ»΄ν¬λνΈ
> κ°μ’ νμ΄μ§λ€ λ§ν¬ ν¬ν¨ν λ€μ΄λΉκ²μ΄ν° ν¬ν¨.

# βκ³΅λΆνλ©΄μ λ°°μ΄μ 

### 1.eslint μΆκ° λ° μ€μ .

`eslint:` μ½λλ₯Ό λΆμν΄ λ¬Έλ²μ μΈ μ€λ₯λ μν° ν¨ν΄μ μ°Ύμμ£Όκ³  μΌκ΄λ μ½λ μ€νμΌλ‘ μμ±νλλ‘ λμμ€λλ€.<br>
`eslint μ€μ μ μ€μμ±:` νμμ ν λ Eslint μ½λ κ·μΉμ μ νλ©΄ λ€λ₯Έμ¬λλ€μ μ½λλ λ€ κ°μ μ€νμΌλ‘ λ³Ό μ μμ΄μ μ’λ€.<br>

μ§κΈμ react νλ‘μ νΈλ₯Ό νκΈ°λλ¬Έμ μ€μΉν΄μ€κ² 4κ°μ λ λλ€
<img src="images/EslintSetting.png">
<br>

### 2.μ΄λ° eslint μΈν:

μμ§ μ λλ‘ eslintμ λν΄μ λ°°μ΄κ² μμ΄μ μΌλ¨ κΈ°λ³Έμ μΈ μΈνλ°©μμ μ°Έμ‘°νμλ€.<br>
.eslintrc νμΌ μμ±ν λ°λ€ μ¬μ§κ³Ό κ°μ΄ μλ ₯.
<img src="images/eslintSetting2.png">
<br>

### 3.aνκ·Έ μ¬μ©μ μμ°½μΌλ‘ λμ°λ μμ± target="\_blank" μΈλ rel = "noreferrer noopener" κ°μ΄ λ£μ΄μ£Όμ.(λ³΄μλ¬Έμ  λλ¬Έμ μ°λκ²μ΄ μ’λ€.)

<br>

### 4.reactμμ virtual dom μμμ inline μ€νμΌλ§ νλ©΄ μ΅μ νμ λ°©ν΄κ° λλ€

μλ₯Ό λ€μ΄μ

```js
<Button style={{ backgroundColor: 'black' }} type='link'>
  <Link href='/signup'>
    <a>νμκ°μ</a>
  </Link>
</Button>
```

virtual dom μμ±ν λ inline μΌλ‘ `style={{backgroundColor:"black"}}` μ΄λ κ² μ€νμΌλ§μ νλ€λ©΄ λ§€λ² rerendering ν λλ§λ€ μ΄ `<Button></Button>` μλ¦¬λ¨ΌνΈλ λ€μ μμ±ν΄μ λ€μ κ·Έλ¦¬κ² λ κ±°λ€. μλνλ©΄ style μμμ κ·Έλ¦΄λλ§λ€ μλ‘μ΄ κ°μ²΄λ₯Ό `{}==={} //κ²°κ³Ό: false(κ°μ²΄λ κ°μ λ΄μ©μ΄μ΄λ λ€λ₯΄κΈ° λλ¬Έμ΄λ€.)`μμ±νκΈ° λλ¬Έμ reactμμλ λ§€λ² rerendering ν λλ§λ€ κ°μ μ€νμΌλ§μ΄μ§λ§ λ€λ₯Έ κ°μ²΄λ‘ μΈμν΄μ λ§€μ° ν¨μ¨μ λ¨μ΄μ§λ€. ν΄κ²°λ°©λ²μ μ΄λ κ² inline μμΌλ‘ μ€νμΌλ§μ νλκ²μ΄ μλ λ°λ‘ λΉΌλ΄μ μ€νμΌλ§ νλκ²μ΄ μ΅μ νμ λμμ΄λλ€.

### 5.λ¦¬λμ€ μ κ΄νμ¬

λ΄μ©μ΄ κΈΈλ€λ³΄λ λ²¨λ‘κ·Έμλ€κ° μμ±νλ€. <br>

- <a href="https://velog.io/@sungmin-choi/%EB%A6%AC%EB%8D%95%EC%8A%A4-%EC%82%AC%EC%9A%A9%EA%B8%B0....-with-next.js1">λ¦¬λμ€ κΈ°λ‘ 1</a> <br/>
- <a href="https://velog.io/@sungmin-choi/%EB%A6%AC%EB%8D%95%EC%8A%A4-%EC%82%AC%EC%9A%A9%EA%B8%B0....with-Next.js2">λ¦¬λμ€ κΈ°λ‘ 2</a>

### 6.input type="file" κ³Ό λ²νΌμ°λνλ λ°©λ²

```jsx
const imageInput = useRef() // react hook useRef μ¬μ©ν΄μ λμμ λ₯Ό κ°μ Έμ¨λ€.

const onImageUpload = useCallback(() = >{
  imageInput.current.click() // μ΄λ κ² μ¬μ©νλ©΄ λ²νΌ λλ₯΄λ©΄ μλ‘λ μ°½μ΄ λ¬λ€.

},[imageInput.current]) // imageInput.current μν

<input type="file" accept="image/*" multiple hidden ref={imageInput} /> // hidden μμ±μ λ£μ΄μ κ°μΆκΈ° ref(useRef react hooks λ₯Ό μ¨μ domμμ κ°μ Έμ¨λ€.)
<button onclick={onImageUpload}>μ΄λ―Έμ§ μλ‘λ</button>

```

### 7.immer λμ

λ¦¬λμ€μμ λΆλ³μ±μ μ§ν€κΈ°μν΄ reducerμμ λ³΅μ‘ν μ½λλ₯Ό κ΅¬νν΄μΌν λκ° λ§λ€ μ΄λ΄λ νΈνκ² κ΅¬ννλΌκ³  λμ¨ λΌμ΄λΈλ¬λ¦¬μ΄λ€.

```
npm i immer // μ€μΉ
```

λ°μ μ½λλ₯Ό λ³΄μλ©΄ λΆλ³μ±μ μ§ν€κΈ°μν΄ μμ±ν μ½λκ° κ΅μ₯ν κ°λμ±λ λ¨μ΄μ§κ³  μλ¬λκΈ°μ¬μ΄ μ½λλΌκ³  λ³Όμκ°μλ€.

```js
    case ADD_COMMENT_SUCCESS:
    {
      const postIndex = state.mainPosts.findIndex((y) => y.id === action.data.id);
      const post = { ...state.mainPosts[postIndex] };
      post.Comment = [dummyComment(action.data.content), ...post.Comment];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
        mainPosts,
      };
```

```js
//reducers/user.js
import produce from 'immer'; // immer μν¬νΈ ν΄μ£Όκ³ 

const reducer = (state = initialState, action) => {};
```

### 8.MySQL κ³Ό μνλΌμ΄μ¦ μ°κ²°λ° λͺ¨λΈ μ€κ³.

λ°±μλ ν΄λμμ

1. `sequelize` `sequelize-cli` `mysql2`μ€μΉ ν΄μ€λ€.

```
npm i sequelize sequelize-cli mysql2
```

2. `sequelize` μΈνν΄μ£ΌκΈ°.

```
npx sequelize init
```

3. configν΄λμμ config.json νμΌ μ€μ  ν΄μ£ΌκΈ°.

```json
{
  "development": {
    //κ°λ°ν λ μ¬μ©νλ λ°μ΄ν°λ² μ΄μ€
    "username": "root",
    "password": "1234", // μκΈ°κ³μ  λΉλ°λ²νΈ
    "database": "react-nodebird", // νλ‘μ νΈ μ΄λ¦
    "host": "127.0.0.1", // κΈ°λ³ΈμΌλ‘ localhost λ‘ μ€μ λ¨.
    "dialect": "mysql"
  },
  "test": {
    // νμ€νΈμ© λ°μ΄ν°λ² μ΄μ€.
    "username": "root",
    "password": null,
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    // λ°°ν¬μ© λ°μ΄ν°λ² μ΄μ€.
    "username": "root",
    "password": null,
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

4. models/index.js μ΄κΈ°μν

```js
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; //μ€μ ν config μμ 'development' config κ°μ Έμ€μ.
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
); // μνλΌμ΄μ¦ λΈλλmysql μ°κ²°ν΄μ£Όλ μ­ν .

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

5. λͺ¨λΈ λ§λ€κΈ° μμμ©μΌλ‘ userλͺ¨λΈκ³Ό postλͺ¨λΈμ λ§λ€μ΄ λ³΄κ² λ€. μμΉλ models ν΄λμμ λ§λ€μ΄μ€λ€

μ μ λͺ¨λΈ:

```js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      // MySQL μλ 'User' => users λ‘ νμ΄λΈμ΄ μμ±λλ€.
      //idκ° κΈ°λ³Έμ μΌλ‘ λ€μ΄μλ€.
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, //νμ
        unique: true, //κ³ μ νκ°
      },
      nicknameL: {
        type: DataTypes.STRING(30),
        allowNull: false, //νμ
      },
      password: {
        type: DataTypes.STRING(100), // λΉλ°λ²νΈλ μνΈν λκΈ°λλ¬Έμ κΈΈκ² μ€μ ν΄λλλ€.
        allowNull: false, //νμ
      },
    },
    {
      charset: 'utf8', // μ΄λ κ² μνμνλ©΄ νκΈλ£μμ μλΌλ¨.
      collate: 'utf8_general_ci', //νκΈμ μ₯
    }
  );
  User.associate = (db) => {
    //κ΄κ³ μ€μ νλ κ΅¬κ°.
    db.User.hasMany(db.Post); // μ μ κ° λ§μ ν¬μ€νΈλ₯Ό κ°μ§ μ μλ€.
  };
  return User;
};
```

ν¬μ€νΈλͺ¨λΈ:

```js
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      // MySQL μλ 'User' => users λ‘ νμ΄λΈμ΄ μμ±λλ€.
      //idκ° κΈ°λ³Έμ μΌλ‘ λ€μ΄μλ€.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4', // μ΄λ κ² μνμνλ©΄ νκΈ(μ΄λͺ¨μ§)λ£μμ μλΌλ¨.
      collate: 'utf8mb4_general_ci', //νκΈ(μ΄λͺ¨μ§)μ μ₯
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
  };
  return Post;
};
```

6. λͺ¨λΈλ€ index.js μ λΆλ¬μ€κ³  μ°κ²°μμΌμ£ΌκΈ°

```js
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; //μ€μ ν config μμ 'development' config κ°μ Έμ€μ.
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
); // μνλΌμ΄μ¦ λΈλλmysql μ°κ²°ν΄μ£Όλ μ­ν .

db.Comment = require('./comment')(sequelize, Sequelize); // λͺ¨λΈ λΆλ¬μ€κ³  μ€νν΄μ€λ€.
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Post = require('./Post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

7. express μ db μ°κ²°νκΈ°.
   app.js

```js
const express = require('express');
const app = express();
const port = 3065;
const postRouter = require('./routes/post');
const db = require('./models'); // models/index.js μμ db κ°μ Έμ€κΈ°.
db.sequelize
  .sync() // λΉλκΈ° μ°κ²° μλ.
  .then(() => {
    console.log('db μ°κ²° μ±κ³΅');
  })
  .catch(console.error);

app.use('/post', postRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
```

db ν΄λΉ νλ‘μ νΈμ λ¨Όμ  μμ±ν΄μ€μλ€.

```
npx sequelize db:create
```

db μ°κ²°μ±κ³΅ λ©μμ§ λ¨λ©΄ μ°κ²°μ΄ λκ±°λ€.
κ·Έλ¦¬κ³  λ§€λ² λ°±μλμͺ½ κ³ μΉλ©΄ dbλ₯Ό μλ‘κ³ μΉ¨ ν΄μΌν  λ€μ κ·μ°?μμ μ΄ μλ€ κ·Έλμ κ·Έλ°κ±Έ ν΄κ²°νκΈ° μν΄μ

```
npm i -D nodemon
```

μ€μΉν΄μ£Όκ³  κ°λ°μ μμνμ.
ν¨ν€μ§.json κ°μ "node app.js" => 'nodemon app.js'

```json
  "scripts": {
    "dev": "nodemon app.js" //=>'nodemon app.js' μ΄λ κ² λ°κΏμ£ΌμΈμ
  },
```

npm run dev λ‘ μ€ν.

7. passport.js μ¬μ©κΈ°(passport-local)Β μ λ΅μ§κΈ°.

passport λΌμ΄λΈλ¬λ¦¬ μ€μΉ

```
npm install passport
```

μ΄λ©μΌ κ³Ό λΉλ°λ²νΈλ‘ λ‘κ·ΈμΈ νκΈ°μν΄μ passport-local μ€μΉ

```
npm install passport-local
```

passport.js λ `session` μν΅ν΄μ μ λ³΄λ₯Ό μν΅νκΈ° λλ¬Έμ session middleware λ₯Ό μ¬μ©ν΄μΌνλ€.

κΈ°λ³Έ app.js

```js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3065;
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models'); // models/index.js μμ db κ°μ Έμ€κΈ°.
const passportConfig = require('./passport');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

db.sequelize
  .sync() // λ°μ΄ν°λ² μ΄μ€ μνλΌμ΄μ¦ μ°κ²°μ©
  .then(() => {
    console.log('db μ°κ²° μ±κ³΅');
  })
  .catch(console.error);

passportConfig();

app.use(
  cors({
    // cors λ¬Έμ  ν΄κ²° npm i cors
    origin: '*', // *: λͺ¨λ λλ©μΈ νμ©
    credentials: false, //
  })
);

app.use(express.json()); //νλ‘ νΈμμ λ°μ λ°μ΄ν°κ° json ννμ΄λ¨ json λ°μ΄ν°λ₯Ό req.body μ λ£μ΄μ€λ€.
app.use(express.urlencoded({ extended: true })); // νλ‘ νΈμμ λ°μ λ°μ΄ν°κ° formνμ λ°μ΄ν° μΌλ  νΌλ°μ΄ν°λ₯Ό req.body μ λ£μ΄μ€λ€.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize()); // ν¨μ€ν¬νΈ μ€μ  λ―Έλ€μ¨μ΄μ μΆκ°.
app.use(passport.session());

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
```

ν¨μ€ν¬νΈ νμ μ€μ 

```js
const express = require('express');
const app = express();
const passport = require('passport');
const passportConfig = require('./passport'); // passport μ κΈ°λ³Έ μ€μ μ λ°λ‘ μͺΌκ°μ λ£μ΄λ§λ€

passportConfig(); // passportConfig λΆλ¬μ€κΈ°.

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
); // μΈμμ λ―Έλ€μ¨μ΄μ μΆκ° ν΄μ€μΌ passport μ μν΅ν μμλ€.

app.use(passport.initialize()); // ν¨μ€ν¬νΈ μ€μ  λ―Έλ€μ¨μ΄μ μΆκ°.
app.use(passport.session());
```

userRouter.js:

```js
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models'); //λͺ¨λΈ  models/index μμ κ°μ Έμ€κΈ°
const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason); // λ‘κ·ΈμΈ λ¬Έμ  μκ²»μλ λ³΄ν΅ 401λ‘ μ μ.
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.log(loginErr);
        return next(loginErr);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});
```

passportConfig.js:

```js
const passport = require('passport');
const local = require('./local'); // λ‘μ»¬ μλ€κ° passport-local μ λ΅ κ΅¬ν
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });
  local(); // μ λ΅ νΈμΆ.
};
```

local.js: passport-local μ λ΅

```js
const passport = require('passport');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: {
              email,
            },
          });
          if (!user) {
            return done(null, false, { reason: 'μ‘΄μ¬νμ§ μλ μ¬μ©μμλλ€.' }); // done(μλ²μλ¬,μ±κ³΅μ λ¬΄,ν΄λΌμ΄μΈνΈμλ¬)
          }
          const result = await bcrypt.compare(password, user.password); // ν΄μ¬μνΈνλ λΉλ°λ²νΈκ° μΌμΉνμ§ λΉκ΅νλ€.
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: 'λΉλ°λ²νΈκ° νλ Έμ΅λλ€' });
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
};
```

#### passport.js λ₯Ό μ΄μ©ν local μ λ΅ λ‘κ·ΈμΈ νλ¦

1. νλ‘ νΈμμ email κ³Ό password λ°μ΄ν°λ₯Ό λ°μμ `/login` μ£Όμλ‘ req.body λ‘ μ μ‘

```js
outer.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => { //μΈμ¦ν λ°λ μ½λ°±ν¨μ done(err,user,info)
    ....
});
```

2. req.body κ°κ°μ§κ³  new LocalStrategy() λ‘ μ΄λ

```js
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // νλ‘ νΈμμ λ°μ email (req.body.email)
      passwordField: 'password', // νλ‘ νΈμμ λ°μ password (req.body.password)
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          // λΉλκΈ°λ₯Ό ν΅ν΄μ λ°μ΄ν°λ² μ΄μ€ Userνμ΄λΈμμ ν΄λΉ λ‘κ·ΈμΈ email μ΄ μλμ§ νμΈνκ³  μ°Ύμμ€λ€.
          where: {
            email,
          },
        });
        if (!user) {
          // email μ μ κ° μλ€λ©΄
          return done(null, false, { reason: 'μ‘΄μ¬νμ§ μλ μ¬μ©μμλλ€.' }); // done(μλ²μλ¬,μ±κ³΅μ λ¬΄,ν΄λΌμ΄μΈνΈμλ¬)
        }
        const result = await bcrypt.compare(password, user.password); // ν΄μ¬μνΈνλ λΉλ°λ²νΈκ° μΌμΉνμ§ λΉκ΅νλ€.
        if (result) {
          // λΉλ°λ²νΈκ° λ§λ€λ©΄
          return done(null, user);
        }
        return done(null, false, { reason: 'λΉλ°λ²νΈκ° νλ Έμ΅λλ€' });
      } catch (error) {
        //μλ²μλ¬
        console.log(error);
        return done(error);
      }
    }
  )
);
```

3. done(err,user,info) μ½λ°±ν¨μ λ°μμ μ‘°μνκΈ°

```js
router.post('/login', (req, res, next) => {
  //req,res,next μ¬μ©νκΈ° μν΄μ νμ₯ λ―Έλ€μ¨μ΄ νλ μ½λ©λ°©μ μ§ν
  passport.authenticate('local', (err, user, info) => {
    //done μ½λ°±ν¨μ μ¬κΈ°μ λ°λλ€
    if (err) {
      // μλ² μλ¬ λ«μλ
      console.log(err);
      return next(err);
    }
    if (info) {
      // ν΄λΌμ΄μΈνΈμͺ½ μλ² λ¬Έμ  μκ²»μλ
      return res.status(401).send(info.reason); // λ‘κ·ΈμΈ λ¬Έμ  μκ²»μλ λ³΄ν΅ 401λ‘ μ μ.
    }
    return req.login(user, async (loginErr) => {
      // μ μμ μ΄κ² user λ°μμμλ  μ¬κΈ° μ§νλλ©΄μ λμμ  serializeUser μͺ½λ μ€νν΄μΌνλ€.
      if (loginErr) {
        //λ‘κ·ΈμΈ λμ€ μλ¬
        console.log(loginErr);
        return next(loginErr);
      }
      return res.status(200).json(user); // μ±κ³΅νλ©΄ user μ λ³΄λ₯Ό νλ‘ νΈλ‘ μ μ‘
    });
  })(req, res, next);
});
```

4.  req.login(user, async (loginErr)=>) passport λ‘κ·ΈμΈ μ€νλ¨λ λ°μ λΆλΆλ λμμ μ€νμ΄ λλ€

```js
passport.serializeUser((user, done) => {
  done(null, user.id); //λ°±μλ session μ userid μ μ₯ νλ‘ νΈμλ μνΈνλ userμ λ³΄ λ₯Ό μΏ ν€μ μ μ₯.
});

passport.deserializeUser(async (id, done) => {
  // λ‘κ·ΈμΈ ν μνμμ λ§€λ² μ μ μ λ³΄ λΆλ¬μ¬λ μ€νμ΄ λλ€.
  try {
    const user = await User.findOne({
      // User λͺ¨λΈμμ μ§κΈ λ‘κ·ΈμΈν id κ°κ³Ό μΌμΉν μ λ³΄λ₯Ό user μ λ΄λλ€
      where: {
        id,
      },
    });
    done(null, user); // μ°Ύμ μ μ  λ°ν. req.user μ΄λ κ² μ λ³΄λ₯Ό μ μ₯
  } catch (err) {
    console.error(err);
    done(err);
  }
});
```

### μ΄λ―Έμ§ μλ‘λλ₯Ό μν multer

μ΄λ―Έμ§,λΉλμ€ κ°μ λ°μ΄ν°λ₯Ό μ£Όκ³  λ°μλλ from νμμ multipart λ°μ΄ν°νΌμΌλ‘ μ£Όκ³ λ°λλ€.
multipart λ°μ΄ν°λ₯Ό μ²λ¦¬ λ¨Όμ  ν λ €λ©΄ multer λ₯Ό μ€μΉλ₯Ό ν΄μ£Όμ.

```
npm i multer
```

μ μ‘νλ νλ‘ νΈ form:

```js
<Form
  style={{ margin: '10px 0 20px' }}
  encType='multipart/form-data'
  onFinish={onSubmit}
>
  {' '}
  // μ΄λ―Έμ§λ λμμ μ?κΈΈλ encType="multipart/form-data"
  <Input.TextArea
    maxLength={140}
    value={text}
    onChange={onChangeText}
    placeholder='μ΄λ€ μ κΈ°ν μΌμ΄ μμλμ?'
  />
  <div style={{ marginTop: '10px' }}>
    <input
      type='file'
      accept='image/*'
      name='image'
      multiple
      hidden
      ref={imageInput}
    />{' '}
    // upload.array('image') λ name = 'image' κ° νμνλ€.
    <Button onClick={onImageInput}>μ΄λ―Έμ§ μλ‘λ</Button>
    <Button
      type='primary'
      style={{ float: 'right' }}
      loading={addPostLoading}
      htmlType='submit'
    >
      μ§Ήμ§Ή!
    </Button>
  </div>
  <div>
    {imagePaths.map((imgpath) => {
      <div key={imgpath} style={{ display: 'inline-block' }}>
        <img src={imgpath} style={{ width: '200px' }} alt={imgpath} />
        <div>
          <Button>μ κ±°</Button>
        </div>
      </div>;
    })}
  </div>
</Form>
```

backend μμ μ λ³΄λ₯Ό λ°κ³  λ³΄λΌλ

```js
const upload = multer({
  // multipart νμμ΄ λ§€λ² λ€λ₯΄κΈ° λλ¬Έμ μ΄λ κ² λ³νν΄μ£Όλ μμμ΄ νμνλ€.
  storage: multer.diskStorage({
    // νμ€νΈ ν λλ λ‘μ»¬ νλλμ€ν¬μ μ¬μ§μ μ₯ν΄μ νμ€νΈλ₯Ό νλ€.
    destination(req, file, done) {
      // μ μ₯μμΉ
      done(null, 'uploads'); // uploads ν΄λμ μ μ₯.
    },
    filename(req, file, done) {
      // νμΌμ λ³΄. apple.png
      const ext = path.extname(file.originalname); // νμ₯μ μΆμΆ (.png)
      const basename = path.basename(file.originalname, ext); //apple
      done(null, basename + new Date().getTime() + ext); // λμΌ μ΄λ¦ λ°©μ§λ₯Ό μν΄μ μλ‘λ μκ°κΉμ§ μ΄λ¦μ μΆκ°.
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //20MB
});

router.post(
  './images',
  isLoggedIn,
  upload.array('image'),
  async (req, res, next) => {
    try {
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);
```
