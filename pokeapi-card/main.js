const baseURL = 'https://pokeapi.co/api/v2'
const pokemonEl = document.querySelector('.pokemons')

let collected=[]
let id = 0;

function addListToHtml (htmlElement,list){
    for(i=0; i < list.legth ; i++){
    htmlElement.innerHTML += `<div>${list[i].name}</div>`
    }
}

async function getAllPokemon(){
    let res = await fetch(`${baseURL}/pokemon`)
    let data = await res.json()

    console.log(data.results)

    let pokemons =data.results

    addListToHtml (pokemonEl,pokemons)
}

async function getSinglePokemon (name) {
    let res = await fetch (`${baseURL}/pokemon/${name}`) 
    let data = await res.json()

}
getAllPokemon()
getSinglePokemon('ditto')


function Character(name, health){
    this.name=name;
    this.health=health;

    this.healthBtn = document.querySelector(`#${this.name}-advance`)
    this.progress = document.querySelector(`.${this.name}-health span`)
}

Character.prototype.attack = function (opponent){
    if(opponent.health > 0){
        opponent.progress.style.width= `${opponent.health}%`;
    }
    else{
        opponent.healthBtn.remove()
    }


}
Character.prototype.rollTheDiceAdvance = function (){
    if(this.health< 100){
        this.health+= 10;
        this.progress.style.width= `${this.health}%`;

    }
    if(this.health> 100){
        this.health= 100;
    }
}

let dice = new Character('dice',10,100);

dice.healthBtn.addEventListener('click',function(){
    dice.rollTheDiceAdvance()
})

//zar atma fonksiyonu
function rollTheDice(){
    var dice ;
    dice =Math.floor( Math.random()*6 +1 );
    // 1- 6 arası değer  
    document.getElementById("dice-advance").innerHTML = dice;

    id+= dice

    //  console.log(id)
    
    // collected.push(id)
    getPokeData(id);
}

function path(dice){
    document.getElementById("path").innerHTML = `
    <div id="path" style="width=${dice}"></div> 
    `
}
// console.log(collected)

const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };
  const url = " https://pokeapi.co/api/v2/pokemon/";
  const card = document.getElementById("card");
  const btn = document.getElementById("btn");
  let getPokeData = (id) => {

    const finalUrl = url + id;
    // Fetch generated URL
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        generateCard(data);
      });
  };
  //Generate Card
  let generateCard = (data) => {
    // Get necessary data and assign it to variables
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;
    // Set themeColor based on pokemon type
    const themeColor = typeColor[data.types[0].type.name];
    console.log(themeColor);
    card.innerHTML = `
          <p class="hp">
            <span>HP</span>
              ${hp}
          </p>
          <img src=${imgSrc} />
          <h2 class="poke-name">${pokeName}</h2>
          <div class="types">
           
          </div>
          <div class="stats">
            <div>
              <h3>${statAttack}</h3>
              <p>Attack</p>
            </div>
            <div>
              <h3>${statDefense}</h3>
              <p>Defense</p>
            </div>
            <div>
              <h3>${statSpeed}</h3>
              <p>Speed</p>
            </div>
          </div>
    `;
    appendTypes(data.types);
    styleCard(themeColor);
  };
  let appendTypes = (types) => {
    types.forEach((item) => {
      let span = document.createElement("SPAN");
      span.textContent = item.type.name;
      document.querySelector(".types").appendChild(span);
    });
  };
  let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach((typeColor) => {
      typeColor.style.backgroundColor = color;
    });
  };
