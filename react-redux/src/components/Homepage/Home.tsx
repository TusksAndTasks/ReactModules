import { useSelector } from 'react-redux';
import { IState } from '../../redux/store';
import Cards from './Cards';
import Searchbar from './Searchbar';
import SearchParam from './SearchParam';

export default function HomePage() {
  const { cards, isLoaded } = useSelector((state: IState) => state.searchBar);
  const nameArr = ['Alive', 'Dead', 'Unknown'];

  return (
    <div className="Home-container">
      <div className="Home-box">
        <Searchbar />
        <SearchParam nameArr={nameArr} />
        <Cards cards={cards} isLoaded={isLoaded} />
      </div>
    </div>
  );
}
