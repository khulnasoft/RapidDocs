import { RapiddocsGeneratorExec, RapiddocsGeneratorExecClient } from "@rapiddocs-rapiddocs/generator-exec-sdk";
import {
    ExitStatusUpdate,
    GeneratorConfig,
    GeneratorUpdate,
    GithubOutputMode,
    LogLevel
} from "@rapiddocs-rapiddocs/generator-exec-sdk/api";
import * as GeneratorExecParsing from "@rapiddocs-rapiddocs/generator-exec-sdk/serialization";

export { GeneratorExecParsing, ExitStatusUpdate, GeneratorUpdate, LogLevel, RapiddocsGeneratorExec };
export type { GeneratorConfig, GithubOutputMode };

export class GeneratorNotificationService {
    private client: RapiddocsGeneratorExecClient | undefined;
    private taskId: RapiddocsGeneratorExec.TaskId | undefined;
    private buffer: RapiddocsGeneratorExec.GeneratorUpdate[] = [];

    constructor(environment: RapiddocsGeneratorExec.GeneratorEnvironment) {
        if (environment.type === "remote") {
            this.client = new RapiddocsGeneratorExecClient({
                environment: environment.coordinatorUrlV2
            });

            this.taskId = environment.id;
            // Every 2 seconds we flush the buffer
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            setInterval(async () => {
                if (this.buffer.length > 0) {
                    await this.flush();
                }
            }, 2000);
        } else {
            this.client = undefined;
        }
    }

    public bufferUpdate(update: RapiddocsGeneratorExec.GeneratorUpdate): void {
        if (!this.client) {
            return;
        }

        this.buffer.push(update);
    }

    public async sendUpdate(update: RapiddocsGeneratorExec.GeneratorUpdate): Promise<void> {
        if (!this.client) {
            return;
        }

        this.buffer.push(update);
        await this.flush();
    }

    public async flush(): Promise<void> {
        if (!this.client || !this.taskId) {
            return;
        }

        try {
            const numSent = this.buffer.length;
            await this.client.logging.sendUpdate(this.taskId, this.buffer);
            this.buffer = this.buffer.slice(numSent);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn("Encountered error when sending update", e);
        }
    }
}
