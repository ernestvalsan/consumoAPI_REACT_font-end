import './App.css';
import {Component} from "react";
import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Nav from "./components/nav.component";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import axios from "axios";

export default class App extends Component{
    state = {}

    // Función para el el acceder al token y hacer uso de la API
    componentDidMount = () => {

        const user = JSON.parse(localStorage.getItem('token'));
        if(user != null){
            const config = {
                headers: {
                    Authorization: 'Bearer ' + user.access_token
                }
            };
            axios.get('http://2476a3fe3582.ngrok.io/api/users', config)
                .then(res => {
                    console.log(res);

                    this.setUser(res.data);
                }).catch(
                err => {
                    this.setState({ errorMessage: err.message });
                    console.log('There was an error users!', err);
                }
            )
        }else{
            return <Redirect to={"/login"} />
        }

    };

    setUser = user => {
        this.setState({
            user: user
        });
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Nav  user={this.state.user} setUser={this.setUser}/>
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Switch>
                                <Route exact path="/" component={ () => <Home  user={this.state.user} />} />
                                <Route exact path="/login" component={ () => <Login  setUser={this.setUser} />} />
                                <Route exact path="/register" component={Register} />
                            </Switch>
                        </div>
                    </div>

                </div>
            </BrowserRouter>
        );
    }
}

