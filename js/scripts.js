let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    return {
        add: function (pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function () {
            return pokemonList;
        },
        addListItem: function (pokemon) {
            let pokemonListContainer = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            let listEntry = document.createElement('button');
            listEntry.innerText = pokemon.name;
            listEntry.classList.add('pokemon-entry');
            listEntry.addEventListener('click', function () {
                pokemonRepository.showDetails(pokemon);
            });
            listItem.appendChild(listEntry);
            pokemonListContainer.appendChild(listItem);
        },
        loadList: function () {
            return fetch(apiUrl).then(function (response) {
                return response.json();
            }).then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    pokemonRepository.add(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
        },
        loadDetails: function (item) {
            let pokemonDetailsUrl = item.detailsUrl;
            return fetch(pokemonDetailsUrl).then(function (response) {
                return response.json();
            }).then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            }).catch(function (e) {
                console.error(e);
            });
        },
        showDetails: function (pokemon) {
            pokemonRepository.loadDetails(pokemon).then(function () {
                console.log(pokemon);
            });
        }
    };

})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
