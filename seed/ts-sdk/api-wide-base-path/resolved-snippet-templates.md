```typescript
import { SeedApiWideBasePathClient } from "@rapiddocs/api-wide-base-path";

const client = new SeedApiWideBasePathClient({ environment: "YOUR_BASE_URL" });
await client.service.post("pathParam", "serviceParam", "resourceParam", 1);

```


