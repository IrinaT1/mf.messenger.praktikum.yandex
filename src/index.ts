import { router } from './utils/Utils.js';
import { TestPage, LoginPage, SignupPage, AccountPage } from './pages/Pages.js';

router
    .use("/", TestPage)
    .use("/#login", LoginPage)
    .use("/#signup", SignupPage)
    .use("/#account", AccountPage)
    .start();