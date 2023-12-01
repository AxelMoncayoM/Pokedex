const pokemonList = document.querySelector("#pokemon-list");
let url = "https://pokeapi.co/api/v2/pokemon/";
const buttons = document.querySelectorAll(".btn-header");

for (let i = 1; i <= 151; i++) {
  fetch(url + i)
    .then((response) => response.json())
    .then((data) => showPokemon(data));
}

function showPokemon(poke) {
  let types = poke.types.map(
    (type) => `
    <p class="${type.type.name} type">${type.type.name}</p>

  `
  );

  types = types.join();

  const div = document.createElement("DIV");

  div.classList.add("pokemon");
  div.innerHTML = `
        
        <p class="pokemon-id-back">#${poke.id}</p>
        <div class="pokemon-img">
        <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png"
            alt="${poke.name} image"
        />
        </div>

        <div class="pokemon-info">
            <div class="container-name">
                <p class="pokemon-id">#${poke.id}</p>
                <h2 class="pokemon-name">${poke.name}</h2>
            </div>

            <div class="pokemon-types">
                ${types}
            </div>

            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        <!--div pokemon info-->
        </div>
    `;
  pokemonList.append(div);
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const buttonId = e.currentTarget.id;

    pokemonList.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
      fetch(url + i)
        .then((response) => response.json())
        .then((data) => {
          if (buttonId === "ver-todos") {
            showPokemon(data);
          } else {
            const types = data.types.map((type) => type.type.name);
            if (types.some((type) => type.includes(buttonId))) {
              showPokemon(data);
            }
          }
        });
    }
  });
});

/* <div class="pokemon">
            <p class="pokemon-id-back">#025</p>
            <div class="pokemon-img">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                alt="pokemon pikachu image"
              />
            </div>

            <div class="pokemon-info">
              <div class="container-name">
                <p class="pokemon-id">#025</p>
                <h2 class="pokemon-name">Pikachu</h2>
              </div>

              <div class="pokemon-types">
                <p class="type electric">Electric</p>
                <p class="type">Normal</p>
              </div>

              <div class="pokemon-stats">
                <p class="stat">4m</p>
                <p class="stat">12kg</p>
              </div>
              <!--div pokemon info-->
            </div>
            <!--div pokemon-->
          </div> */
