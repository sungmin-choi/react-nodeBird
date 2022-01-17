# 🎯 React-nodeBird 프로젝트

> 프론트: React 를 통한 트위터 클론 프로젝트 (Next.js)프레임워크를 통한 ssr 기법을 적절하게 사용하여 최적화 한 프로젝트 입니다.<br>

> 백엔드:

# 🛠Tech Stack

<p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
    <img src="https://img.shields.io/badge/Next-0f0303?style=flat-square&logo=Next.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/express-fff?style=flat-square&logo=express.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/AntDesign-546de5?style=flat-square&logo=antDesign&logoColor=white"/>
    <img src="https://img.shields.io/badge/styledComponents-c44569?style=flat-square&logo=styledComponents&logoColor=white"/>
</p>

# 🎯 구현기능

### `pages:`

1.홈페이지(index.js)

2.프로필페이지(profile.js)

3.회원가입페이지(signup.js)

### `components`:

1.앱레이아웃(AppLayout.js)

> page들 감싸는 레이아웃 컴포넌트
> 각종 페이지들 링크 포함한 네이비게이터 포함.

# ❓공부하면서 배운점

### 1.eslint 추가 및 설정.

`eslint:` 코드를 분석해 문법적인 오류나 안티 패턴을 찾아주고 일관된 코드 스타일로 작성하도록 도와줍니다.<br>
`eslint 설정에 중요성:` 협업을 할때 Eslint 코드 규칙을 정하면 다른사람들의 코드도 다 같은 스타일로 볼 수 있어서 좋다.<br>

지금은 react 프로젝트를 하기때문에 설치해준게 4개정도 된다
<img src="images/EslintSetting.png">
<br>

### 2.초반 eslint 세팅:

아직 제대로 eslint에 대해서 배운게 없어서 일단 기본적인 세팅방식을 참조하였다.<br>
.eslintrc 파일 생성후 밑네 사진과 같이 입력.
<img src="images/eslintSetting2.png">
<br>

### 3.a태그 사용시 새창으로 띄우는 속성 target="\_blank" 쓸때 rel = "noreferrer noopener" 같이 넣어주자.(보안문제 때문에 쓰는것이 좋다.)

<br>

### 4.react에서 virtual dom 안에서 inline 스타일링 하면 최적화에 방해가 된다

예를 들어서

```js
<Button style={{ backgroundColor: 'black' }} type='link'>
  <Link href='/signup'>
    <a>회원가입</a>
  </Link>
</Button>
```

virtual dom 작성할때 inline 으로 `style={{backgroundColor:"black"}}` 이렇게 스타일링을 한다면 매번 rerendering 할때마다 이 `<Button></Button>` 엘리먼트는 다시 생성해서 다시 그리게 될거다. 왜냐하면 style 안에서 그릴때마다 새로운 객체를 `{}==={} //결과: false(객체는 같은 내용이어도 다르기 떄문이다.)`생성하기 때문에 react에서는 매번 rerendering 할때마다 같은 스타일링이지만 다른 객체로 인식해서 매우 효율을 떨어진다. 해결방법은 이렇게 inline 식으로 스타일링을 하는것이 아닌 따로 빼내서 스타일링 하는것이 최적화에 도움이된다.

### 5.리덕스 에 관하여

내용이 길다보니 벨로그에다가 작성했다. <br>

- <a href="https://velog.io/@sungmin-choi/%EB%A6%AC%EB%8D%95%EC%8A%A4-%EC%82%AC%EC%9A%A9%EA%B8%B0....-with-next.js1">리덕스 기록 1</a> <br/>
- <a href="https://velog.io/@sungmin-choi/%EB%A6%AC%EB%8D%95%EC%8A%A4-%EC%82%AC%EC%9A%A9%EA%B8%B0....with-Next.js2">리덕스 기록 2</a>

### 6.input type="file" 과 버튼연동하는 방법

```jsx
const imageInput = useRef() // react hook useRef 사용해서 돔요소 를 가져온다.

const onImageUpload = useCallback(() = >{
  imageInput.current.click() // 이렇게 사용하면 버튼 누르면 업로드 창이 뜬다.

},[imageInput.current]) // imageInput.current 소환

<input type="file" accept="image/*" multiple hidden ref={imageInput} /> // hidden 속성을 넣어서 감추기 ref(useRef react hooks 를 써서 dom요소 가져온다.)
<button onclick={onImageUpload}>이미지 업로드</button>

```

### 7.immer 도입

리덕스에서 불변성을 지키기위해 reducer에서 복잡한 코드를 구현해야할때가 많다 이럴때 편하게 구현하라고 나온 라이브러리이다.

```
npm i immer // 설치
```

밑에 코드를 보시면 불변성을 지키기위해 작성한 코드가 굉장히 가독성도 떨어지고 에러나기쉬운 코드라고 볼수가있다.

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
import produce from 'immer'; // immer 임포트 해주고

const reducer = (state = initialState, action) => {};
```

### 8.MySQL 과 시퀄라이즈 연결및 모델 설계.

백엔드 폴더에서

1. `sequelize` `sequelize-cli` `mysql2`설치 해준다.

```
npm i sequelize sequelize-cli mysql2
```

2. `sequelize` 세팅해주기.

```
npx sequelize init
```

3. config폴더안에 config.json 파일 설정 해주기.

```json
{
  "development": {
    //개발할때 사용하는 데이터베이스
    "username": "root",
    "password": "1234", // 자기계정 비밀번호
    "database": "react-nodebird", // 프로젝트 이름
    "host": "127.0.0.1", // 기본으로 localhost 로 설정됨.
    "dialect": "mysql"
  },
  "test": {
    // 테스트용 데이터베이스.
    "username": "root",
    "password": null,
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    // 배포용 데이터베이스.
    "username": "root",
    "password": null,
    "database": "react-nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

4. models/index.js 초기셋팅

```js
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; //설정한 config 에서 'development' config 가져오자.
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
); // 시퀄라이즈 노드랑mysql 연결해주는 역할.

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

5. 모델 만들기 예시용으로 user모델과 post모델을 만들어 보겠다. 위치는 models 폴더에서 만들어준다

유저모델:

```js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      // MySQL 에는 'User' => users 로 테이블이 생성된다.
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
        type: DataTypes.STRING(100), // 비밀번호는 암호화 되기떄문에 길게 설정해놓는다.
        allowNull: false, //필수
      },
    },
    {
      charset: 'utf8', // 이렇게 셋팅안하면 한글넣을시 에라남.
      collate: 'utf8_general_ci', //한글저장
    }
  );
  User.associate = (db) => {
    //관계 설정하는 구간.
    db.User.hasMany(db.Post); // 유저가 많은 포스트를 가질 수 있다.
  };
  return User;
};
```

포스트모델:

```js
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      // MySQL 에는 'User' => users 로 테이블이 생성된다.
      //id가 기본적으로 들어있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4', // 이렇게 셋팅안하면 한글(이모지)넣을시 에라남.
      collate: 'utf8mb4_general_ci', //한글(이모지)저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
  };
  return Post;
};
```

6. 모델들 index.js 에 불러오고 연결시켜주기

```js
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; //설정한 config 에서 'development' config 가져오자.
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
); // 시퀄라이즈 노드랑mysql 연결해주는 역할.

db.Comment = require('./comment')(sequelize, Sequelize); // 모델 불러오고 실행해준다.
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

7. express 와 db 연결하기.
   app.js

```js
const express = require('express');
const app = express();
const port = 3065;
const postRouter = require('./routes/post');
const db = require('./models'); // models/index.js 에서 db 가져오기.
db.sequelize
  .sync() // 비동기 연결 시도.
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.use('/post', postRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
```

db 해당 프로젝트에 먼저 생성해줍시다.

```
npx sequelize db:create
```

db 연결성공 메시지 뜨면 연결이 된거다.
그리고 매번 백엔드쪽 고치면 db를 새로고침 해야할 다소 귀찮은점이 있다 그래서 그런걸 해결하기 위해서

```
npm i -D nodemon
```

설치해주고 개발을 시작하자.
패키지.json 가서 "node app.js" => 'nodemon app.js'

```json
  "scripts": {
    "dev": "nodemon app.js" //=>'nodemon app.js' 이렇게 바꿔주세요
  },
```

npm run dev 로 실행.

7. passport.js 사용기(passport-local) 전략짜기.

passport 라이브러리 설치

```
npm install passport
```

이메일 과 비밀번호로 로그인 하기위해서 passport-local 설치

```
npm install passport-local
```

passport.js 는 `session` 을통해서 정보를 소통하기 때문에 session middleware 를 사용해야한다.

기본 app.js

```js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3065;
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models'); // models/index.js 에서 db 가져오기.
const passportConfig = require('./passport');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

db.sequelize
  .sync() // 데이터베이스 시퀄라이즈 연결용
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

passportConfig();

app.use(
  cors({
    // cors 문제 해결 npm i cors
    origin: '*', // *: 모든도메인 허용
    credentials: false, //
  })
);

app.use(express.json()); //프론트에서 받은 데이터가 json 형태이먄 json 데이터를 req.body 에 넣어준다.
app.use(express.urlencoded({ extended: true })); // 프론트에서 받은 데이터가 form형식 데이터 일때  폼데이터를 req.body 에 넣어준다.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize()); // 패스포트 설정 미들웨어에 추가.
app.use(passport.session());

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
```

패스포트 필수 설정

```js
const express = require('express');
const app = express();
const passport = require('passport');
const passportConfig = require('./passport'); // passport 의 기본 설정을 따로 쪼개서 넣어놧다

passportConfig(); // passportConfig 불러오기.

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
); // 세션을 미들웨어에 추가 해줘야 passport 와 소통할수있다.

app.use(passport.initialize()); // 패스포트 설정 미들웨어에 추가.
app.use(passport.session());
```

userRouter.js:

```js
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models'); //모델  models/index 에서 가져오기
const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason); // 로그인 문제 생겻을때 보통 401로 접속.
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
const local = require('./local'); // 로컬 에다가 passport-local 전략 구현
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
  local(); // 전략 호출.
};
```

local.js: passport-local 전략

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
            return done(null, false, { reason: '존재하지 않는 사용자입니다.' }); // done(서버에러,성공유무,클라이언트에러)
          }
          const result = await bcrypt.compare(password, user.password); // 해쉬암호화된 비밀번호가 일치한지 비교한다.
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: '비밀번호가 틀렸습니다' });
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
};
```

#### passport.js 를 이용한 local 전략 로그인 흐름

1. 프론트에서 email 과 password 데이터를 받아와 `/login` 주소로 req.body 로 전송

```js
outer.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => { //인증후 받는 콜백함수 done(err,user,info)
    ....
});
```

2. req.body 값가지고 new LocalStrategy() 로 이동

```js
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // 프론트에서 받은 email (req.body.email)
      passwordField: 'password', // 프론트에서 받은 password (req.body.password)
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          // 비동기를 통해서 데이터베이스 User테이블에서 해당 로그인 email 이 있는지 확인하고 찾아준다.
          where: {
            email,
          },
        });
        if (!user) {
          // email 유저가 없다면
          return done(null, false, { reason: '존재하지 않는 사용자입니다.' }); // done(서버에러,성공유무,클라이언트에러)
        }
        const result = await bcrypt.compare(password, user.password); // 해쉬암호화된 비밀번호가 일치한지 비교한다.
        if (result) {
          // 비밀번호가 맞다면
          return done(null, user);
        }
        return done(null, false, { reason: '비밀번호가 틀렸습니다' });
      } catch (error) {
        //서버에러
        console.log(error);
        return done(error);
      }
    }
  )
);
```

3. done(err,user,info) 콜백함수 받아서 조작하기

```js
router.post('/login', (req, res, next) => {
  //req,res,next 사용하기 위해서 확장 미들웨어 하는 코딩방식 진행
  passport.authenticate('local', (err, user, info) => {
    //done 콜백함수 여기서 받는다
    if (err) {
      // 서버 에러 낫을때
      console.log(err);
      return next(err);
    }
    if (info) {
      // 클라이언트쪽 서버 문제 생겻을떄
      return res.status(401).send(info.reason); // 로그인 문제 생겻을때 보통 401로 접속.
    }
    return req.login(user, async (loginErr) => {
      // 정상적이게 user 받아왔을때  여기 진행되면서 동시에  serializeUser 쪽도 실행해야한다.
      if (loginErr) {
        //로그인 도중 에러
        console.log(loginErr);
        return next(loginErr);
      }
      return res.status(200).json(user); // 성공하면 user 정보를 프론트로 전송
    });
  })(req, res, next);
});
```

4.  req.login(user, async (loginErr)=>) passport 로그인 실행돨때 밑에 부분도 동시에 실행이 된다

```js
passport.serializeUser((user, done) => {
  done(null, user.id); //백엔드 session 에 userid 저장 프론트에는 암호화된 user정보 를 쿠키에 저장.
});

passport.deserializeUser(async (id, done) => {
  // 로그인 한 상태에서 매번 유저정보 불러올때 실행이 된다.
  try {
    const user = await User.findOne({
      // User 모델에서 지금 로그인한 id 값과 일치한 정보를 user 에 담는다
      where: {
        id,
      },
    });
    done(null, user); // 찾은 유저 반환. req.user 이렇게 정보를 저장
  } catch (err) {
    console.error(err);
    done(err);
  }
});
```

### 이미지 업로드를 위한 multer

이미지,비디오 같은 데이터를 주고 받을때는 from 타입을 multipart 데이터폼으로 주고받는다.
multipart 데이터를 처리 먼저 할려면 multer 를 설치를 해주자.

```
npm i multer
```

전송하는 프론트 form:

```js
<Form
  style={{ margin: '10px 0 20px' }}
  encType='multipart/form-data'
  onFinish={onSubmit}
>
  {' '}
  // 이미지나 동영상 옮길땐 encType="multipart/form-data"
  <Input.TextArea
    maxLength={140}
    value={text}
    onChange={onChangeText}
    placeholder='어떤 신기한 일이 있었나요?'
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
    // upload.array('image') 때 name = 'image' 가 필요하다.
    <Button onClick={onImageInput}>이미지 업로드</Button>
    <Button
      type='primary'
      style={{ float: 'right' }}
      loading={addPostLoading}
      htmlType='submit'
    >
      짹짹!
    </Button>
  </div>
  <div>
    {imagePaths.map((imgpath) => {
      <div key={imgpath} style={{ display: 'inline-block' }}>
        <img src={imgpath} style={{ width: '200px' }} alt={imgpath} />
        <div>
          <Button>제거</Button>
        </div>
      </div>;
    })}
  </div>
</Form>
```

backend 에서 정보를 받고 보낼때

```js
const upload = multer({
  // multipart 형식이 매번 다르기 때문에 이렇게 변형해주는 작업이 필요하다.
  storage: multer.diskStorage({
    // 테스트 할때는 로컬 하드디스크에 사진저장해서 테스트를 한다.
    destination(req, file, done) {
      // 저장위치
      done(null, 'uploads'); // uploads 폴더에 저장.
    },
    filename(req, file, done) {
      // 파일정보. apple.png
      const ext = path.extname(file.originalname); // 확장자 추출 (.png)
      const basename = path.basename(file.originalname, ext); //apple
      done(null, basename + new Date().getTime() + ext); // 동일 이름 방지를 위해서 업로드 시간까지 이름에 추가.
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
