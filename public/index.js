import { Router } from '../src/utils/Utils.js';
import { TestPage } from '../src/pages/Pages.js';
var router = new Router(".app");
router.use("/", TestPage).start();
// router
//   .use("/", Chats)
//   .use("/users", Users)
//   .start();
//# sourceMappingURL=index.js.map