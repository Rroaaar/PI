import s from './searchBar.module.css'
import mando from '../../images/mando.png'
import busqueda from '../../images/busqueda.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SearchBar(props) {
  const [focus, setFocus] = useState('         busqueda...');
  const [text, setText] = useState('');
  const [filterIsVisible, setFilterIsVisible] = useState(false)
  const [orderIsVisible, setOrderIsVisible] = useState(false)

  function handleFilter() {
    if (filterIsVisible) {
      setFilterIsVisible(false)
    } else {
      setFilterIsVisible(true)
      setOrderIsVisible(false)
    }
  }

  function handleOrder(e) {
    e.stopPropagation();
    if (orderIsVisible) {
      setOrderIsVisible(false);
    } else {
      setOrderIsVisible(true);
      setFilterIsVisible(false);
    }
  }

  function onFocus() {
    setFocus(null);
  }

  function onBlur() {
    setFocus('         busqueda...');
    setText('');
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleGenreChange(e) {
    const selectedGenre = e.target.value;
    props.filters("genre", selectedGenre)
  }

  function handleOriginChange(e) {
    const selectedOrigin = e.target.value;
    props.filters("origin", selectedOrigin)
  }

  return (
    <nav className={s.navbar}>
      <div className={s.navContainer}>
        <div className={s.navbarBrand}>
          <a href="https://www.flaticon.es/iconos-gratis/jugador" title="icono">
            <img src={mando} alt='Mando' />
          </a>
        </div>
        <div className={s.navInput}>
          <input type='text' placeholder={focus} onFocus={onFocus} onBlur={onBlur} value={text} onKeyDown={(e) => { if (e.key === 'Enter') { props.onSearch(text) } }} onChange={handleChange} />
          {focus ? <img src={busqueda} alt="Ícono de búsqueda" className={s.searchIcon} /> : null}
        </div>
        <div className={s.menu}>
          <div className={s.navbarNav}>

            <button className={s.navItem} onClick={handleFilter}>
              <span>Filter</span>
            </button>
            <button className={s.navItem} onClick={handleOrder}>
              <span>Order</span>
            </button>
            <Link className={s.navItem} to='/form' target='_blank' rel="noopener noreferrer">
              <span>Create</span>
            </Link>
          </div>
        </div>
      </div>
      {filterIsVisible ? <div className={s.filter}>
        <select onChange={handleGenreChange} value={props.genre}>
          <option value="">Genre</option>
          <option value="Action">Action</option>
          <option value="Indie">Indie</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Strategy</option>
          <option value="Adventure">Adventure</option>
          <option value="Shooter">Shooter</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulation</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Massively Multiplayer">Massively Multiplayer</option>
          <option value="Platformer">Platformer</option>
          <option value="Arcade">Arcade</option>
          <option value="Racing">Racing</option>
          <option value="Sports">Sports</option>
          <option value="Fighting">Fighting</option>
          <option value="Board Games">Board Games</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
          <option value="Family">Family</option>
        </select>
        <select onChange={handleOriginChange} value={props.origin}>
          <option value="">Origin</option>
          <option value="API">API</option>
          <option value="DB">Database</option>
        </select>
      </div> : null}
      {orderIsVisible ? <div className={s.order}>
        <div className={s.orderSection}>
          <label>Nombre:</label>
          <div className={s.orderSelector}>
            <button className={s.upOrderSelector} onClick={() => props.sort("ALP", "ASC")}></button>
            <button className={s.downOrderSelector} onClick={() => props.sort("ALP", "DES")}></button>
          </div>
        </div>
        <div className={s.orderSection}>
          <label>Rating:</label>
          <div className={s.orderSelector}>
            <button className={s.upOrderSelector} onClick={() => props.sort("RAT", "ASC")}></button>
            <button className={s.downOrderSelector} onClick={() => props.sort("RAT", "DES")}></button>
          </div>
        </div>
      </div> : null}
    </nav>
  )
}