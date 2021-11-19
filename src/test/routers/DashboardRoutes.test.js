import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';


describe('Pruebas en DashboardRoutes', () => {

    const contextValue = {
        user: {
            name: 'Ricardo',
            logged: true,
        }
    };

    test('Deberia de mostrarse correctamente la ruta de marvel', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                {/* Memory Router ayuda a proveer el router necesario para hacer pruebas, ya que el useNavigate que se usa en algunas de las rutas requiere estar dentro de un router */}
                <MemoryRouter initialEntries={ ['/'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe( 'Ricardo' );

    });

    test('Deberia de mostrarse correctamente la ruta de dc', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                {/* Memory Router ayuda a proveer el router necesario para hacer pruebas, ya que el useNavigate que se usa en algunas de las rutas requiere estar dentro de un router */}
                <MemoryRouter initialEntries={ ['/dc'] }>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe( 'DC' )

    });
    
})