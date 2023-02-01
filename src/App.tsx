import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBar from "./components/search-box/search-box.component";
import { getData } from "./utils/data.utils";

export type Monstor = {
  id: string;
  name: string;
  email: string;
};

const App = () => {
  const [searchField, setSearchField] = useState(""); //[value, setValue]
  const [monstors, setMonstors] = useState<Monstor[]>([]);
  const [filteredMonstor, setFilteredMonstor] = useState(monstors);

  // console.log(searchField);
  // Rerunder the function when the value of a state changes...

  useEffect(() => {
    //We Pass state like monstors or a props if we need to rerunder the function
    //otherwise leve it empty the useEffect is run only one.

    const fetchUser = async () => {
      const user = await getData<Monstor[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setMonstors(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const newFilteredMonstor = monstors.filter((monstor) => {
      return monstor.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonstor(newFilteredMonstor);
  }, [monstors, searchField]);

  const onSearchChanges = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="title">Monstors Rolodex</h1>
      <SearchBar
        className="search-box"
        placeholder="Search Monstors"
        onChangeHandler={onSearchChanges}
      />
      <CardList monstors={filteredMonstor} />
    </div>
  );
};

export default App;
