import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './new.css';


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

  cadastrar() {

  }

  render() {
    return(
      <div>
        <header id="new">
          <Link to="/dashboard">Voltar</Link>
        </header>
        <form onSubmit={this.cadastrar} id="new-post">
          <label>Titulo: </label>
          <input type="text" placeholder="Titulo do post" autofocus
           value={this.state.titulo}
           onChange={(e) => this.setState({titulo: e.targe.value})}/>

          <label>Url da imagem: </label>
          <input type="text" placeholder="Url da imagem da capa"
           value={this.state.imagem}
           onChange={(e) => this.setState({imagem: e.targe.value})}/>

          <label>Texto do post: </label>
          <textarea type="text" placeholder="Texto do post"
           value={this.state.descricao}
           onChange={(e) => this.setState({descricao: e.targe.value})}/>

          <br/>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
}

export default withRouter(NewPost);
