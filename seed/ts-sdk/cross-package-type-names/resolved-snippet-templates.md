```typescript
import { SeedCrossPackageTypeNamesClient } from "@rapiddocs/cross-package-type-names";

const client = new SeedCrossPackageTypeNamesClient({
  environment: "YOUR_BASE_URL",
});
await client.folderA.service.getDirectThread();

```


```typescript
import { SeedCrossPackageTypeNamesClient } from "@rapiddocs/cross-package-type-names";

const client = new SeedCrossPackageTypeNamesClient({
  environment: "YOUR_BASE_URL",
});
await client.folderD.service.getDirectThread();

```


```typescript
import { SeedCrossPackageTypeNamesClient } from "@rapiddocs/cross-package-type-names";

const client = new SeedCrossPackageTypeNamesClient({
  environment: "YOUR_BASE_URL",
});
await client.foo.find({
  optionalString: "optionalString",
  publicProperty: "publicProperty",
  privateProperty: 1,
});

```


