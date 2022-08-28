import { build } from 'esbuild';
import child from 'child_process';

const isDev = process.env.NODE_ENV === 'development';

build({
    entryPoints: ['src/index.ts'],
    outfile: 'build/index.js',
    sourcemap: isDev,
    bundle: true,
    minify: true,
    platform: 'node',
    plugins: !isDev
        ? undefined
        : [
              {
                  name: 'express',
                  setup: (build) => {
                      build.onEnd(() => {
                          const { stdout, stderr } = child.exec(
                              'yarn serve',
                              (error, stdout, stderr) => {
                                  console.log(`serve stdout: ${stdout}`);
                                  console.error(`serve stderr: ${stderr}`);
                                  if (error !== null) {
                                      console.log(`serve error: ${error}`);
                                  }
                              }
                          );
                          stdout.on('data', (data) => console.log(data));
                          stderr.on('data', (data) => console.log(data));
                      });
                  },
              },
          ],
})
    .then((r) => {
        console.dir(r);
        console.log('Build succeeded');
    })
    .catch((e) => {
        console.log('Error building:', e.message);
        process.exit(1);
    });
