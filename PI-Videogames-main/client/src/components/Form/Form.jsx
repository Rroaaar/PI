import { useEffect, useState } from 'react';
import s from './Form.module.css';
import Errors from './Errors';
import axios from 'axios';

const apiHost = process.env.REACT_APP_API_HOST;

export default function Form() {
    const [created, setCreated] = useState(false)

    const [allowSubmit, setAllow] = useState(false)

    const [gameData, setGameData] = useState({
        name: '',
        platforms: '',
        releaseDate: '',
        description: '',
        rating: 0,
        genres: [],
        background_image: ''
    });

    const [errors, setErrors] = useState({
        name: '*',
        platforms: '*',
        releaseDate: '*',
        description: '*',
        rating: '*',
        genres: '*',
        background_image: '*'
    });

    function areAllValuesEmpty(obj) {
        return Object.values(obj).every(value => typeof value === 'string' && value.trim() === '');
    }

    function onSubmit(e) {
        e.preventDefault();
        const form = new FormData();
        form.append('name', gameData.name);
        form.append('platforms', gameData.platforms);
        form.append('releaseDate', gameData.releaseDate);
        form.append('description', gameData.description);
        form.append('rating', gameData.rating);

        gameData.genres.forEach((genre, index) => {
            form.append(`genres[${index}][name]`, genre.name);
            form.append(`genres[${index}][id]`, genre.id);
        });

        form.append('background_image', gameData.background_image);

        axios
            .post(`http://${apiHost}/videogames`, form)
            .then(response => {
                // Hacer algo con la respuesta si es necesario
                console.log(response)
            })
            .catch(error => {
                // Manejar el error si es necesario
                console.error(error);
            });
            setCreated(true)
    }

    function handleInputChange(e) {
        let { name, value } = e.target;
        if (name === 'rating') {
            value = Math.round(value * 100) / 100;
        }
        if (name === "releaseDate") {
            value = value.split("-").reverse().toString().replaceAll(",", "-")
        }
        setGameData({
            ...gameData,
            [name]: value
        });
        setErrors({
            ...Errors({
                ...gameData,
                [name]: value
            }), background_image: errors.background_image
        });
    }

    function handleSelectChange(event) {
        const name = event.target.name;
        if (name === 'platforms') {
            const selected = [...event.target.selectedOptions].map(({ value }) => value).join(', ');
            setGameData({ ...gameData, [name]: selected });
            setErrors(Errors({ ...gameData, [name]: selected }));
        } else {
            const selected = [...event.target.selectedOptions].map(({ value }) => {
                return { name: value };
            });
            setGameData({ ...gameData, [name]: selected });
            setErrors(Errors({ ...gameData, [name]: selected }));
        }
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file && file.type.includes('image')) {
            setGameData({ ...gameData, background_image: file });
            setErrors({ ...errors, background_image: '' });
        } else {
            setErrors({ ...errors, background_image: 'Please select an image file' });
        }
    }
    useEffect(() => {
        setAllow(areAllValuesEmpty(errors))
    }, [gameData, errors])

    return (
        <div className={s.container}>
            {created?<h1>Game Created!</h1>:<form onSubmit={onSubmit}>
                <h2>Create a new game</h2>
                <label>Name:</label>
                <input type='text' name='name' onChange={handleInputChange} autoComplete='off' />
                {errors.name ? <p>{errors.name}</p> : null}
                <label>Description:</label>
                <textarea name='description' onChange={handleInputChange} style={{ resize: 'none' }} autoComplete='off' />
                {errors.description ? <p>{errors.description}</p> : null}
                <label>Platforms:</label>
                <select multiple name='platforms' onChange={handleSelectChange}>
                    <option value="PC">PC</option>
                    <option value="PlayStation 5">PlayStation 5</option>
                    <option value="PlayStation 4">PlayStation 4</option>
                    <option value="Xbox One">Xbox One</option>
                    <option value="Xbox Series S/X">Xbox Series S/X</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                    <option value="iOS">iOS</option>
                    <option value="Android">Android</option>
                    <option value="Nintendo 3DS">Nintendo 3DS</option>
                    <option value="Nintendo DS">Nintendo DS</option>
                    <option value="Nintendo DSi">Nintendo DSi</option>
                    <option value="macOS">macOS</option>
                    <option value="Linux">Linux</option>
                    <option value="Xbox 360">Xbox 360</option>
                    <option value="Xbox">Xbox</option>
                    <option value="PlayStation 3">PlayStation 3</option>
                    <option value="PlayStation 2">PlayStation 2</option>
                    <option value="PlayStation">PlayStation</option>
                    <option value="PS Vita">PS Vita</option>
                    <option value="PSP">PSP</option>
                    <option value="Wii U">Wii U</option>
                    <option value="Wii">Wii</option>
                    <option value="GameCube">GameCube</option>
                    <option value="Nintendo 64">Nintendo 64</option>
                    <option value="Game Boy Advance">Game Boy Advance</option>
                    <option value="Game Boy Color">Game Boy Color</option>
                    <option value="Game Boy">Game Boy</option>
                    <option value="SNES">SNES</option>
                    <option value="NES">NES</option>
                    <option value="Classic Macintosh">Classic Macintosh</option>
                    <option value="Apple II">Apple II</option>
                    <option value="Commodore / Amiga">Commodore / Amiga</option>
                    <option value="Atari 7800">Atari 7800</option>
                    <option value="Atari 5200">Atari 5200</option>
                    <option value="Atari 2600">Atari 2600</option>
                    <option value="Atari Flashback">Atari Flashback</option>
                    <option value="Atari 8-bit">Atari 8-bit</option>
                    <option value="Atari ST">Atari ST</option>
                    <option value="Atari Lynx">Atari Lynx</option>
                    <option value="Atari XEGS">Atari XEGS</option>
                    <option value="Genesis">Genesis</option>
                    <option value="SEGA Saturn">SEGA Saturn</option>
                    <option value="SEGA CD">SEGA CD</option>
                    <option value="SEGA 32X">SEGA 32X</option>
                    <option value="SEGA Master System">SEGA Master System</option>
                    <option value="Dreamcast">Dreamcast</option>
                    <option value="3DO">3DO</option>
                    <option value="Jaguar">Jaguar</option>
                    <option value="Game Gear">Game Gear</option>
                    <option value="Neo Geo">Neo Geo</option>
                    <option value="Web">Web</option>
                </select>
                {errors.platforms ? <p>{errors.platforms}</p> : null}
                <label>Release Date:</label>
                <input type='date' onChange={handleInputChange} name='releaseDate' />
                {errors.releaseDate ? <p>{errors.releaseDate}</p> : null}
                <label>Rating:</label>
                <input type='number' step='0.01' onChange={handleInputChange} name='rating' />
                {errors.rating ? <p>{errors.rating}</p> : null}
                <label>Genres</label>
                <select multiple name='genres' onChange={handleSelectChange}>
                    <option value="Action">Action</option>
                    <option value="Indie">Indie</option>
                    <option value="Adventure">Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Casual">Casual</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Racing">Racing</option>
                    <option value="Sports">Sports</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Family">Family</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Educational">Educational</option>
                    <option value="Card">Card</option>
                </select>
                {errors.genres ? <p>{errors.genres}</p> : null}
                <label>Image:</label>
                <input type='file' onChange={handleImageChange} />
                {errors.background_image ? <p>{errors.background_image}</p> : null}
                <button type='submit' disabled={!allowSubmit}>Create</button>
            </form>}
        </div>);
}
