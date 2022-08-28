import express from 'express';
import path from 'path';
import buildRouter from '../router/build';
import graphqlRouter from '../router/graphql';

const { static: expressStatic, json, urlencoded } = express;

const app = async () => {
    const build = '../client/build';

    const app = (() => {
        const app = express();
        const port = process.env.PORT || 3000;

        const middleWares = [
            json({ limit: '10mb' }),
            urlencoded({ extended: true }),
            expressStatic(path.resolve(build)),
        ];

        app.use(middleWares);
        app.listen(port, () =>
            console.log(
                `🚀 Express listening at port ${port} 🚀 at time: ${new Date()}`
            )
        );
        return app;
    })();

    buildRouter(app, build);
    graphqlRouter(app);

    return { app };
};

export default app;
