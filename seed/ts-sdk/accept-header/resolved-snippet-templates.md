```typescript
import { SeedAcceptClient } from "@rapiddocs/accept-header";

const client = new SeedAcceptClient({
  environment: "YOUR_BASE_URL",
  token: "YOUR_TOKEN",
});
await client.service.endpoint();

```


