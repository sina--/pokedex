let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function () {
      return pokemonList;
    },
    addListItem: function (pokemon) {
      let pokemonListContainer = document.querySelector(".pokemon-list");
      let listItem = document.createElement("button");
      listItem.classList.add("list-group-item", "list-group-item-action");
      listItem.setAttribute("data-toggle", "modal");
      listItem.setAttribute("data-target", "#pokemonModal");
      listItem.innerText = pokemon.name;
      pokemonListContainer.appendChild(listItem);
      listItem.addEventListener("click", function () {
        pokemonRepository.showDetails(pokemon);
      });
    },
    loadList: function () {
      return fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            pokemonRepository.add(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadListDetails: function (item) {
      let pokemonDetailsUrl = item.detailsUrl;
      return fetch(pokemonDetailsUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          item.iconUrl =
            details.sprites.versions["generation-viii"].icons.front_default;
          item.id = details.id;
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: function (item) {
      let pokemonDetailsUrl = item.detailsUrl;
      return fetch(pokemonDetailsUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height / 10;
          item.types = details.types.map(function (typeEntry) {
            return typeEntry.type.name;
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    showDetails: function (pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        let modalTitle = document.querySelector(".modal-title");
        modalTitle.innerText = pokemon.name;

        let modalImage = document.getElementById("pokemonImage");
        modalImage.src = pokemon.imageUrl;

        let modalHeight = document.getElementById("pokemonHeight");
        modalHeight.innerText = `Height: ${pokemon.height}m`;

        let modalType = document.getElementById("pokemonType");
        modalType.innerText = `Type: ${pokemon.types.join(", ")}`;
      });
    },
  };
})();

window.addEventListener("DOMContentLoaded", function () {
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
});
