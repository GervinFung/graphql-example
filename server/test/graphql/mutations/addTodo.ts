import gql from 'graphql-tag';
import { Data } from '../../../src/data/dummy';
import { graphqlSdk } from '../../util';

const addTodo = () =>
    test('add todo should return updated todo list with description and title', async () => {
        const addTodo = gql`
            mutation AddTodo($todo: AddToDoParams!) {
                addTodo(todo: $todo) {
                    title
                    description
                    createdOn
                }
            }
        `;
        const todos = Data.singleton.searchTodos().map((todo) => ({
            ...todo,
            createdOn: todo.createdOn.toISOString(),
        }));
        const createdOn = new Date();
        const json = await graphqlSdk({
            documentNode: addTodo,
            variables: {
                todo: { title: 'title', description: 'description', createdOn },
            },
        });
        expect(json).toStrictEqual({
            data: {
                addTodo: todos.concat({
                    title: 'title 0',
                    description: 'description 0',
                    createdOn: createdOn.toISOString(),
                }),
            },
        });
    });

export default addTodo;
