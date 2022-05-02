import React, { useState, useRef } from 'react';
import Cards from './Cards';
import Searchbar, { IApiCardData } from './Searchbar';

export default function HomePage() {
  const [cards, setCards] = useState([] as Array<IApiCardData>);
  const [isLoaded, setIsLoaded] = useState(true);
  const [currentCard, setCurrentCard] = useState(0);
  const containerRef = useRef(null) as React.RefObject<HTMLInputElement>;

  function updateCardsData(data: Array<IApiCardData> | undefined) {
    data ? setCards(data) : setCards([]);
    setTimeout(() => setIsLoaded(true), 1000);
  }
  function clearCardsData() {
    setCards([]);
    setIsLoaded(false);
  }
  function changeCurrentCard(id: number) {
    setCurrentCard(id);
  }

  return (
    <div className="Home-container">
      <div className="Home-box">
        <Searchbar updateCardsData={updateCardsData} clearState={clearCardsData} />
        <div ref={containerRef}></div>
        <Cards
          cards={cards}
          isLoaded={isLoaded}
          currentCard={currentCard}
          cardChanger={changeCurrentCard}
          containerRef={containerRef}
        />
      </div>
    </div>
  );
}
