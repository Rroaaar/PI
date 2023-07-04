import s from './home.module.css';
import SearchBar from '../SearchBar/searchBar';
import Cards from '../Cards/Cards';
import Pagination from '../Pagination/Pagination';
import { useEffect, useState } from 'react';
import { sortBySimilarity, alphabeticSort, ratingSort } from './functions';

const apiHost = process.env.REACT_APP_API_HOST;

export default function Home() {

  const [readyCharacters, setReadyCharacters] = useState([]);
  const [filters, setFilters] = useState({genre:'', origin:''})
  const [i, setI] = useState(0);
  const[word, setWord] = useState('')
  const [typeOrder, setTypeOrder] = useState("")
  const [order, setOrder] = useState("")

  async function search(char, genreSearch = filters['genre'], originSearch = filters['origin']) {
    setReadyCharacters([])
    if(char) setWord(char)
    async function resolvePromisesSequentially(promises) {
      for (const promise of promises) {
        await promise;
      }
    }
    if (char) {
      async function fetchData() {
        const promises = [];
        if (originSearch === 'DB') {
          let j = 0
          let allowLoop = true
          while (readyCharacters.length <= 120 || allowLoop) {
            let k = j
            for (let i = j; i < k + 6; i++) {
              j++
              promises.push(
                fetch(`http://${apiHost}/videogames?name=${char}${i ? `&page=${i + 1}` : ""}`)
                  .then(response => response.json())
                  .then(data => {
                    if (Array.isArray(data)) {
                      setReadyCharacters(prevCharacters => [...prevCharacters, ...data.filter(character => {
                        if (genreSearch) { return typeof character.id === 'string' && character.genres.includes(genreSearch) }
                        else {
                          return typeof character.id === 'string'
                        }
                      })]);
                    }else{allowLoop = false}
                  })
              );
            }
            await resolvePromisesSequentially(promises);
          }
        } else if (originSearch === "API") {
          let j = 0
          let allowLoop = true
          while (readyCharacters.length <= 120 || allowLoop) {
            let k = j
            for (let i = j; i < k + 6; i++) {
              j++
              promises.push(
                fetch(`http://${apiHost}/videogames?name=${char}${i ? `&page=${i + 1}` : ""}`)
                  .then(response => response.json())
                  .then(data => {
                    if (Array.isArray(data)) {
                      setReadyCharacters(prevCharacters => [...prevCharacters, ...data.filter(character => {
                        if (genreSearch) { return typeof character.id === 'number' && character.genres.includes(genreSearch) }
                        else {
                          return typeof character.id === 'number'
                        }
                      })]);
                    }else{allowLoop = false}
                  })
              );
            }
            await resolvePromisesSequentially(promises);
          }
        }
        else if (genreSearch && !originSearch) {
          let j = 0
          let alllowLoop = true
          while (readyCharacters.length <= 120 || alllowLoop) {
            let k = j
            for (let i = j; i < k + 6; i++) {
              j++
              promises.push(
                fetch(`http://${apiHost}/videogames?name=${char}${i ? `&page=${i + 1}` : ""}`)
                  .then(response => response.json())
                  .then(data => {
                    if (Array.isArray(data)) {
                      setReadyCharacters(prevCharacters => [...prevCharacters, ...data.filter(character => character.genres.includes(genreSearch))]);
                    }else{alllowLoop= false}
                  })
              );
            }
            await resolvePromisesSequentially(promises);
          }
        } else {
          for (let i = 0; i < 6; i++) {
            promises.push(
              fetch(`http://${apiHost}/videogames?name=${char}${i ? `&page=${i + 1}` : ""}`)
                .then(response => response.json())
                .then(data => {
                  if (Array.isArray(data)) {
                    setReadyCharacters(prevCharacters => [...prevCharacters, ...data]);
                  }
                })
            );
          }
          await resolvePromisesSequentially(promises);
        }
      }
      await fetchData();
    } else {
      function fetchData() {
        const promises = [];
        for (let i = 0; i < 6; i++) {
          promises.push(
            fetch(`http://${apiHost}/videogames${i ? `?page=${i + 1}` : ""}`)
              .then(response => response.json())
              .then(data => {
                if (Array.isArray(data)) {
                  setReadyCharacters(prevCharacters => [...prevCharacters, ...data]);
                }
              })
          );
        }
        return resolvePromisesSequentially(promises);
      }
      fetchData();
    }
  }

  function pageHandler(num) {
    setI((num - 1) * 15);
  }

  useEffect(() => {search()}, []);

  function changeFilters(type, value){
    setFilters({...filters,[type]:value})
    console.log(filters)
  };

  function Sort(type, order){
    setTypeOrder(type)
    setOrder(order)
  }

  return (
    <div className={s.content}>
      <SearchBar onSearch={search} filters={changeFilters} origin={filters['origin']} genre={filters['genre']} sort={Sort}/>
      {readyCharacters.length? <Cards characters={order? typeOrder === "ALP"? alphabeticSort(readyCharacters, order).slice(i,i+15):ratingSort(readyCharacters,order).slice(i,i+15): sortBySimilarity(readyCharacters,word).slice(i,i+15)}/> : null}
      {readyCharacters.length ? (
        <Pagination pages={Math.ceil(readyCharacters.length / 15)} onPageChange={pageHandler} />
      ) : null}
    </div>
  );
}

