import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Card from "./Card"
import "./CardDraw.css"

const CardDraw = () => {
    const [card, setCard] = useState([]);
    const [cardVisible, setCardVisible] = useState(false);
    const [cardDeck, setCardDeck] = useState("");
    const [angle, setAngle] = useState(0);
    const [draw, setDraw] = useState(false);
    const [autoDraw, setAutoDraw] = useState(false);
    const timerRef = useRef(null);

    const baseUrl = "http://deckofcardsapi.com/api/deck";

    useEffect(() => {
        async function getDeck() {
            let res = await axios.get(`${baseUrl}/new/`);
            setCardDeck(res.data.deck_id);
        } getDeck();
    }, [setCardDeck]);

    useEffect(() => {
        let deck = cardDeck
        async function drawCard() {
            try {
                let res = await axios.get(`${baseUrl}/${deck}/draw/`);

                if(res.data.remaining === 0){
                    setCardVisible(false);
                    setAutoDraw(false);
                    throw new Error("no cards remaining!");
                }
                setCard(res.data.cards[0]);
                setAngle(a => a + 10);
                setCardVisible(true); 

            } catch(err){
                alert(err);
            }                       
        }

        if(draw){
            drawCard();
            setDraw(false)
        }

        if (autoDraw && !timerRef.current) {
            timerRef.current = setInterval(async () => {
              await drawCard();
            }, 500);
          }
      
          return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
          };

    }, [cardDeck, draw, autoDraw, setDraw, setAutoDraw])

    function toggleDraw(){
        setDraw(true);
    }

    function toggleAutoDraw(){
        setAutoDraw(auto => !auto);
    }

    return (
        <div>
            <button onClick={toggleDraw}>Draw Card</button>
            <button onClick={toggleAutoDraw}>Auto Draw</button>
            <div className="CardDraw-container">
                {cardVisible && <Card newCard={card} angle={angle} />}
                           
            </div>
        </div>
    )
}


// let angle = 0;

//  async function drawCard(){
//      let response = await $.getJSON(`${baseUrl}/${onloadDeck}/draw/?count=1`);
//      $('.placeCard').append($('<img>', {
//         src: response.cards[0].image,
//         css: {
//             transform: `rotate(${angle}deg)`,
//             position: 'absolute',
//             left:0,
//             right:0,
//         }
//     }))
//     angle += 10;
//     if (response.remaining === 0){
//         $('.drawBtn').remove();
//     }     
//  }




export default CardDraw;