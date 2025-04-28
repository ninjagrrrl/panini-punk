import React from "react";
import { TradingCard } from "../types/tradingCard";
import Card from "./Card";

type CardGridProps = {
  cards: TradingCard[];
  onEditCard: (card: TradingCard) => void;
  deleteCard: (cardId: string) => void;
};

const CardGrid: React.FC<CardGridProps> = ({ cards, onEditCard }) => {
  console.log("Cards in CardGrid:", cards);

  if (cards.length === 0) {
    return (
      <div className="p-8 bg-white bg-opacity-70 rounded-lg text-center">
        <p className="text-gray-600 text-lg">
          No trading cards yet. Create your first one above!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.id} card={card} onEdit={onEditCard} />
      ))}
    </div>
  );
};

export default CardGrid;
