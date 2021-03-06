import { Block } from '../../utils/Block';
import { router } from '../../utils/Utils';

// const template = `
// <div style="display: flex; flex-direction: column; margin: 50px; ">
//     <a href="#login">LoginPage</a>
//     <a href="#signup">SignupPage</a>
//     <a href="#account">AccountPage</a>
//     <a href="#chats">ChatMainPage</a>
//     <a href="#404">ErrorPage404</a>
//     <a href="#500">ErrorPage500</a>
// </div>
// `;

const template = "";

export class TestPage extends Block {

    constructor() {
        super("div");
        router.go("#chats");
    }

    render() {
        return template;
    }
}
