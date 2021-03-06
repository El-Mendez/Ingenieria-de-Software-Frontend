import React, { useEffect, useState } from 'react';
import { MdClass } from 'react-icons/md';
import { AiFillCustomerService, AiFillContacts } from 'react-icons/ai';
import { Link, useRouteMatch } from 'react-router-dom';

function SuggestionItem(props) {
  // TODO utilizar proptypes, utilizar id
  const item = props;
  const { url } = useRouteMatch();
  const [image, setImage] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    const img = new Image();
    img.onload = function () {
    // image exists and is loaded
      setImage(true);
    };
    img.onerror = function () {
    // image exists and is loaded
      setImage(false);
    };

    img.src = `../../../public/assets/${item.carne}.png`;
  }, []);

  return (
    <div id="suggestionResult" className="container suggestions ">
      <Link to={`${url}/profile/${item.carne}`} className="noDecorations">
        <div className="row align-items-center items">
          <div className="col-4 ">
            <img src={`../../../public/assets/${image ? `${item.carne}.png` : 'default.svg'}`} alt="Profile" className="w-100 rounded-circle align-self-center" />
          </div>
          <div className="col suggestions">
            <div className="row align-items-start" value={item.nombre}>
              <h1>{item.nombre}</h1>
            </div>
            <div className="row align-items-start">
              <h2>
                {item.correo}
              </h2>
              <div className="infoser">
                <MdClass className="infoUser" />
                <AiFillCustomerService className="infoUser" />
                <AiFillContacts className="infoUser" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SuggestionItem;
