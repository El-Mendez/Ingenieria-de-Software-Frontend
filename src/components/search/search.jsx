import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { SUGGESTIONS_HOBBIES, SUGGESTIONS_COURSES, SUGGESTIONS_FRIENDS } from '../utils/rutas';
import Card from '../utils/card';
import NoSuggestionItem from '../suggestions/noSuggestionItem';
import history from '../utils/history';

function Search(props) {
  const [suggestions, setSuggestions] = useState([]);
  const requests = [SUGGESTIONS_COURSES, SUGGESTIONS_HOBBIES, SUGGESTIONS_FRIENDS];
  const [recommendation, setRecommendation] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('session');
  const item = props;
  const location = useLocation();
  const { url } = useRouteMatch();

  function searchFriends() {
    const request = async () => {
      try {
        const res = await Axios.get(requests[item.type],
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setSuggestions(res.data);
        if (res.data[0] === undefined) {
          setRecommendation(false);
        } else {
          setRecommendation(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }

  useEffect(() => {
    // Esto es probicional hasta que tenga la API de las recomendaciones por amigos
    searchFriends();
  }, [location]);

  return (
    <div className="userList">
      {recommendation ? (
        <div className="container mt-4">
          <div className="songs-container">
            {suggestions.map((user) => (
              <Card
                key={user.carne}
                name={user.nombre}
                  // TODO retornar carrera
                career={user.carne}
                email={user.correo}
                carne={user.carne}
                viewProfile={`${url}/profile/${user.carne}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="container noSuggestions">
          <NoSuggestionItem />
        </div>
      )}
    </div>
  );
}

export default Search;
