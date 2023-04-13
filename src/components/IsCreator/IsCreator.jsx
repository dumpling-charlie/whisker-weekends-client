import React, { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function IsCreator({ creatorId, children }) {
  const { user } = useContext(AuthContext);

  if (user && user._id === creatorId) {
    return children;
  } else {
    return <p>You are Not authorized to do this</p>;
  }
}

export default IsCreator;
