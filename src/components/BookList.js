import React from 'react';
import { useQuery } from '@apollo/client';
import { Spinner } from 'theme-ui';
import { Box } from '@material-ui/core';
import { getBooksQuery } from '../queries/queries';

const BookList = (props) => {
  const { loading, error, data } = useQuery(getBooksQuery);

  return (
    <div>
      <ul id="book-list">
        {loading && <Spinner />}
        {error && JSON.stringify(error)}
        {data &&
          data.books.length > 0 &&
          data.books.map((book) => {
            return (
              <li key={book.id}>
                <Box>
                  Book Name :&emsp;
                  {book.name}
                </Box>
                <Box>
                  Book Genre :&emsp;
                  {book.genre}
                </Box>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default BookList;
