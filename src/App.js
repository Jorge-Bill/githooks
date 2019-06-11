import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  CardMedia,
} from '@material-ui/core';

function App() {
  const [repositories, setRepositories] = useState([]);

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

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.bookmark);
    document.title = `You have ${filtered.length} bookmarked`;
  }, [repositories]);

  function handleBookMark(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, bookmark: !repo.bookmark } : repo;
    });

    setRepositories(newRepositories);
  }

  return (
    <>
      <Grid container className="main">
        <Typography component="h1" className="main-text">
          Github - Repository List
        </Typography>
        <Grid item className="cards-grid">
          {repositories.map(repo => (
            <Card key={repo.id} className="card">
              <CardMedia
                className="card-img"
                image="https://picsum.photos/200/300"
                title="Test"
              />
              <CardContent className="content">
                <Typography className="card-title" component="h2">
                  {repo.name}
                </Typography>
                <Button
                  variant={repo.bookmark ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleBookMark(repo.id)}
                >
                  {repo.bookmark ? 'Bookmarked' : 'BookMark'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
