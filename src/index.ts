import { Router } from './utils/Utils.js';
import { TestPage, LoginPage } from './pages/Pages.js';

let router = new Router(".app");

router.use("/", TestPage).use("/#login", LoginPage).start();

//setTimeout(function(){ router.go("/#login"); }, 3000);


// router
//   .use("/", Chats)
//   .use("/users", Users)
//   .start();