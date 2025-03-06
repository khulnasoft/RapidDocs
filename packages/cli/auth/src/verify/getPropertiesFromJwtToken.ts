import jwt from "jsonwebtoken";

import { RapiddocsUserToken } from "../RapiddocsToken";

export function getUserIdFromToken(token: RapiddocsUserToken): string | undefined {
    const decodedToken = jwt.decode(token.value, { complete: true });
    if (decodedToken == null) {
        return undefined;
    }
    const payload = decodedToken.payload;
    return typeof payload === "string" ? undefined : payload.sub;
}
