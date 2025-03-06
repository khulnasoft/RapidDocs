```typescript
import { SeedNoEnvironmentClient } from "@rapiddocs/no-environment";

const client = new SeedNoEnvironmentClient({
  environment: "YOUR_BASE_URL",
  token: "YOUR_TOKEN",
});
await client.dummy.getDummy();

```


