import { gql } from '@apollo/client';

const signupMutation = gql`
  mutation(
    $fullname: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      fullname: $fullname
      username: $username
      email: $email
      password: $password
    ) {
      token
      fullname
      username
      email
      id
    }
  }
`;

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      fullname
      username
      email
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      genre
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;

export {
  loginMutation,
  signupMutation,
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
};
