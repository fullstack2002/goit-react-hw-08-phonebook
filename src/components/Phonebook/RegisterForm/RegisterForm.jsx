import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { getAuth } from 'redux/auth/authSlice';
import { registerUser } from 'redux/auth/authOperations';
import { Loader } from 'components/Phonebook/Loader/Loader';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
        
    switch (name) {
      case 'userName':
        setName(value)
        break;
      case 'userEmail':
        setEmail(value)
        break;
      case 'userPassword':
        setPassword(value)
        break;
      default:
        setName('')
        setEmail('')
        setPassword('')
    }
  }

  const dispatch = useDispatch();
  const { isLoading } = useSelector(getAuth);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser({ name: name, email: email, password: password }));
  }

  const nameId = useMemo(() => nanoid(), []);
  const emailId = useMemo(() => nanoid(), []);
  const passwordId = useMemo(() => nanoid(), []);

  return (<form onSubmit={handleSubmit}>
        <label htmlFor={nameId}>Name</label>
        <input
            id={nameId}
            type="text"
            name="userName"
            value={name}
            onChange={handleChange}
            required
            placeholder='User_Name'/>
        <label htmlFor={emailId}>Email</label>
        <input
            id={emailId}
            type="email"
            name="userEmail"
            value={email}
            onChange={handleChange}
            required
            placeholder='youremail@mail.com'/>
        <label htmlFor={passwordId}>Password</label>
        <input
            id={passwordId}
            type="password"
            name="userPassword"
            value={password}
            onChange={handleChange}
            required
            placeholder='7 symbols required'/>
        {!isLoading ? <button type='submit'>Sign Up</button> : <Loader />}
    </form>)
};

export default RegisterForm;