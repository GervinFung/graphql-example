import React from 'react';
import graphqlSdk from './graphql';
import {
    AddTodoDocument,
    Mutation,
    Query,
    SearchTodosDocument,
    Todo,
} from './graphql/generated';
import { dummy } from '../../common/src';

const App = () => {
    const [state, setState] = React.useState({
        addTodo: [] as Mutation['addTodo'],
        searchTodos: [] as Query['searchTodos'],
    } as const);

    const font = 'Fira Mono';

    const { searchTodos, addTodo } = state;

    const OperationResult = ({
        name,
        titleStyle,
        hasBorderRight,
        todos,
        onClick,
    }: Readonly<{
        name: string;
        titleStyle: React.CSSProperties;
        hasBorderRight: boolean;
        todos: ReadonlyArray<Todo>;
        onClick: () => void;
    }>) => (
        <div
            style={{
                flex: '0.5',
                display: 'flex',
                flexDirection: 'column',
                fontSize: '1em',
                borderRight: !hasBorderRight ? undefined : '1px solid #292929',
                borderTop: '1px solid #292929',
                borderBottom: '1px solid #292929',
            }}
        >
            <div
                style={{
                    flex: '0.5',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    fontSize: '1.25em',
                    width: '100%',
                    borderBottom: '1px solid #292929',
                    padding: '8px',
                    boxSizing: 'border-box',
                    ...titleStyle,
                }}
            >
                {name}
                <div
                    onClick={onClick}
                    style={{
                        backgroundColor: '#4bb74a',
                        padding: '8px 12px',
                        margin: '8px 0',
                        border: 'none',
                        borderRadius: '2px',
                        fontSize: '0.85em',
                        color: '#FFF',
                        cursor: 'pointer',
                    }}
                >
                    Execute
                </div>
            </div>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '8px',
                    boxSizing: 'border-box',
                    height: '100%',
                    borderBottom: '1px solid #292929',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: '99%',
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: '2px',
                        boxSizing: 'border-box',
                        backgroundColor: '#1d2429',
                        color: '#496b91',
                    }}
                >
                    <ol>
                        {todos.map(
                            ({ description, title, createdOn }, index) => (
                                <li
                                    key={index}
                                    style={{
                                        margin: '16px 0',
                                    }}
                                >{`${title} - ${description} - ${
                                    typeof createdOn === 'string'
                                        ? createdOn
                                        : createdOn.toISOString()
                                }`}</li>
                            )
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href={`https://fonts.googleapis.com/css2?family=${font
                    .split(' ')
                    .join('+')}:wght@${Array.from(
                    { length: 9 },
                    (_, i) => (i + 1) * 100
                ).join(';')}&display=swap`}
                rel="stylesheet"
            />
            <div
                style={{
                    backgroundColor: '#101010',
                    color: '#E0E0E2',
                    height: '120vh',
                    fontFamily: `'${font}', monospace`,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        boxSizing: 'border-box',
                        padding: '24px 8px',
                        textAlign: 'center',
                        fontSize: '1.25em',
                        color: '#F3F4F6',
                    }}
                >
                    GraphQL Proof of Concept
                </div>
                <div
                    style={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        height: '100%',
                    }}
                >
                    <OperationResult
                        name="Query"
                        hasBorderRight={true}
                        todos={searchTodos}
                        titleStyle={{
                            color: '#1CB1F1',
                        }}
                        onClick={() =>
                            graphqlSdk({
                                documentNode: SearchTodosDocument,
                            })
                                .SearchTodos()
                                .then(({ searchTodos }) =>
                                    setState((prev) => ({
                                        ...prev,
                                        searchTodos,
                                    }))
                                )
                        }
                    />
                    <OperationResult
                        name="Mutation"
                        hasBorderRight={false}
                        todos={addTodo}
                        titleStyle={{
                            color: '#D11ABF',
                        }}
                        onClick={() => {
                            const variables = {
                                todo: {
                                    ...dummy,
                                    createdOn: new Date(),
                                },
                            } as const;
                            graphqlSdk({
                                documentNode: AddTodoDocument,
                                variables,
                            })
                                .AddTodo(variables)
                                .then(({ addTodo }) =>
                                    setState((prev) => ({
                                        ...prev,
                                        addTodo,
                                    }))
                                );
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default App;
