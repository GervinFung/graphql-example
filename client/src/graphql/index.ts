import { requester } from '../../../common/src';
import { getSdk } from './generated';
import { parseAsStringEnv } from 'esbuild-env-parsing';

const responseJson = requester({
    fetch,
    api: parseAsStringEnv({
        env: process.env.API,
        name: 'process.env.API',
    }),
});

const graphqlSdk = (params: Parameters<typeof responseJson>[0]) =>
    getSdk(async () => await (await responseJson(params)).data);

export default graphqlSdk;
