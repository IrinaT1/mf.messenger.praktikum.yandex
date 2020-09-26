import { router } from './utils/Utils';
import { TestPage, LoginPage, SignupPage, AccountPage, ErrorPage404, ErrorPage500, ChatMainPage } from './pages/Pages';

router
    .use("/", TestPage)
    .use("/#login", LoginPage)
    .use("/#signup", SignupPage)
    .use("/#account", AccountPage)
    .use("/#chats", ChatMainPage)
    .use("/#404", ErrorPage404)
    .use("/#500", ErrorPage500)
    .start();