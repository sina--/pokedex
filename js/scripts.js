let pokemonRepository = (function () {
    let pokemonList = [
        { 
            name: 'bulbasaur',
            height: 0.7,
            types: ['grass', 'poison']
        },
        { 
            name: 'ivysaur',
            height: 1,
            types: ['grass', 'poison']
        },
        { 
            name: 'venusaur',
            height: 2,
            types: ['grass', 'poison']
        },
        { 
            name: 'charmander',
            height: 0.6,
            types: ['fire']
        },
        { 
            name: 'charmeleon',
            height: 1.1,
            types: ['fire']
        },
        { 
            name: 'charizard',
            height: 1.7,
            types: ['fire', 'flying']
        },
        { 
            name: 'squirtle',
            height: 0.5,
            types: ['water']
        },
        { 
            name: 'wartortle',
            height: 1,
            types: ['water']
        },
        { 
            name: 'blastoise',
            height: 1.6,
            types: ['water']
        }
    ];

    return {
        add: function(pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function() {
            return pokemonList;
        }
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) { // loop through each pokemon in the pokemonList
    document.write(pokemon.name + ' (height: ' + pokemon.height + 'm)'); // use the name and height properties of each pokemon object to append the pokemon's attributes to our document
    if (pokemon.height > 1.7) {// check if the pokemon's height is greater than 1.7
        document.write(' - Wow, that\'s big!'); //if the height is greater than 1, append an additional message, escape the apostrophe from ending the string with \
    }
    document.write('<br/>'); //once it has gone through one pokemon, add a line break so that the next pokemon is listed on a new line
});