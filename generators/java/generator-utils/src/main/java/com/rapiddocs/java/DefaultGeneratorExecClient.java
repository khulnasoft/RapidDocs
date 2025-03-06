package com.rapiddocs.java;

import com.rapiddocs.generator.exec.client.RapiddocsGeneratorExecClient;
import com.rapiddocs.generator.exec.client.logging.endpoints.SendUpdate;
import com.rapiddocs.generator.exec.client.logging.exceptions.SendUpdateException;
import com.rapiddocs.generator.exec.model.config.GeneratorConfig;
import com.rapiddocs.generator.exec.model.config.RemoteGeneratorEnvironment;
import com.rapiddocs.generator.exec.model.logging.GeneratorUpdate;
import com.rapiddocs.generator.exec.model.logging.TaskId;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class DefaultGeneratorExecClient {

    private static final Logger log = LoggerFactory.getLogger(DefaultGeneratorExecClient.class);

    private final RapiddocsGeneratorExecClient generatorExecClient;
    private final TaskId taskId;

    public DefaultGeneratorExecClient(GeneratorConfig generatorConfig) {
        Optional<RemoteGeneratorEnvironment> maybeEnv =
                generatorConfig.getEnvironment().getRemote();
        this.taskId = maybeEnv.map(env -> TaskId.valueOf(env.getId().get())).orElse(null);
        this.generatorExecClient = maybeEnv.map(RemoteGeneratorEnvironment::getCoordinatorUrlV2)
                .map(RapiddocsGeneratorExecClient::new)
                .orElse(null);
    }

    public void sendUpdate(GeneratorUpdate generatorUpdate) {
        sendUpdates(Collections.singletonList(generatorUpdate));
    }

    public void sendUpdates(List<GeneratorUpdate> generatorUpdates) {
        if (generatorExecClient != null & taskId != null) {
            try {
                generatorExecClient
                        .logging()
                        .sendUpdate(SendUpdate.Request.builder()
                                .taskId(taskId)
                                .body(generatorUpdates)
                                .build());
            } catch (SendUpdateException e) {
                log.error("Encountered error while sending generator update", e);
            }
        }
    }
}
