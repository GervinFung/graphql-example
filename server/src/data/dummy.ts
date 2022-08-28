import { Todo } from '../graphql/generated';

type Todos = ReadonlyArray<Todo>;

class Data {
    private constructor(private readonly todos: Todos) {}

    static singleton: Data = new Data([
        {
            title: 'Walk dog',
            description: 'Before 9am',
            createdOn: new Date('2022-08-25T17:16:19.139Z'),
        },
        {
            title: 'Clean bathroom',
            description: 'Before 10am',
            createdOn: new Date('2022-08-25T17:16:19.139Z'),
        },
        {
            title: 'Clean toilet',
            description: 'Before 11am',
            createdOn: new Date('2022-08-25T17:16:19.139Z'),
        },
        {
            title: 'Clean car',
            description: 'Before 12am',
            createdOn: new Date('2022-08-25T17:16:19.139Z'),
        },
    ]);

    addTodo = (todo: Todo) => new Data(this.todos.concat(todo));
    searchTodos = () => this.todos;
}

export { Data, Todo, Todos };
