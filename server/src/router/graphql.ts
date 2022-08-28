import express from 'express';
import {
    getGraphQLParameters,
    processRequest,
    renderGraphiQL,
    sendResult,
    shouldRenderGraphiQL,
} from 'graphql-helix';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import resolvers from '../graphql/resolvers';

const graphqlRouter = (app: express.Application) =>
    app.use('/graphql', async (req, res) => {
        const request = {
            body: req.body,
            headers: req.headers,
            method: req.method,
            query: req.query,
        };

        if (shouldRenderGraphiQL(request)) {
            res.send(renderGraphiQL());
        } else {
            const { operationName, query, variables } =
                getGraphQLParameters(request);
            const result = await processRequest({
                operationName,
                query,
                variables,
                request,
                schema: addResolversToSchema({
                    resolvers,
                    schema: loadSchemaSync('**/*.graphql', {
                        loaders: [new GraphQLFileLoader()],
                    }),
                }),
            });
            sendResult(result, res);
        }
    });

export default graphqlRouter;
