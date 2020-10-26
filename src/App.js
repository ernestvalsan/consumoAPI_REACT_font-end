import './App.css';
import {Component} from "react";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Nav from "./components/nav.component";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import axios from "axios";

export default class App extends Component{
    state = {};

    // //Para ver si ya se encuetra logueado
    // componentDidMount() {
    //
    //     //No es una buena practica, hay que hacerla fija en index.js
    //     const config = {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('token')
    //         }
    //     };
    //
    //     axios.get('http://b22e5b8b1d17.ngrok.io/api/users', config)
    //         .then(res => {
    //             this.setState({
    //                 user: res.data
    //             });
    //
    //         }).catch(
    //         err => {
    //             this.setState({ errorMessage: err.message });
    //             console.log('There was an error!', err);
    //         }
    //     )
    // }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Nav user={this.state.user}/>
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Switch>
                                <Route exact path="/" component={() => <Home user={this.state.user}/>} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/register" component={Register} />
                            </Switch>
                        </div>
                    </div>

                </div>
            </BrowserRouter>
        );
    }
}

