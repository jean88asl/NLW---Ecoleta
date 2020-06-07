const populateUFs = () => {
    const ufSelect = document.querySelector("select[name=uf]")

    // Isso irá retornar uma promessa
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
     .then( res => res.json())
     .then( states => {
            for(const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`  
            }
     })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    console.log(ufValue)

    indexOfSelectedSatte = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedSatte].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true

    fetch(url)
     .then( res => res.json())
     .then( cities => {
            for(const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`  
            }

            citySelect.disabled = false
     })

}

document
.querySelector("select[name=uf]")
// Passando a função por referência para que ela não seja executada.
.addEventListener("change", getCities)


// itens de coleta
const itensCollected = document.querySelectorAll(".itens-grid li")

for(const item of itensCollected) {
    item.addEventListener("click", handelSelectedItem)
}

const collectedItems = document.querySelector("input[name=itens]")
let selectedItems = []

function handelSelectedItem(event){
    const itemLi = event.target 

    /* Adicionando ou removendo com o metodo toggle, uma classe de estilo CSS no arquivo html,
    fazendo isso o JS verifica de forma automática se ela já está inclusa ou não*/
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    console.log(itemId)

    //Verificando se existem itens selecionados no array e retornando true ou false
    const alreadySelected = selectedItems.findIndex( item => item === itemId)

    //Verificando se o item já está selecionado. Se sim, ele é removido da seleção
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item !== itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}


























