```typescript
import { SeedServerSentEventsClient } from "@rapiddocs/server-sent-event-examples";

const client = new SeedServerSentEventsClient({ environment: "YOUR_BASE_URL" });
await client.completions.stream({
  query: "foo",
});

```


```typescript
import { SeedServerSentEventsClient } from "@rapiddocs/server-sent-event-examples";

const client = new SeedServerSentEventsClient({ environment: "YOUR_BASE_URL" });
await client.completions.stream({
  query: "query",
});

```


