export class LoggableRapiddocsCliError extends Error {
    constructor(public readonly log: string) {
        super();
        Object.setPrototypeOf(this, LoggableRapiddocsCliError.prototype);
    }
}
