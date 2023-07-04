import s from './landingPage.module.css'
import { Link } from 'react-router-dom'

function LandingPage(){
    return (<div className={s.background}>
        <div className={s.content}>
            <div>
            <h1 className={s.h1}>Discover videogames</h1>
            </div>
            <div>
            <h2 className={s.h2}>by RAWG</h2>
            </div>
            <div className={s.formulario}>
                <Link className={s.button} to='/home'>Explore now!</Link>
            </div>
        </div>
    </div>)
}

export default LandingPage