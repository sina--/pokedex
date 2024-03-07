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

for (let i = 0; i < pokemonList.length; i++) { //create a loop that iterates through the length of our list of pokemon
    document.write(pokemonList[i].name); //use the name key for each object in the array to append the pokemon name to our document
    document.write(' ' + pokemonList[i].height); //use the height key for each object in the array to append the pokemon name to our document
    if (pokemonList[i].height > 1) { //for each pokemon in the list, check whether it's height is greater than 1
        document.write(' - Wow, that\'s big!') //if the height is greater than 1, append an additional message, escape the apostrophe from ending the string with \
    }
    document.write('<br/>') //once it has gone through one pokemon, add a line break so that the next pokemon is listed on a new line
}