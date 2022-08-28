import { Data } from '../../../data/dummy';
import * as GraphQL from '../../generated';
import { dummy } from '../../../../../common/src';

const addTodo: GraphQL.MutationResolvers['addTodo'] = (_, { todo }) => {
    const tempTodo = dummy;
    const index = Data.singleton
        .searchTodos()
        .filter((todo) => todo.title.includes(tempTodo.title)).length;
    const length = !index ? '0' : index;
    Data.singleton = Data.singleton.addTodo({
        title: !length ? tempTodo.title : `${todo.title} ${length}`,
        description: !length
            ? tempTodo.description
            : `${todo.description} ${length}`,
        createdOn: todo.createdOn,
    });
    return Data.singleton.searchTodos();
};

export default addTodo;
