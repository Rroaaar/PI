import s from './Detail.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
const apiHost = process.env.REACT_APP_API_HOST;

export default function Detail() {
    const { id } = useParams()
    const [videogame, setVideogame] = useState({})
    const [genres, setGenres] = useState([])
    async function res() {
        try {
          const response = await axios.get(`http://${apiHost}/videogames/${id}`);
          const videogame = response.data;
          setVideogame(videogame);
          const genresResponse = await axios.get(`http://${apiHost}/genres`)
          const genres = genresResponse.data.filter(
            item1 => videogame.genres.some(item2 => item2.id === item1.id)
            )
          setGenres(genres)
          console.log(genres)
        } catch (error) {
          console.log(error.message);
        }
      }

    useEffect(res, [])

    return (<div className={s.container}>
        <div className={s.bannerImage} style={{backgroundImage: `url(${videogame.background_image})`}}/>
        <div className={s.banner}>
        <div className={s.name}><h1>{videogame.name}</h1></div>
        <div className={s.genres}>
            { genres.length? genres.map(genre => (<div className={s.genre}><img src={genre.image_background}/><div className={s.genreName}>{genre.name}</div></div>)) : null}
        </div>
        <div className={s.releaseDate}>Released at: {videogame.releaseDate? videogame.releaseDate.replaceAll('-','/'):null}</div>
        <div className={s.ratingStar}/>
        <div className={s.rating}>{videogame.rating}
        </div>
        <div className={s.platforms}>{videogame.platforms?videogame.platforms.replaceAll(' ','').split(',').map(platform => (<div className={s.platform}>{platform}</div>)):null}</div>
        </div>
        <div className={s.description}>{videogame.description?videogame.description.replace(/<\/?[^>]+>/g,""):null}</div>
    </div>)
}