import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/authContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { MemoryRouter } from 'react-router-dom';


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Pruebas en LoginScreen', () => {


    const contextValue = {
        dispatch : jest.fn(),
        user: {
            logged: false,
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ ['/login'] }>
                <LoginScreen />
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('Debe de hacer match con el snapshot', () => {

        expect( wrapper ).toMatchSnapshot();

    })

    test('Debe de realizar el dispatch y la navegacion', () => {

        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => {}
        });
        expect( contextValue.dispatch ).toHaveBeenCalledWith( {"payload": {"name": ""}, "type": "[auth] Login" });
        expect( mockNavigate ).toHaveBeenCalledWith( "/", {"replace": true});

        localStorage.setItem('lastPath', '/dc');

        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => {}
        });

        expect( mockNavigate ).toHaveBeenCalledWith("/dc", {"replace": true});
        
    })
    
})