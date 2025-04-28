import React, { useState, useEffect } from "react";
import { TradingCard } from "./types/tradingCard";
import CardForm from "./components/CardForm";
import CardGrid from "./components/CardGrid";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

const LOCAL_STORAGE_KEY = "paniniCards";

const App: React.FC = () => {
  const [cards, setCards] = useLocalStorageState<TradingCard[]>(
    LOCAL_STORAGE_KEY,
    []
  );
  const [editingCard, setEditingCard] = useState<TradingCard | null>(null);

  // Karten beim App-Start aus Local Storage laden
  useEffect(() => {
    const savedCards = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedCards) {
      const parsedCards = JSON.parse(savedCards);
      console.log("Geladene Karten aus localStorage (parsed):", parsedCards);
      setCards(parsedCards);
    }
  }, []);

  // Karten bei jeder Änderung in Local Storage speichern
  useEffect(() => {
    if (cards.length > 0) {
      console.log("Speichere Karten in localStorage:", cards);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards));
    }
  }, [cards]);

  const addCard = (newCard: TradingCard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const updateCard = (updatedCard: TradingCard) => {
    setCards(
      cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
    setEditingCard(null);
  };

  const deleteCard = (cardId: string) => {
    setCards(cards.filter((card) => card.id !== cardId));
    setEditingCard(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-gray-800 relative">
      {/* Background texture */}
      <div
        className="fixed inset-0 bg-[url('https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] opacity-10 bg-repeat"
        style={{ backgroundSize: "400px" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10 p-4 md:p-8">
        <header className="mb-10 text-center relative">
          <div className="absolute -top-5 -left-5 w-20 h-20 bg-yellow-200 rounded-full opacity-30"></div>
          <div className="absolute -top-2 right-10 w-10 h-10 bg-pink-500 rounded-full opacity-40"></div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2 relative inline-block text-[#FF1493]">
            Punk Queens & Riot Grrrls
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-pink-500"></span>
          </h1>

          <div className="flex items-center justify-center">
            <p className="trading text-xl text-white opacity-90 font-medium">
              Trading Cards of Influential Female-Fronted Punk Bands
            </p>
          </div>
        </header>

        <main className="bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg shadow-xl relative overflow-hidden">
          {/* Decorative spray paint */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500 opacity-20 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-200 opacity-20 rounded-full"></div>

          {/* Form section */}
          <CardForm
            onAddCard={addCard}
            onUpdateCard={updateCard}
            editingCard={editingCard}
            onDeleteCard={deleteCard}
          />

          {/* Divider with punk aesthetic */}
          {cards.length > 0 && (
            <div className="my-8 relative">
              <div className="h-0.5 bg-gray-300"></div>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                <span className="text-pink-600 font-bold tracking-wider uppercase text-sm">
                  Collection
                </span>
              </div>
            </div>
          )}

          {/* Cards grid */}
          <CardGrid
            cards={cards}
            onEditCard={setEditingCard}
            deleteCard={deleteCard}
          />
        </main>

        <footer className="mt-6 text-center text-white/70 text-sm">
          &copy; 2025 Punk Trading Cards Collection
        </footer>
      </div>
    </div>
  );
};

export default App;
