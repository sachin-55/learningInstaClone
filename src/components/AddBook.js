import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const displayAuthors = () => {
    if (loading) {
      return <option disabled>Loading authors</option>;
    }
    return (
      data &&
      data.authors &&
      data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      })
    );
  };

  const addBookHandler = (e) => {
    e.preventDefault();

    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
    setName('');
    setGenre('');
    setAuthorId('');
  };

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button type="submit" onClick={(e) => addBookHandler(e)}>
        +
      </button>
    </form>
  );
};

export default AddBook;
