type TestSelections = ReadonlyArray<readonly [() => void, 'only'?]>;
import fetch from 'node-fetch';

import { requester } from '../../common/src';

const graphqlSdk = requester({
    // @ts-ignore
    fetch,
    api: 'http://localhost:3000',
});

export { TestSelections, graphqlSdk };
