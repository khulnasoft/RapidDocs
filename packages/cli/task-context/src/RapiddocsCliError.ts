export class RapiddocsCliError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, RapiddocsCliError.prototype);
    }
}
