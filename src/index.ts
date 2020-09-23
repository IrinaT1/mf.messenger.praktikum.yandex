import { router } from './utils/Utils.js';
import { TestPage, LoginPage, SignupPage } from './pages/Pages.js';

router
    .use("/", TestPage)
    .use("/#login", LoginPage)
    .use("/#signup", SignupPage)
    .start();

//setTimeout(function(){ router.go("/#login"); }, 3000);


// router
//   .use("/", Chats)
//   .use("/users", Users)
//   .start();