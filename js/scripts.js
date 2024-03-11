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
        },
        addListItem: function(pokemon) {
            let pokemonListContainer = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            let listEntry = document.createElement('button');
            listEntry.innerText = pokemon.name;
            listEntry.classList.add('pokemon-entry');
            listEntry.addEventListener('click', function() {
                console.log(pokemon.name);
            });
            listItem.appendChild(listEntry);
            pokemonListContainer.appendChild(listItem);
        }
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});
