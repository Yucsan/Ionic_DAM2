

import { PokemonInterface } from './PokemonInterface'

export class Pokemon implements PokemonInterface {
    constructor(
        public id: number,
        public name: string,
        public height: number,
        public weight: number,
        public types: string[],
        public url: string,
        public imageUrl: string
    ) {
    }
    
}