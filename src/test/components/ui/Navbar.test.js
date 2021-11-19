import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Navbar } from '../../../components/ui/Navbar';
import { AuthContext } from '../../../auth/authContext';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Pruebas en Navbar', () => {

    test('Debe de mostrarse correctamente', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                name: 'pedro',
                logged: true,
            },
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/'] }>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe( 'pedro' )

    });

    test('Debe de llamar el logout, llamar el navigate y el dispatch con los argumentos', () => {
        
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                name: 'pedro',
                logged: true,
            },
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={ ['/'] }>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        wrapper.find('button').at( 1 ).prop('onClick')();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({"payload": {}, "type": "[auth] Logout"});
        expect( mockNavigate ).toHaveBeenCalledWith("login", {"replace": true});

    })

})