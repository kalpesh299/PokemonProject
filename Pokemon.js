const input=document.getElementById("input");
const getall=document.getElementById("getall");
const cardcontainer=document.getElementById("cardcontainer");
const getbyname=document.getElementById("getbyname");
const reset=document.getElementById("reset");
const types=document.getElementById("types");
const pokemonObjects=[];







function getpokemons(){
const promises=[];

for(let i=1;i<=150;i++){

    let url=`https://pokeapi.co/api/v2/pokemon/${i}`;
    const promise=fetch(url).then((response)=>response.json());
    // console.log(promise);
    promises.push(promise);

}

Promise.all(promises).then((data)=>{

    data.map((ele)=>{

     const pokemonObj={
        shinyImage:ele.sprites.front_shiny,
        id:ele.id,
        name:ele.name,
        weight:ele.weight,
        type:ele.types[0].type.name,
        abilities:ele.abilities.map((ele)=>{
        return ele.ability.name;
        })
    }

    pokemonObjects.push(pokemonObj);
    });

    pokemonObjects.map((pokemon)=>{
        // console.log(pokemon);
        createpokemoncard(pokemon);

       
        
    });
});
}



function createpokemoncard(pokemon){
    const card=document.createElement("div");
    const id=document.createElement("h3")
    const poke_image=document.createElement("img");
    const name=document.createElement("h2");
    const speciality=document.createElement("h3")
    const weight=document.createElement("h4");
    const abilitydiv=document.createElement("div");
    const abilityparas=pokemon.abilities.map((ele)=>{
         const abilitypara=document.createElement("p");
         abilitypara.innerText=ele;
         return abilitypara;
    })

    id.innerText=`Poke id - ${pokemon.id} `;
    poke_image.src= pokemon.shinyImage;
    name.innerText=`Poke Name - ${pokemon.name}`;
    speciality.innerText=`Type ${pokemon.type}`;
    weight.innerText=`Poke Weight - ${pokemon.weight}`;
    card.appendChild(id);
    card.appendChild(poke_image);
    card.appendChild(name);
    card.appendChild(speciality);
    card.appendChild(weight);
    abilityparas.map((ele)=>{
        abilitydiv.appendChild(ele);
    })
    card.classList.add("card");
    card.appendChild(abilitydiv);
    abilitydiv.classList.add("abilitydiv");
    cardcontainer.appendChild(card);
}

getpokemons();
// 
getall.addEventListener("click",()=>{
    getpokemons();
})

getbyname.addEventListener("click",(e)=>{
    console.log(pokemonObjects.length);
e.preventDefault();
const filterdpokemons=pokemonObjects.filter((el)=>{
    return el.name.includes(input.value.toLowerCase());
})

cardcontainer.innerHTML="";
filterdpokemons.map((el)=>{
    createpokemoncard(el);
})

input.value=" ";
});


types.addEventListener("change",()=>{
   console.log(types.value);
    const filterbyTypedpokemons=pokemonObjects.filter((el)=>{
        return el.type==types.value.toLowerCase();
    })
    
    cardcontainer.innerHTML="";
    filterbyTypedpokemons.map((el)=>{
        createpokemoncard(el);
    })
    types.value="";
    

})

reset.addEventListener("click",()=>{
    cardcontainer.innerHTML=" ";
    getpokemons();
})