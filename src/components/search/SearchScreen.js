import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';


export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse( location.search );

    const initialState = {
        searchText: q,
    }

    const [ values, handleInputChange ] = useForm( initialState );
    
    const { searchText } = values;

    const heroesFiltered = useMemo(() => getHeroesByName( q ), [ q ])

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`?q=${ searchText }`)
    }

    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className='row'>
                <div className='col-4 d-flex flex-column'>
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={ handleSubmit }>
                        <input
                            type='text'
                            placeholder='Search a hero'
                            className='form-control'
                            name='searchText'
                            autoComplete='off'
                            value= { searchText }
                            onChange={ handleInputChange }
                        />
                        <div className='d-grid gap-2'>
                            <button
                                type='submit'
                                className='btn btn-outline-dark mt-3'
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                <div className='col-8 d-flex flex-column'>
                    <h4>Results</h4>
                    <hr />

                    {
                        ( q === '') 
                            ? <div className='alert alert-dark'>Search a Hero in the form</div>
                            : ( heroesFiltered.length === 0 )
                                && <div className='alert alert-danger'>No results for: { q } </div>
                    }

                    {
                        heroesFiltered.map( heroe => (
                            <HeroCard
                                key={ heroe.id }
                                { ...heroe }
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
