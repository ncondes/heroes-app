import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const Navbar = () => {

    const { user, dispatch } = useContext( AuthContext );
    // console.log( user );

    const navigate = useNavigate();

    const handleLogout = () => {

        const action = {
            type: types.logout,
            payload: {},
        }

        dispatch( action );

        navigate('login', {
            replace: true,
        })
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className='container-fluid'>

            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        
                <div className='navbar-collapse collapse justify-content-between' id='navbarNavAltMarkup'>


                    <div className="navbar-nav">
                        <NavLink 
                            className={ ({ isActive }) => `nav-link ${ isActive && 'active' }`}
                            aria-current='page'
                            to="/marvel"
                        >
                            Marvel
                        </NavLink>

                        <NavLink 
                            className={ ({ isActive }) => `nav-link ${ isActive && 'active' }`} 
                            to="/dc"
                        >
                            DC
                        </NavLink>

                        <NavLink 
                            className={ ({ isActive }) => `nav-link ${ isActive && 'active' }`} 
                            to="/search"
                        >
                            Search
                        </NavLink>
                    </div>

                    <div className="navbar-nav">
                        <span
                            className='nav-link text-info'
                        >
                            { user.name }
                        </span>

                        <button 
                            className="nav-link btn"
                            onClick={ handleLogout }
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}