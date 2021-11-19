import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HeroScreen } from '../../../components/hero/HeroScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Pruebas en HeroScreen', () => {

    test('No debe de mostrar el hero screen si no hay un heroe en el url', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path='/hero' element={ <HeroScreen /> }/>
                    <Route path='/' element={ <h1>No Hero Page</h1> }/>
                </Routes>
            </MemoryRouter>
        )

        expect( wrapper.find('h1').text().trim() ).toBe('No Hero Page')
    })

    test('Debe de mostrar un heroe si el parametro existe y se encuentra', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={ <HeroScreen /> }/>
                    <Route path='/' element={ <h1>No Hero Page</h1> }/>
                </Routes>
            </MemoryRouter>
        )

        expect( wrapper.find('h3').text().trim() ).toBe( 'Spider Man');

    });

    test('Debe de regresar a la pantalla anterior', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={ <HeroScreen /> }/>
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( mockNavigate ).toHaveBeenCalledWith(-1);

    })
    
    test('Debe de mostrar el No hero page si no tenemos un heroe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider12345']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={ <HeroScreen /> }/>
                    <Route path='/' element={ <h1>No Hero Page</h1> }/>
                </Routes>
            </MemoryRouter>
        )

        expect( wrapper.text() ).toBe('No Hero Page')
        expect( wrapper.find('h1').text().trim() ).toBe('No Hero Page')

    });

})