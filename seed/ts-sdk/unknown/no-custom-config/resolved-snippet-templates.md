```typescript
import { SeedUnknownAsAnyClient } from "@rapiddocs/unknown";

const client = new SeedUnknownAsAnyClient({ environment: "YOUR_BASE_URL" });        
await client.unknown.post(
	{
		{"key":"value"}
	}
)

```


```typescript
import { SeedUnknownAsAnyClient } from "@rapiddocs/unknown";

const client = new SeedUnknownAsAnyClient({ environment: "YOUR_BASE_URL" });
await client.unknown.postObject({
  unknown: { key: "value" },
});

```


