import React, {Component} from 'react';


export default class Home extends Component {

    render() {
        if (this.props.user){
            return (
                <div class="table-title">
                    <table class="table-fill">
                        <thead>
                        <tr>
                            <th class="text-left">#</th>
                            <th class="text-left">Nombre</th>
                            <th class="text-left">Correo electrónico</th>
                        </tr>
                        </thead>
                        { this.props.user.map(user => (
                            <tbody class="table-hover">
                                <tr key={user.id}>
                                    <td class="text-left">{user.id}</td>
                                    <td class="text-left">{user.name}</td>
                                    <td class="text-left">{user.email}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            );
        }else{
            return (
                <h2>Inicie sesión o registrese</h2>
            );
        }
    }
}

