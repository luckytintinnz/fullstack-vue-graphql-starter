const { ApolloServer, gql } = require('apollo-server');

const todos = [
  { task: 'First task', completed: false },
  { task: 'Second task', completed: true },
];

const typeDefs = gql`
  type Todo {
    task: String,
    completed: Boolean
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    addTodo(task: String, completed: Boolean): Todo
  }
`;

const resolvers = {
  Query: {
    getTodos: () => todos,
  },
  Mutation: {
    addTodo: (_, { task, complete }) => {
      const todo = { task, completed };
      todos.push(todo);
      return todo;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
