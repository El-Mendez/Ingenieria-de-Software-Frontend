import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Menu from './menu';
import Services from './services';
import logo from '../../assets/logo.svg';
import 'bootstrap/dist/js/bootstrap.bundle';

export default function NavBar() {
  const { url } = useRouteMatch();

  // TODO revisar el uso de estados
  const [show, setShow] = useState(false);
  const [suggestionsOptions, setSuggestionsOptions] = useState(false);

  return (
    <div>
      {/* NavBar menu */}
      <div className="navbar-container bg-secondary d-flex align-item-center">
        <nav className="ms-3 ms-lg-5 navbar-expand-lg navbar-light text-light d-lg-flex">
          <button
            className="navbar-toggler mr-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#products"
            aria-controls="products"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="material-icons">
              menu
            </span>
          </button>
          <div className="d-lg-flex flex-lg-grow-1 justify-content-between align-items-center" style={{ height: 'inherit' }}>
            {/* LOGO */}
            <Link to={`${url}`} style={{ height: '24px' }} aria-label="Google store logo">
              <div className="logo-bg-large">
                <img src={logo} alt="Logo" className="temporary-style" />
              </div>
            </Link>
            <div className="collapse navbar-collapse" id="products">
              <Menu />
            </div>
          </div>
        </nav>
        <Services
          show={show}
          openWindow={() => { setShow(!show); }}
        />
      </div>
    </div>

  );
}
