import React, { useContext } from 'react';
import { AuthContext } from "../../context/auth.context"

function EditPage(props) {
  const { user } = useContext(AuthContext);
  
  return (
    <div>
      <h2>Edit your account</h2>
    </div>
  );
}

export default EditProfile;


