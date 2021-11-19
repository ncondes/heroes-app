import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { useMemo } from 'react';
import { getHeroById } from '../../selectors/getHeroById';

// import batman from '../../assets/dc-batman.jpg'; // importacion para recurso estatico

export const HeroScreen = () => {

    const { heroeId } = useParams();

    const hero = useMemo( () => {
        return getHeroById( heroeId )
    }, [ heroeId ])

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate( -1 );
    }

    if (!hero) {
        return <Navigate to='/' />
    }

    const {
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters,
    } = hero;

    return (
        <div className='row mt-5'>
            <div className='col-4'>
                <img
                    src={`../assets/${ id }.jpg`} // desde public/assets
                    alt={ superhero }
                    className='img img-thumbnail animate__animated animate__fadeInLeft'
                />
            </div>
            <div className='col-8'>
                <h3> { superhero } </h3>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <b>Alter ego:</b> { alter_ego }
                    </li>
                    <li className='list-group-item'>
                        <b>Publisher:</b> { publisher }
                    </li>
                    <li className='list-group-item'>
                        <b> First Appearance: </b> { first_appearance }
                    </li>
                </ul>
                <h5 className='mt-3'>Characters</h5>
                <p> {characters } </p>
                <button
                    className='btn btn-outline-dark mt-5'
                    onClick={ handleReturn }
                >
                    Regresar
                </button>
            </div>
        </div>
    )
}
