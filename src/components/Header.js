import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div className="header">
            <img src={logo} alt="Around US logo" className="header__logo" />
            <div className="header__user-status">
                <p className="header__user-email">{props.loggedUserEmail}</p>
                <Link to={props.path} className="header__log-button" onClick={props.onLogClick}>{props.logText}</Link>
            </div>
        </div>
    )
}

export default Header;