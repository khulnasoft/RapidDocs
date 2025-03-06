import { OpenrpcDocument } from "@open-rpc/meta-schema";
import { readFile } from "fs/promises";

import { OpenrpcContext, OpenrpcDocumentConverterNode } from "@khulnasoft/docs-parsers";
import { AbsoluteFilePath } from "@khulnasoft/fs-utils";
import { TaskContext } from "@khulnasoft/task-context";

export async function generateFdrFromOpenrpc(
    openrpcPath: AbsoluteFilePath,
    context: TaskContext
): Promise<ReturnType<OpenrpcDocumentConverterNode["convert"]>> {
    // Read and parse the OpenRPC document
    const openrpcContent = await readFile(openrpcPath, "utf-8");
    const openrpcDocument = JSON.parse(openrpcContent) as OpenrpcDocument;

    const openrpcContext = new OpenrpcContext({
        openrpc: openrpcDocument,
        logger: context.logger
    });

    const openrpcFdrJson = new OpenrpcDocumentConverterNode({
        input: openrpcDocument,
        context: openrpcContext,
        accessPath: [],
        pathId: "openrpc"
    });

    return openrpcFdrJson.convert();
}
