import axios from 'axios';

export function login(data) {
    return dispatch => {
        return axios.post('http://164.90.221.172/api/login', data)
            .then(res => {
                const token = res.data.token;
                localStorage.setItem('Token', token);
                }
            ).catch(
             err => {
                 this.setState({ errorMessage: err.message });
                 console.log('There was an error!', err);
             }
            )
    }
}