import React, {useState, useEffect} from "react";
import {useAuth} from "../../contexts/authContext";

const Profile = async () => {
  const [user, setUser] = useState(null);
  const ii = useAuth();
  console.log("oiiiiiiii", ii);

  return (
    <>
      OK
      {user}
    </>
  );
};

export default Profile;
