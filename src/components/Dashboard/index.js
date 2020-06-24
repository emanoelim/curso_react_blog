import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    if(!firebase.getCurrent()) {
      this.props.history.replace('/login');
      return null;
    }
  }

  logout = async () => {
    await firebase.logout()
    .catch((error)=>{
      console.log(error);
    });
    this.props.history.push('/');
  }

  render() {
    return(
      <div id="dashboard">
        <div className="user-info">
          <h1>Bem vindo!</h1>
        </div>
        <p>Você está logado com: {firebase.getCurrent()}</p>
        <br/>
        <Link to="/dashboard/new" className="btn">Novo Post</Link>
        <a className="btn" onClick={()=> this.logout()}>Sair</a>
      </div>
    );
  }
}

export default withRouter(Dashboard);
