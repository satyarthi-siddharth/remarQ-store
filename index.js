const btnEl = document.getElementById("btn");
const mainEl = document.getElementById("main");


getCards().forEach((card) => {
    const cardEl = createCard(card.id, card.content);
    mainEl.insertBefore(cardEl, btnEl);    
});

btnEl.addEventListener("click", addCard);

function createCard(id, content){
    const card = document.createElement("textarea");
    card.classList.add("card");
    card.placeholder = "Empty Note";
    card.value = content;

    card.addEventListener("dblclick", ()=>{
        const warning = confirm("Do you want to delete this card?");

        if(warning){
            deleteCard(id, card);
        }
    })

    card.addEventListener("input", ()=>{
        updateCard(id, card.value);
    })

    return card;
}

function updateCard(id, content){
    const cards = getCards();
    const card = cards.filter((card)=> card.id === id)[0];
    card.content = content;

    saveCards(cards);
}

function deleteCard(id, card){
    const cards = getCards().filter((card) => card.id !== id);

    saveCards(cards);
    mainEl.removeChild(card);
}

function getCards(){
    const cards = JSON.parse(localStorage.getItem("cards") || "[]");
    return cards;
}

function saveCards(cards){
    localStorage.setItem("cards", JSON.stringify(cards));
}

function addCard(){
    const cardObj = {
        id: Math.floor(Math.random()*10000000000000),
        content: ""
    };
    const cardEl = createCard(cardObj.id, cardObj.content);
    mainEl.insertBefore(cardEl, btnEl);

    const cards = getCards();
    cards.push(cardObj);
    saveCards(cards);
}