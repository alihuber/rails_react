import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { passCsrfToken } from '../util/helpers';

function Collections() {
  const [collections, setCollections] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    passCsrfToken(document, axios);
    axios.get('/api/collections').then((response) => {
      setCollections(response.data.collections);
    });
  }, collections);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/collections', { collection: { title, content } }).then((response) => {
      console.log(response);
      console.log(response.data);
    });
  };

  const setValue = (field, value) => {
    field === 'title' ? setTitle(value) : setContent(value);
  };

  return (
    <div>
      <h1>New Collection</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="title" type="text" onChange={evt => setValue('title', evt.target.value)} />
        <input name="content" placeholder="content" type="text" onChange={evt => setValue('content', evt.target.value)} />
        <button type="submit">Create Collection</button>
      </form>

      <ul>{collections && collections.map(coll => <li key={coll}>{coll}</li>)}</ul>
    </div>
  );
}

export default Collections;
