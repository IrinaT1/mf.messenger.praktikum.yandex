import { GenericErrorPage } from "./Error";

export class ErrorPage404 extends GenericErrorPage {
    constructor() {
        super("This is not what you're looking for.");
    }
}