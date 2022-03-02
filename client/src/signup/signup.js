import React, { useState} from "react";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Signup({ showSignup, setShowSignup }) {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

// submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      setShowSignup(false);
    } catch (e) {
      console.error(e);
    }
  };
  if (!showSignup){
    return null;
  }
  return (
    <div className="signup modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">New User Signup</h4>
        </div>
        <div className="modal-body">
          <form onSubmit = {handleFormSubmit}>
          <h3>Username </h3> <br />
          <input name="username" onChange={handleChange} />
          <h3>Password </h3> <br />
          <input name="password" onChange={handleChange} />
          <input type="submit" value="Signup" />
          </form>
        </div>
        <div className="modal-footer">
          <button className="button" onClick={() => setShowSignup(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default Signup;
 