import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, CardGroup } from 'react-bootstrap';

const MoviesCard = ({ movies }) => {
  return (
    <>
    <h1>Movie List</h1>
      <CardGroup>
        {movies.map((movie) => (
          <Card key={movie.id} className="card">
            <div className="card-img-container">
              <img src={movie.image} alt={movie.name} className="card-img" />
              <div className="card-overlay">
                <Card.Body>
                  <div className="text-center">
                    <h2 className="card-title">{movie.name}</h2>
                  </div>
                  <hr />
                  <ul>
                    <li className="small-details">
                      <strong>Director:</strong> {movie.director}
                    </li>
                    <li className="small-details">
                      <strong>Date:</strong> {movie.release_date}
                    </li>
                    <li className="small-details">
                      <strong>Language:</strong> {movie.language}
                    </li>
                    <li className="small-details">
                        <Button as={Link} to={`/movie/${movie.id}`}>View Details</Button>
                    </li>
                  </ul>
                </Card.Body>
              </div>
            </div>
          </Card>
        ))}
      </CardGroup>
    </>
  );
};

export default MoviesCard;
