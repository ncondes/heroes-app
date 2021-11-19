import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/authContext';
import { mount } from 'enzyme';


describe('Pruebas en AppRouter', () => {

    const contextValue =  {
        user: {
            logged: false,
        },
    };

    test('Debe de mostrar el login screen si el usuario no esta autenticado', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        )

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe( 'Login' );

    })

    test('Debe de mostrar el marvel screen si el usuario esta autenticado', () => {
        
        const contextValue =  {
            user: {
                name: 'Rodrigo',
                logged: true,
            },
        };

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        )

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.navbar').exists() ).toBe( true );
        expect( wrapper.find('h1').text().trim() ).toBe( 'Marvel' );

    })
    
    
})