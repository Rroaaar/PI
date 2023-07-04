import s from './Card.module.css'
import playstationImg from '../../images/playstation.png'
import Xbox from '../../images/xbox.png'
import Windows from '../../images/windows.png'
import Mac from '../../images/mac.png'
import Nintendo from '../../images/switch.png'
import { Link } from 'react-router-dom'


export default function Card(props) {

    let { id, name, platforms, releaseDate, rating, genres, background_image } = props.character;

    let i = 0;

    if(releaseDate) releaseDate = releaseDate.replaceAll("-","/");

    let numGenres = genres.length

    return (<Link to={`/detail/${id}`} className={s.link} target='_blank' rel="noopener noreferrer"><div className={s.cardContainer}>
        <div className={s.imgContainer}>
            <img src={background_image} />
        </div>
        <div className={s.info}>
            <div className={s.name}>
                <h2>{name}</h2>
            </div>
            <div className={s.rating}>
                <h3>{rating}</h3>
            </div>
            <div className={s.genres}>
                {genres.map((genre) => {
                    i++
                    if(i==numGenres){
                        return <span className={s.genre}>{genre}. </span>
                    }
                return <span className={s.genre}>{genre}, </span>
                })}
            </div>
            <div className={s.footer}>
                <div className={s.platforms}>
                {platforms.includes("PlayStation") ? <div className={s.platformIcon}><img src={playstationImg} /></div> : null}
                {platforms.includes("Xbox") ? <div className={s.platformIcon}><img src={Xbox} /></div> : null}
                {platforms.includes("PC") ? <div className={s.platformIcon}><img src={Windows} /></div> : null}
                {platforms.includes("macOS") ? <div className={s.platformIcon}><img src={Mac} /></div> : null}
                {platforms.includes("Nintendo Switch") ? <div className={s.platformIcon}><img src={Nintendo} /></div> : null}
                </div>
                <div className={s.releaseDate}><span>{releaseDate}</span></div>
            </div>
        </div>
    </div></Link>)
}