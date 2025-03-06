import { docsYml } from "@khulnasoft/configuration-loader";
import { RapiddocsNavigation } from "@khulnasoft/fdr-sdk";

export function convertPlaygroundSettings(
    playgroundSettings?: docsYml.RawSchemas.PlaygroundSettings
): RapiddocsNavigation.V1.PlaygroundSettings | undefined {
    if (playgroundSettings) {
        return {
            disabled: undefined,
            environments:
                playgroundSettings.environments != null && playgroundSettings.environments.length > 0
                    ? playgroundSettings.environments.map((environmentId) =>
                          RapiddocsNavigation.V1.EnvironmentId(environmentId)
                      )
                    : undefined,
            button:
                playgroundSettings.button != null && playgroundSettings.button.href
                    ? { href: RapiddocsNavigation.V1.Url(playgroundSettings.button.href) }
                    : undefined,
            "limit-websocket-messages-per-connection":
                playgroundSettings.limitWebsocketMessagesPerConnection != null
                    ? playgroundSettings.limitWebsocketMessagesPerConnection
                    : undefined
        };
    }

    return;
}
