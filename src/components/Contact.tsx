import React, { useContext } from 'react'
import { UserContext } from '../common/utils/UserContext';

const Contact = () => {
   
  const { loggedInUser} = useContext(UserContext);

  return (
    <div>{loggedInUser}</div>
  )
 }

export default Contact;
