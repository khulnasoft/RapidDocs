```typescript
import { SeedErrorPropertyClient } from "@rapiddocs/error-property";

const client = new SeedErrorPropertyClient({ environment: "YOUR_BASE_URL" });
await client.propertyBasedError.throwError();

```


