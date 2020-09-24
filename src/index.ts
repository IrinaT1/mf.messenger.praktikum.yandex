import { router } from './utils/Utils.js';
import { TestPage, LoginPage, SignupPage, AccountPage } from './pages/Pages.js';
import { ChatMainPage } from './pages/Chats/ChatMain.js';

router
    .use("/", TestPage)
    .use("/#login", LoginPage)
    .use("/#signup", SignupPage)
    .use("/#account", AccountPage)
    .use("/#chats", ChatMainPage)
    .start();