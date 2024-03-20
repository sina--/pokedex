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
            pokemonRepository.loadListDetails(pokemon).then(function () {
                let listNumber = document.createElement('span');
                listNumber.innerText = `No.${pokemon.id.toString().padStart(3, '0')}`;
                listNumber.classList.add('list-number');
                let listIcon = document.createElement('img');
                listIcon.src = `${pokemon.iconUrl}`;
                listIcon.classList.add('list-icon');
                let listName = document.createElement('div');
                listName.innerText = `${pokemon.name}`;
                listName.classList.add('list-name');
                listItem.appendChild(listNumber);
                listItem.appendChild(listIcon);
                listItem.appendChild(listName);
            });
            listItem.addEventListener('click', function () {
                pokemonRepository.showDetails(pokemon);
            });
            listItem.classList.add('list-item');
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
        loadListDetails: function (item) {
            let pokemonDetailsUrl = item.detailsUrl;
            return fetch(pokemonDetailsUrl).then(function (response) {
                return response.json();
            }).then(function (details) {
                item.iconUrl = details.sprites.versions['generation-viii'].icons.front_default;
                item.id = details.id;
                // console.log(item.iconUrl);
            }).catch(function (e) {
                console.error(e);
            });
        },
        loadDetails: function (item) {
            let pokemonDetailsUrl = item.detailsUrl;
            return fetch(pokemonDetailsUrl).then(function (response) {
                return response.json();
            }).then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types.map(function (typeEntry) {
                    return typeEntry.type.name;
                });
            }).catch(function (e) {
                console.error(e);
            });
        },
        showDetails: function (pokemon) {
            pokemonRepository.loadDetails(pokemon).then(function () {
                pokemonRepository.showModal(pokemon.name, pokemon.height, pokemon.types, pokemon.imageUrl);
            });
        },
        showModal: function (title, height, type, imgSrc) {
            let modalContainer = document.querySelector('#modal-container');
            modalContainer.innerHTML = '';

            let modal = document.createElement('div');
            modal.classList.add('modal');

            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', pokemonRepository.hideModal);

            let titleElement = document.createElement('h1');
            titleElement.innerText = title;

            let modalContent = document.createElement('div');
            modalContent.classList.add('modal-content');

            let imageElement = document.createElement('img');
            imageElement.src = imgSrc;

            let detailContainer = document.createElement('ul');
            let detailHeight = document.createElement('li');
            detailHeight.innerText = `Height: ${height}m`;
            let detailType = document.createElement('li');
            if(type.length > 1) {
                detailType.innerHTML = `Types: <span class='typing' style="background-color: var(--${type[0]}-color)">${type[0]}</span> <span class='typing' style="background-color: var(--${type[1]}-color)">${type[1]}</span>`;
            } else {
                detailType.innerHTML = `Type: <span class='typing' style="background-color: var(--${type}-color)">${type}</span>`;
            }
            detailContainer.appendChild(detailType);
            detailContainer.appendChild(detailHeight);

            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(modalContent);
            modalContent.appendChild(detailContainer);
            modalContent.appendChild(imageElement);
            modalContainer.appendChild(modal);
            
            modalContainer.classList.add('is-visible');

            modalContainer.addEventListener('click', (e) => {
                let target = e.target;
                if (target === modalContainer) {
                    pokemonRepository.hideModal();
                }
            });
        },
        hideModal: function () {
            let modalContainer = document.querySelector('#modal-container');
            modalContainer.classList.remove('is-visible');
        }
    };
})();

window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        pokemonRepository.hideModal();
    }
});

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
