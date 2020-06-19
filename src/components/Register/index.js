import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './register.css';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      email: "",
      password: "",
    };
  }

  render() {
    return(
      <div>
        <h1 className="register-h1">Novo usuário</h1>
        <form id="register">
          <label>Nome: </label>
          <input type="text" value={this.state.nome} autoFocus autoComplete="off"
           onChange={(e) => this.setState({nome: e.target.value})}
           placeholder="Jezebel"/>

          <label>Email: </label>
          <input type="text" value={this.state.email} autoComplete="off"
           onChange={(e) => this.setState({email: e.target.value})}
           placeholder="exemplo@exemplo.com"/>

          <label>Senha: </label>
          <input type="text" value={this.state.password} autoComplete="off"
           onChange={(e) => this.setState({password: e.target.value})}
           placeholder="********"/>

           <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
