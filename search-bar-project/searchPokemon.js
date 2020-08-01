
document.getElementById("pokemonName").addEventListener("keyup", function(event) {
    let searchQuery = event.target.value.toLowerCase();
    let allPokemonInList = document.getElementsByClassName("name");
    for (let counter = 0; counter < allPokemonInList.length; counter++) {
        const currentName = allPokemonInList[counter].textContent.toLowerCase();
        if (currentName.includes(searchQuery)) {
            allPokemonInList[counter].style.display = 'block';
        } else {
            allPokemonInList[counter].style.display = 'none';
        }
    }
});
