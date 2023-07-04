import Card from "../Card/Card";
import s from './Cards.module.css'
export default function Cards(props){
    return <div className={s.cardsContainer}>
        {props.characters?props.characters.map(elemento => (<Card character={elemento}/>)):null}
    </div>
}