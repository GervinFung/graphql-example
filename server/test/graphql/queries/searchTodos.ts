import gql from 'graphql-tag';
import { Data } from '../../../src/data/dummy';
import { graphqlSdk } from '../../util';

const searchTodos = () =>
    test('search todos should return todo list with description and title', async () => {
        const searchTodos = gql`
            query {
                searchTodos {
                    description
                    title
                    createdOn
                }
            }
        `;
        const json = await graphqlSdk({
            documentNode: searchTodos,
        });
        expect(json).toStrictEqual({
            data: {
                searchTodos: Data.singleton.searchTodos().map((todo) => ({
                    ...todo,
                    createdOn: todo.createdOn.toISOString(),
                })),
            },
        });
    });

export default searchTodos;
