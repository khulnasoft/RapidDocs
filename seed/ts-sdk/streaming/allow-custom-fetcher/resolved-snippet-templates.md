```typescript
import { SeedStreamingClient } from "@rapiddocs/streaming";

const client = new SeedStreamingClient({ environment: "YOUR_BASE_URL" });
await client.dummy.generateStream({
  numEvents: 1,
});

```


```typescript
import { SeedStreamingClient } from "@rapiddocs/streaming";

const client = new SeedStreamingClient({ environment: "YOUR_BASE_URL" });
await client.dummy.generate({
  numEvents: 5,
});

```


```typescript
import { SeedStreamingClient } from "@rapiddocs/streaming";

const client = new SeedStreamingClient({ environment: "YOUR_BASE_URL" });
await client.dummy.generate({
  numEvents: 1,
});

```


