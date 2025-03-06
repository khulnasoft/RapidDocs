```typescript
import { SeedMixedFileDirectoryClient } from "@rapiddocs/mixed-file-directory";

const client = new SeedMixedFileDirectoryClient({
  environment: "YOUR_BASE_URL",
});
await client.organization.create({
  name: "name",
});

```


```typescript
import { SeedMixedFileDirectoryClient } from "@rapiddocs/mixed-file-directory";

const client = new SeedMixedFileDirectoryClient({
  environment: "YOUR_BASE_URL",
});
await client.user.list({
  limit: 1,
});

```


```typescript
import { SeedMixedFileDirectoryClient } from "@rapiddocs/mixed-file-directory";

const client = new SeedMixedFileDirectoryClient({
  environment: "YOUR_BASE_URL",
});
await client.user.events.listEvents({
  limit: 1,
});

```


```typescript
import { SeedMixedFileDirectoryClient } from "@rapiddocs/mixed-file-directory";

const client = new SeedMixedFileDirectoryClient({
  environment: "YOUR_BASE_URL",
});
await client.user.events.metadata.getMetadata({
  id: "id",
});

```


