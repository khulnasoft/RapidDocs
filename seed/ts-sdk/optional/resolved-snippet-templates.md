```typescript
import { SeedObjectsWithImportsClient } from "@rapiddocs/optional";

const client = new SeedObjectsWithImportsClient({ environment: "YOUR_BASE_URL" });        
await client.optional.sendOptionalBody(
	{
		{
			"string": {"key":"value"}
		}
	}
)

```


