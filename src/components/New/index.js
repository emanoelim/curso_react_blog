import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './new.css';
import firebase from '../../firebase';


class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: "",
      imagem: "",
      descricao: ""
    }

    this.cadastrar = this.cadastrar.bind(this);
  }

  async componentDidMount() {
    if(!firebase.getCurrent()) {
      this.props.history.replace('/login');
      return null;
    }
  }

  cadastrar = async(e) => {
    e.preventDefault();
    if(this.state.titulo !== "" && this.state.descricao !== "" && this.state.imagem !== "") {
      let posts = firebase.app.ref("posts");
      let chave = posts.push().key;
      await posts.child(chave).set({
        titulo: this.state.titulo,
        descricao: this.state.descricao,
        imagem: this.state.imagem,
        autor: "Emanoeli"
      });
      this.props.history.push("/dashboard");
    }
    else {
      alert("Alguns campos não estão preenchidos.");
    }
  }

  render() {
    return(
      <div>
        <header id="new">
          <Link to="/dashboard">Voltar</Link>
        </header>
        <form onSubmit={this.cadastrar} id="new-post">
          <label>Titulo: </label>
          <input type="text" placeholder="Titulo do post" autoFocus
           value={this.state.titulo}
           onChange={(e) => this.setState({titulo: e.target.value})}/>

          <label>Url da imagem: </label>
          <input type="text" placeholder="Url da imagem da capa"
           value={this.state.imagem}
           onChange={(e) => this.setState({imagem: e.target.value})}/>

          <label>Texto do post: </label>
          <textarea type="text" placeholder="Texto do post"
           value={this.state.descricao}
           onChange={(e) => this.setState({descricao: e.target.value})}/>

          <br/>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
}

export default withRouter(NewPost);
