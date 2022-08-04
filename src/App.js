import { db } from './services/firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

import './App.css';
import { Detalhe } from './Detalhe';

function App() {
  const [users, setUsers] = useState([])
  const [newNome, setNewNome] = useState()
  const [newEmail, setNewEmail] = useState()
  


  useEffect(() => {
    const dbRef = collection(db, "cadastro");
    getDocs(dbRef)
    .then(docs => {
      setUsers(docs.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log(users)
    })

  }, []);

  const onCreate = () => {
    const newUser = {nome: newNome, email: newEmail}
    console.log(newUser);
    const dbRef = collection(db, "cadastro");
    addDoc(dbRef, newUser);    
  };  

  return (
    <div className="App">
      <h1>CRUD FireStore by google</h1>
      <ul style={{ listStyle: "none" }}>
      <input placeholder="Nome" onChange={e => setNewNome(e.target.value)} />
      <input placeholder="Email" onChange={e => setNewEmail(e.target.value)} />

      <button onClick={onCreate}>Novo</button>
        {users.map((u,i) => (<li key={i}><Detalhe user={u}/></li>))}
      </ul>
    </div>
  );
}

export default App;
