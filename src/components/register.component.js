import React, {Component} from 'react';
import axios from 'axios';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Este campo es requerido!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Ingrese un correo electrónico valido
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 30 || value.length > 50) {
        return (
            <div className="alert alert-danger" role="alert">
                El nombre tiene que tener entre 30 a 50 caracteres.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 8 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                La contraseña tiene que tener un minimo de 8 a 30 caracteres.
            </div>
        );
    }
};

export default class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    };

    handleChange = (event, fielName) => {
        this.setState({ [fielName]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        };

        if (this.state.name !== "" || this.state.email !== "" || this.state.password !== "" || this.state.password_confirmation !== "") {
            if (this.state.password === this.state.password_confirmation){
                const headers = {
                    'Authorization': 'Bearer my-token',
                    'My-Custom-Header': 'foobar'
                };

                axios.post(`http://2476a3fe3582.ngrok.io/api/register`, user,  { headers })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        console.log ('Request was sent!!!');
                        window.alert('¡Usuario Registrado!');
                    }).catch(
                    err => {
                        this.setState({ errorMessage: err.message });
                        console.log('There was an error!', err);
                    }
                )
            }else{
                window.alert('Las contraseñas no coinciden');
            }
        }else{
            window.alert('Hay campos vacios, porfavor verifique.');
        }
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                <h3>Regístrate</h3>
                <div className="form-group">
                    <label>Primer Nombre</label>
                    <Input
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        validations={[required, vusername]}
                        value={this.state.name}
                        onChange={event => this.handleChange(event, "name")}
                    />
                </div>

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
                        validations={[required, vpassword]}
                        value={this.state.password}
                        onChange={event => this.handleChange(event, "password")}
                    />
                </div>

                <div className="form-group">
                    <label>Confirmar contraseña</label>
                    <Input
                        name="password_confirmation"
                        type="password"
                        className="form-control"
                        placeholder="Confirmar contraseña"
                        validations={[required, vpassword]}
                        value={this.state.password_confirmation}
                        onChange={event => this.handleChange(event, "password_confirmation")}
                    />
                </div>

                <button
                    className="btn btn-primary btn-block" type="submit">Registrar</button>
            </Form>
        );
    }
}
