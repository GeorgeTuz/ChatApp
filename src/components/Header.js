import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    
  render() {
      return (
        <div className="header">
            <p className="logo">CHAT</p>
            <Link to="/auth">
                <p>Change username</p>
            </Link>
        </div>
      );
    }
  }
   
  
  export default Header;