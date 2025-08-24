import { useEffect, useState } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import '../styling/App.css';
import { getApiData, getDetailedInfo, getPopular } from "../utils/ApiRequests.tsx";
import { hiddenMoviesList } from '../utils/HiddenMoviesList.tsx';
import { DetailedItem, Item, Movie } from '../utils/Types.tsx';
import InformationModal from './InformationModal.tsx';
import List from "./List.tsx";
import Search from "./Search.tsx";

function App() {
  const [item, setItem] = useState<DetailedItem>();
  const [itemsList, setItemsList] = useState<Item[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchFilter, setSearchFilter] = useState("movie");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
 
  const getData = async (text: string, category: string) => {
    let apiSearch = text ? text.trim() && await getApiData(text, category) : await getPopular();
    apiSearch && setItemsList(apiSearch);
  }

  const loadHiddenList = async () => {
    setHidden(true);
    const result = [] as Item[];

    const hiddenMovies = hiddenMoviesList;
    hiddenMovies.forEach((item) => {
      result.push({
        id: item.id,
        info: [
          { label: "Title: ", value: item.title },
          { label: "Popularity: ", value: item.popularity },
          { label: "Score: ", value: item.vote_average },
          { label: "Number of Votes: ", value: item.vote_count }
        ],
        image: item.poster_path,
        type: "movie",
        watched: item.watched
      });
    });
    setItemsList(result);
  }

  const selectItem = async (id: number, type: string) => {
    let itemInfo = await getDetailedInfo(id, type) as Movie;
    //TODO: Look through itemInfo if hidden = true and find it in the list. If it exists, which it should, add its item.watched to itemInfo
    if (itemInfo) {
      if (hidden) {
        itemInfo.watched = itemsList.find(item => item.id === id)?.watched;
      }
      setItem(itemInfo);
      setOpen(true);
    }
  }

  const handleViewedMovie = (checked: boolean, id: number) => {
    setItemsList(newList => newList.map(list => {
      if (list.id !== id) return list;
      return { ...list, watched: checked }
    }));
  }

  useEffect(() => {
    setHidden(false);
    getData(searchValue, searchFilter);
  }, [searchValue, searchFilter]);

  useEffect(() => {
    const getDefaultData = async () => {
      let apiSearch = await getPopular();
      apiSearch && setItemsList(apiSearch);
    }
    getDefaultData();
  }, [])

  const filterSearch = (value: string) => setSearchFilter(value)

  return (
    <div className="App">
      <ReactNotifications />
      <input type='button' value="Secret Mae movie list" onClick={() => loadHiddenList()} />
      <Search searchValue={searchValue} setSearchValue={value => setSearchValue(value.target.value)} searchFilter={searchFilter} filterSearch={filterSearch} />
      <List items={itemsList} selectItem={selectItem} />
      <InformationModal open={open} setOpen={() => setOpen(false)} item={item} hidden={hidden} setViewedMovie={(checked, id) => handleViewedMovie(checked, id)} />
    </div>
  );
}

export default App;
