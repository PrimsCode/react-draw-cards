import React from "react";
import "./Card.css"

const Card = ({newCard, angle}) => {
    return (
        <div className="Card-container">
            <img src={`${newCard.image}`} style={{
                transform: `rotate(${angle}deg)`,
                position: `absolute`,
                left:0,
                right:0
            }}/>
        </div>
    )
}

export default Card;