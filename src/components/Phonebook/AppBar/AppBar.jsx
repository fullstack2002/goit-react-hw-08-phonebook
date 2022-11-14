import { useSelector, useDispatch } from 'react-redux';
import { getAuth } from 'redux/auth/authSlice';
import { logoutUser } from 'redux/auth/authOperations';
import { NavLink, useNavigate } from 'react-router-dom';
import css from '../AppBar/AppBar.module.css';

export const AppBar = () => {
  const { user, isLoggedIn } = useSelector(getAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  const getClassName = ({ isActive }) => {
    return isActive ? `${css.link} ${css.active}` : css.link;
  }

  return (
        <nav>
            {isLoggedIn && <NavLink to='/contacts'>Contacts</NavLink>}
            {isLoggedIn ?
                <div>
                    <p>{`Welcome, ${user.name}!`}</p>
                    <button type='button' onClick={onLogoutClick}>Log Out</button>
                </div> :
                <div>
                    <NavLink className={getClassName} to='/register'>Sign Up</NavLink>
                    <NavLink className={getClassName} to='/login'>Log In</NavLink>
                </div>
            }
        </nav>
    )
};