import React from "react";
import CircularProgressBar from "../../components/CircularProgressBar";
import "./CardBox.css";

const CardBox = (props) => {
  const cards = [
    { title: "Card 1", content: "This is card 1 content" },
    { title: "Card 2", content: "This is card 2 content" },
    { title: "Card 3", content: "This is card 3 content" },
    { title: "Card 4", content: "This is card 4 content" },
  ];

  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <div key={index} className="card-box">
          <div className="card-header">Header</div>
          <div className="card-body">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.content}</p>
          </div>
          <div className="card-footer">
            <CircularProgressBar percentage={75} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardBox;
