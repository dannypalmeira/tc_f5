import React, {useState, useEffect} from "react";
import {useAuth} from "../../contexts/authContext";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);
  if (loading) return <div>Crregando...</div>;
  return (
    <div className=''>
      Nome:{user.nome}
      <br />
      Email: {user.email}
      <br />
      <button>Editar</button>
    </div>
  );
}
