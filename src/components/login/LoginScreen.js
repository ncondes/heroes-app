import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { useForm } from '../../hooks/useForm';


export const LoginScreen = () => {

    const [ values, handleInputChange ] = useForm({
        username: '',
    });

    const { dispatch } = useContext( AuthContext );

    const navigate = useNavigate();

    const handleLogin = (e) => {

        e.preventDefault();
        const action = {
            type: types.login,
            payload: {
                name: values.username,
            }
        }

        dispatch( action );

        const lastPath = localStorage.getItem('lastPath') || '/';

        navigate( lastPath, {
            replace: true,
        });

    }

    return (
        <div className='container mt-5'>
            <h1>Login</h1>
            <hr />

            <div className='d-flex justify-content-center'>
                <form className='col-12 col-sm-6' onSubmit={ handleLogin }>
                    <div className='mb-3'>
                        <label
                            htmlFor='username'
                            className='form-label'
                        >
                            Username
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            name='username'
                            id='username'
                            placeholder='Your username here'
                            autoComplete='off'
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className='d-grid gap-2'>
                        <button
                            type='submit'
                            className='btn btn-outline-dark'
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}
