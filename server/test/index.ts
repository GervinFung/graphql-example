import express from '../src/express';
import queries from './graphql/queries';
import mutations from './graphql/mutations';
import child from 'child_process';

const main = async () => {
    beforeAll(express);
    describe('Query', () => queries.forEach(([query]) => query()));
    describe('Mutations', () => mutations.forEach(([query]) => query()));
    afterAll(() => child.exec('kill $(lsof -t -i:3000)'));
};

main();
