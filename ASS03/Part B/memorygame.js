

let letters = ["A","B","C","D","A","B","C","D"];


letters.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let attempts = 0;
let matches = 0;

let game = document.getElementById("game");

for(let i=0;i<letters.length;i++)
{
    let card = document.createElement("div");

    card.className = "card";

    card.innerHTML = "?";

    card.dataset.letter = letters[i];

    card.onclick = function()
    {
        if(card.innerHTML != "?" || secondCard != null)
            return;

        card.innerHTML = card.dataset.letter;

        if(firstCard == null)
        {
            firstCard = card;
        }
        else
        {
            secondCard = card;

            attempts++;

            document.getElementById("attempt").innerHTML = attempts;

            if(firstCard.dataset.letter == secondCard.dataset.letter)
            {
                matches++;

                document.getElementById("match").innerHTML = matches;

                firstCard = null;
                secondCard = null;

                if(matches == 4)
                {
                    alert("You Won!");
                }
            }
            else
            {
                setTimeout(function(){

                    firstCard.innerHTML = "?";
                    secondCard.innerHTML = "?";

                    firstCard = null;
                    secondCard = null;

                },700);
            }
        }
    };

    game.appendChild(card);
}


