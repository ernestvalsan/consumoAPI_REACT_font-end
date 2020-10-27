import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Nav extends Component {
    handleLogout = () => {
        localStorage.clear();
        //localStorage.removeItem("token");
        this.props.setUser(null);
    };

    render() {
        let buttons;

        if (this.props.user){
            buttons = (<ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link onClick={this.handleLogout} className="nav-link" to={'/'}>Cerrar sesión</Link>
                </li>
            </ul>)
        }else{
            buttons = (<ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to={'/login'}>Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={'/register'}>Regístrate</Link>
                </li>
            </ul>)
        }

        return (
            <nav className="navbar navbar-expand navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>Inicio</Link>
                    <div className="collapse navbar-collapse">
                        {buttons}
                    </div>
                </div>
            </nav>
        );
    }
}

