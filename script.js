let pokmonOptionUrl = "https:pokeapi.co/api/v2/type/";
let pokomonDisplayUrl = "https://pokeapi.co/api/v2/pokemon";


let filterPokemn = document.getElementById("filterPokemon");
let filterbtn = document.getElementById("filter");
const objVlaue = {};

function fetchapi() {
  fetch(pokmonOptionUrl)
    .then((response) => response.json())
    .then((parsedResponse) => {
      //   console.log(parsedResponse);
      for (let i = 0; i < parsedResponse.results.length; i++) {
        const name = parsedResponse.results[i].name;
        const urls = parsedResponse.results[i].url;
        objVlaue[name] = urls;

        let option = document.createElement("option");
        //  option.setAttribute("value" ,`${arr.name}`);  //option give a value;
        // option.setAttribute("data-url", `${arr.urls}`);
        option.innerText = name;
        filterPokemn.appendChild(option);
        let b = option.value; // option give value
      }
    });
}

fetchapi();




let pokemonList = document.getElementById("pokemon-list");

function updatePokemon(parsedResponse) {
  for (let i = 1; i <= parsedResponse.pokemon.length; i++) {
    // console.log(parsedResponse.pokemon);
    let name = parsedResponse.pokemon[i].pokemon.name;
    let urls = parsedResponse.pokemon[i].pokemon.url;
    // console.log(urls);
    pokemonList.innerHTML = "";
    fetch(urls)
      .then((response) => response.json())
      .then((parsedResponse) => {
        // console.log(parsedResponse);
        // console.log(parsedResponse.sprites.back_default
        //     );

        let pokediv = document.createElement("div");
        let pokeimg = document.createElement("img");
        pokeimg.setAttribute("src", `${parsedResponse.sprites.front_default}`);

        let pokepara = document.createElement("p"); // give me a name
        console.log(pokepara);

        pokepara.innerText = `${name}`;
        let poketype = document.createElement("p");

        poketype.innerText = parsedResponse.types[0].type.name;

        let count = document.createElement("p");
        count.innerText = i;
        pokemonList.appendChild(pokediv);
        pokediv.appendChild(count);
        pokediv.appendChild(pokeimg);
        pokediv.appendChild(pokepara);
        pokediv.appendChild(poketype);

        pokediv.classList.add("box");
        count.classList.add("number");
        pokeimg.classList.add("img");
        pokepara.classList.add("nameImg");
        poketype.classList.add("type");
    });
  }
}

function fetchUsingSecondUrls(selectValue) {
  fetch(objVlaue[selectValue])
    .then((response) => response.json())
    .then((parsedResponse) => {
      //   console.log(parsedResponse);

      updatePokemon(parsedResponse);
    });
}

filterbtn.addEventListener("click", () => {
  let selectValue = filterPokemn.value;
  // console.log(selectValue);
  fetchUsingSecondUrls(selectValue);
});

// let inputPokemonName = document.getElementById("input_pokemon");

// inputPokemonName.addEventListener("keydown" ,() =>{
//     let inputPokemonName = filterPokemn.value;
//     console.log(inputPokemonName );
//     fetchUsingSecondUrls(inputPokemonName);
// })

