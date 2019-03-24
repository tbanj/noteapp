import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

class Header extends React.Component {
    render() {
        return (
            <div  className="row navBackground fixed-top">
            <nav style={{backgroundColor: 'orange'}} className="navbar navbar-expand-lg navbar-light bg-light col-md-12 ">
          <button className="navbar-toggler" type="button" data-toggle="collapse"
           data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
            <li className="nav-item">
                
                <Link style={{color: 'white'}} className="nav-link parentChild" to="/"><span style={{fontSize: '2em',
    marginRight: '10%'}} className="fa fa-comment iconNote"></span></Link>
              </li>
              <li className="nav-item">
                
                <Link className="nav-link parentChild setFontColor" to="/">Fancy Notes</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            
              {/* <button className="btn btn-outline-primary my-2 my-sm-0 setFontColor" type="submit">Sign in</button> */}
                  <Link to="#exampleModal">
                    <button style={{height: '35px'}} className="btn btn-outline-primary my-2 my-sm-0 setFontColor">
                        <p className="setFontColor">Sign in</p>
                    </button>
                 </Link>
            </form>
          </div>
        </nav>
          </div>
        );
    }
}
export default Header;