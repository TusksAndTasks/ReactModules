import React from 'react';
import Cards from './Cards';
import Searchbar, { IApiCardData } from './Searchbar';

export default class HomePage extends React.Component<Record<string, never>, IHomeState> {
  containerRef: React.RefObject<HTMLInputElement>;
  constructor(props: Record<string, never>) {
    super(props);

    this.containerRef = React.createRef();

    this.state = {
      cards: [] as Array<IApiCardData>,
      isLoaded: true,
      currentCard: 0,
    };
    this.updateCardsData = this.updateCardsData.bind(this);
    this.clearCardsData = this.clearCardsData.bind(this);
    this.changeCurrentCard = this.changeCurrentCard.bind(this);
  }

  updateCardsData(data: Array<IApiCardData> | undefined) {
    if (!data) {
      this.setState(() => {
        return {
          cards: [],
          isLoaded: true,
        };
      });
    } else {
      setTimeout(
        () =>
          this.setState(() => {
            return {
              cards: data,
              isLoaded: true,
            };
          }),
        1000
      );
    }
  }

  clearCardsData() {
    this.setState(() => {
      return {
        cards: [],
        isLoaded: false,
      };
    });
  }

  changeCurrentCard(id: number) {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentCard: id,
      };
    });
  }

  render() {
    return (
      <div className="Home-container">
        <div className="Home-box">
          <Searchbar stateUpdater={this.updateCardsData} stateClear={this.clearCardsData} />
          <div ref={this.containerRef}></div>
          <Cards
            cards={this.state.cards}
            isLoaded={this.state.isLoaded}
            currentCard={this.state.currentCard}
            cardChanger={this.changeCurrentCard}
            containerRef={this.containerRef}
          />
        </div>
      </div>
    );
  }
}

interface IHomeState {
  cards: Array<IApiCardData>;
  isLoaded: boolean;
  currentCard: number;
}
