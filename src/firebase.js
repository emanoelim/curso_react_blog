import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
  apiKey:process.env.API_KEY,
  authDomain:process.env.AUTH_DOMAIN,
  databaseURL:"https://reactapp-52a9f.firebaseio.com",
  projectId:process.env.PROJECT_ID,
  storageBucket:process.env.STORAGE_BUCKET,
  messagingSenderId:process.env.MS_ID,
  appId:process.env.APP_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.app = app.database(); // é chamado lá no index.js
  }

  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password);
  }

  async register(nome, email, password) {
    await app.auth().createUserWithEmailAndPassword(email, password);

    const uid = app.auth().currentUser.uid;

    return app.database().ref("usuarios").child(uid).set({
      nome: nome
    })
  }

  // verifica se já está inicializado para carregar os artigos
  isInitialized() {
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve);
    })
  }

  // verifica se um usuário já está logado
  getCurrent() {
    return app.auth().currentUser && app.auth().currentUser.email
  }
}

export default new Firebase();
