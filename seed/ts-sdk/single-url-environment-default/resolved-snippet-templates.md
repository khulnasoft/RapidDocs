```typescript
import { SeedSingleUrlEnvironmentDefaultClient } from "@rapiddocs/single-url-environment-default";

const client = new SeedSingleUrlEnvironmentDefaultClient({
  token: "YOUR_TOKEN",
});
await client.dummy.getDummy();

```


