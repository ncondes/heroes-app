import { heroes } from "../data/heroes";

export const getHeroesByName = (name = '') => {

    if ( name === '' || name === undefined ) {
        return [];
    }

    const selectedHero = heroes.filter( heroe => heroe.superhero.toLowerCase().includes( name.toLowerCase() ) ) ;

    return selectedHero;

}