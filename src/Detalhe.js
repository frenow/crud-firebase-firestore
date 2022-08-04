import { useState } from "react"
import { db } from './services/firebase';
import { deleteDoc, doc, setDoc } from "firebase/firestore";

export const Detalhe = ({user}) => {
    const [nome, setNome] = useState(user.nome);
    const [email, setEmail] = useState(user.email);

    const onUpdate = () => {
        const newDoc = {...user, nome, email};
        console.log(newDoc);
        const docRef = doc(db, "cadastro", user.id);
        setDoc(docRef, newDoc).then(() => console.log('Alterado com sucesso'));        
      }
    
      const onDelete = () => {
        const docRef = doc(db, "cadastro", user.id);
        deleteDoc(docRef).then(() => console.log('Deletado com sucesso'));
      }

    return(
        <>
        <input
            value={nome}
            onChange={e => {
            setNome(e.target.value);
        }} />
        <input
            value={email}
            onChange={e => {
            setEmail(e.target.value);
        }} />
        <button onClick={onUpdate}>Alterar</button>
        <button onClick={onDelete}>Deletar</button>        
        </>
    )
}