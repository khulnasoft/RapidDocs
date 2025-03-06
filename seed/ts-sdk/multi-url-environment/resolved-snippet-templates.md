```typescript
import { SeedMultiUrlEnvironmentClient } from "@rapiddocs/multi-url-environment";

const client = new SeedMultiUrlEnvironmentClient({ token: "YOUR_TOKEN" });
await client.ec2.bootInstance({
  size: "size",
});

```


```typescript
import { SeedMultiUrlEnvironmentClient } from "@rapiddocs/multi-url-environment";

const client = new SeedMultiUrlEnvironmentClient({ token: "YOUR_TOKEN" });
await client.s3.getPresignedUrl({
  s3Key: "s3Key",
});

```


