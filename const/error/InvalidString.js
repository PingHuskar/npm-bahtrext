export default class InvalidStringError extends Error {
    constructor(message = "Invalid String") {
        super(message);
        this.name = "InvalidStringError";
    }
}