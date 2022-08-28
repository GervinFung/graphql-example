import { DocumentNode } from 'graphql';

type BodyParams = Readonly<{
    documentNode: DocumentNode;
    variables?: any;
}>;

const getGqlString = (documentNode: DocumentNode) =>
    documentNode.loc?.source?.body;

const getOperationName = (documentNode: DocumentNode) => {
    const operationName = documentNode.definitions.find((definition) => {
        switch (definition.kind) {
            case 'OperationDefinition': {
                return definition.name?.value;
            }
        }
        return undefined;
    });
    if (!operationName) {
        return undefined;
    }
    switch (operationName.kind) {
        case 'OperationDefinition': {
            return operationName.name?.value;
        }
    }
    throw new Error(
        `${getGqlString(documentNode)} should have an operation name`
    );
};

const formRequestBody = ({ documentNode, variables }: BodyParams) => ({
    variables,
    query: getGqlString(documentNode),
    operationName: getOperationName(documentNode),
});

const responseJson =
    ({
        api,
        fetch,
    }: Readonly<{
        api: string;
        fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
    }>) =>
    async (params: BodyParams) =>
        await (
            await fetch(`${api}/graphql`, {
                method: 'POST',
                body: JSON.stringify(formRequestBody(params)),
                headers: {
                    'content-type': 'application/json',
                },
            })
        ).json();

export default responseJson;
