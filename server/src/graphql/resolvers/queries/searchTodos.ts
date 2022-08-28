import { Data } from '../../../data/dummy';

import * as GraphQL from '../../generated';

const searchTodos: GraphQL.QueryResolvers['searchTodos'] = () =>
    Data.singleton.searchTodos();

export default searchTodos;
