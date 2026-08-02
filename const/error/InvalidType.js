export default class InvalidTypeError extends Error {
    constructor(message = "Invalid Type") {
        super(message);
        this.name = "InvalidTypeError";
    }
}