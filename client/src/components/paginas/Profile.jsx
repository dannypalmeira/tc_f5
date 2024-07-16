import React, {useState, useEffect} from "react";
import {useAuth} from "../../contexts/authContext";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState(null);
  const [sobrenome, setSobrenome] = useState(null);
  const {user} = useAuth();
  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      setLoading(false);
    }
  }, [user]);
  const hendleNome = (e) => {
    setNome(e.target.value);
  };
  const hendleSobrenome = () => {
    setSobrenome(e.target.value);
  };
  if (loading) return <div>Crregando...</div>;
  return (
    <div className='w-full h-screen flex self-center place-content-center place-items-center'>
      <form className='border rounded-xl space-y-5 p-4'>
        Nome: <input value={nome} onChange={hendleNome} />
        <br />
        Sobrenome: <input value={sobrenome} onChange={hendleSobrenome} />
        <br />
        <button type='submit'>Editar</button>
      </form>
    </div>
  );
}
