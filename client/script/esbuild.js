import { build } from 'esbuild';
import dotenv from 'dotenv';
import { parseAsEnvs } from 'esbuild-env-parsing';

dotenv.config({});

const isDev = process.env.NODE_ENV === 'development';

build({
    entryPoints: ['src/index.tsx'],
    outfile: 'build/index.js',
    loader: {
        '.ts': 'tsx',
        '.png': 'binary',
    },
    bundle: true,
    minify: true,
    sourcemap: isDev,
    platform: 'browser',
    logLevel: 'silent',
    watch: !isDev
        ? undefined
        : {
              onRebuild: (error, result) => console.log(error ?? result),
          },
    define: parseAsEnvs(['API'].filter(Boolean)),
})
    .then((r) => {
        console.dir(r);
        console.log('Build succeeded.');
    })
    .catch((e) => {
        console.log('Error building:', e.message);
        process.exit(1);
    });
