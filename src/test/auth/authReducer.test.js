import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {

    test('Debe de retonar el estado por defecto', () => {
      
        const state = authReducer({
            logged: false,
        }, {})

        expect( state ).toEqual({ logged: false })

    })

    test('Debe de autenticar y colocar el "name" del usuario', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Nombre',
            },
        };

        const state = authReducer({
            logged: false,
        }, action );

        expect( state ).toEqual({
            logged: true,
            name: 'Nombre',
        });

    })

    test('Debe de borrar el name del usuario y setear el logg en false', () => {

        const action = {
            type: types.logout,
            payload: {
                logged: false,
            }
        };

        const state = authReducer({
            logged: true,
            name: 'Nombrecito'
        }, action );

        expect( state ).toEqual({
            logged: false,
        });

    })
    
})