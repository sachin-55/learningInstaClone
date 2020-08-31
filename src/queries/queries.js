import { gql } from '@apollo/client';

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

export { getAuthorsQuery, getBooksQuery, addBookMutation };
