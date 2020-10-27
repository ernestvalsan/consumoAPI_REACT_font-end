import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";


// Función para la validación de caompos requeridos del formulario
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Este campo es requerido!
            </div>
        );
    }
};

// Función para la validación de correos electronicos, en formato correcto
const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Ingrese un correo electrónico valido
            </div>
        );
    }
};

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    // Control del los inputs
    handleChange = (event, fielName) => {
        this.setState({ [fielName]: event.target.value });
    };

    // Control del botón de tipo sumit
    handleSubmit = event => {
        event.preventDefault();

        const user = {
        email: this.state.email,
        password: this.state.password
        };

        // Validación que el contenido de los inputs no esten vacios
        if (this.state.email !== "" || this.state.password !== ""){
            axios.post(`http://2476a3fe3582.ngrok.io/api/login`, user)
                .then(res => {
                    // console.log(res);
                    // console.log(res.data);
                    const token = JSON.stringify(res.data);
                    localStorage.setItem('token', token);       // Alojamiento del token

                    window.alert('¡Bienvenido!');
                    console.log ("You're login!!!");

                    this.props.setUser(res.data.use);       // Asignamos que usuario esta loguado

                    this.setState({     // Sesión de login a verdadera
                        loggedIn: true
                    });
                    this.props.setUser(res.data.user);

                    return <Redirect to={"/"} />
                    //Arreglar detalle : Reload page.
                }).catch(
                err => {
                    this.setState({ errorMessage: err.message });
                    console.log('There was an error!', err);
                }
            )
        }else{
            window.alert('Hay campos vacios, porvafor verifique.');
        }
        };

    render() {
        if (this.state.loggedIn){
            return <Redirect  to={'/'}/>
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <h3>Iniciar sesión</h3>

                <div className="form-group">
                    <label>Correo electrónico</label>
                    <Input
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Correo electrónico"
                        validations={[required, email]}
                        value={this.state.email}
                        onChange={event => this.handleChange(event, "email")}
                    />
                </div>

                <div className="form-group">
                    <label>Contraseña</label>
                    <Input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        validations={[required]}
                        value={this.state.password}
                        onChange={event => this.handleChange(event, "password")}
                    />
                </div>

                <button
                    className="btn btn-primary btn-block" type="submit">Iniciar sesión</button>
            </Form>
        );
    }
}

