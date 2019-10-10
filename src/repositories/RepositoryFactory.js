import TodosRepository from './TodosRepository';
import UsersRepository from './UsersRepository';

const repositories = {
    todos: TodosRepository,
    users: UsersRepository,
};

export const RepositoryFactory = {
    get: name => repositories[name]
};