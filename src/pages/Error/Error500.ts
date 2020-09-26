import { GenericErrorPage } from "./Error";

export class ErrorPage500 extends GenericErrorPage {
    constructor() {
        super("Unexpected error.");
    }
}