import React, { useState, useEffect } from 'react';
import {
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import { createBrowserHistory as history } from 'history';
import {SUGGESTIONS, AUTH} from "../utils/rutas";
import Cookies from 'universal-cookie';
import Axios from "axios";
import SuggestionItem from '../suggestions/suggestionItem';
import UserInfo from '../data/userInfo';

function Search(props) {
  const { url } = useRouteMatch();
  const cookies = new Cookies();
  const token = cookies.get('session')
  const location = useLocation()
  const item = props
  const [suggestions, setSuggestions] = useState([]);
  const [request, setRequest] = useState(0);
  const requests = [SUGGESTIONS, SUGGESTIONS]
  function searchFriends(link){
    const request = async () => {
      try {
        const res = await Axios.get(link,
          {
              headers:{
                  Authorization: `Bearer ${token}`
              }
          }
      );
        console.log(res.data)
        console.log(location.data.name)
        setSuggestions(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    request();
  };
  useEffect(()=>{
    try{
      setRequest(location.data.name)
    }
    catch(error){
      console.log(error);
    }
    searchFriends(requests[request])
}, [])
  return (
    <div className="userList">
      <div className="container ">
        <div className="row align-items-center">
          {suggestions.map((user) => (
            <SuggestionItem 
            nombre = {user.nombre}
            apellido = {user.apellido}
            carne = {user.carne}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
