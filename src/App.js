import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [bookmark, setBookMark] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://api.github.com/users/Jorge-Bill/repos',
      );
      const data = await response.json();
      setRepositories(data);
    }
    fetchData();
  }, []);

  function handleBookMark(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id == id ? { ...repo, bookmark: !repo.bookmark } : repo;
    });

    setRepositories(newRepositories);
  }

  return (
    <>
      <h1>Github - Repository List</h1>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.bookmark && <span>(Bookmarked)</span>}
            <button onClick={() => handleBookMark(repo.id)}>BookMark</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
