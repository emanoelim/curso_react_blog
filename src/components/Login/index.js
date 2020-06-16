import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './login.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.entrar = this.entrar.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    // Usuário logado? Então não vai para a tela de login de novo
    if (firebase.getCurrent()) {
      return this.props.history.replace('/dashboard');
    }
  }

  entrar(e) {
    this.login();
    e.preventDefault();
  }

  login = async() => { // espera uma resposta
    try {
      const {email, password} = this.state;
      firebase.login(email, password)
      .catch((error) => {
        if(error.code === "auth/user-not-found") {
          alert("Usuário não encontrado.");
        }
        else if(error.code === "auth/auth/invalid-password") {
          alert("Senha incorreta.");
        }
        else {
          alert("Erro: " + error.code);
          return null;
        }
      })
      this.props.history.replace('/dashboard');
    }
    catch(error) {
      alert(error.message);
    }
  }

  render() {
    return(
      <div>
        <form onSubmit={this.entrar} id="login">
          <label>Email: </label>
          <input type="email" autoComplete="off" autofocus value={this.state.email}
           onChange={(e) => this.setState({email: e.target.value})}
           placeholder="exemplo@exemplo.com"/>
          <label>Senha: </label>
          <input type="password" autoComplete="off" value={this.state.password}
           onChange={(e) => this.setState({password: e.target.value})}
           placeholder="********"/>
          <button type="submit">Entrar</button>
          <Link to="/register">Ainda não tenho uma conta.</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
