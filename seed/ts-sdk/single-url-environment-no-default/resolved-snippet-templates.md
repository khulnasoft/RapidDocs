```typescript
import { SeedSingleUrlEnvironmentNoDefaultClient } from "@rapiddocs/single-url-environment-no-default";

const client = new SeedSingleUrlEnvironmentNoDefaultClient({
  environment: SeedSingleUrlEnvironmentNoDefaultEnvironment.Production,
  token: "YOUR_TOKEN",
});
await client.dummy.getDummy();

```


