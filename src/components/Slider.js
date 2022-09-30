import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Modal from "./Modal";

const IMAGE = "https://image.tmdb.org/t/p/w500";

const Slider = props => {
    const [movies, setMovies] = useState([]);
    const [showInfo, setShow] = useState(false);
    const [allMovies, setAllMovies] = useState([]);
    const [broj, setBroj] = useState(6);

    useEffect(() => {
        setBroj(parseInt(window.innerWidth / 220))
       
        const getMovies = async () => {
            await axios
                .get(
                    `https://api.themoviedb.org/3/discover/movie?with_genres=${props.genre.id}&page=1&api_key=d38aa8716411ef7d8e9054b34a6678ac`
                )
                .then(p => {
                    setAllMovies(p.data.results);
                    setMovies(p.data.results.slice(0, broj));

                    p.data.results.forEach((element, index) => {
                        props.niz[index] = element.id;
                    });
                });
            
        };

        getMovies();

        document.addEventListener("keydown", onKey);

        window.addEventListener('resize', handleWindowResize);

    }, []);

    function handleWindowResize() {
       setBroj(parseInt(window.innerWidth / 220))
    }
   
    useEffect(()=>{
 
        if(props.j < broj)
        {
            setMovies(allMovies.slice(0, broj));
        }  
        else {
            setMovies(allMovies.slice(props.j - broj + 1, props.j + 1))
        }

    },[broj]);

    useEffect(()=>{
 
        if(props.select && props.j >= broj && props.j < allMovies.length)
        {
            setMovies(allMovies.slice(props.j - broj + 1, props.j + 1))

        }else if (props.select && props.j <= broj){
           if(props.j == 0)
           {
                setMovies(allMovies.slice(0, broj));
           }  
        }

    },[props.j]);

    const onKey = event => {
        if (event.key === "Escape") {
            setShow(false);
        } else if (event.key === "Enter") {
            setShow(true);
        } 
    };


    return (
        <div className="mainSlider">
            <h3 className="genreName">{props.genre.name}</h3>
            <div className="slider">
                <div className="slide">
                    {movies.map((m, i) => (
                        <div className="movie" key={m.id}>
                            <div className={
                                    props.select && props.selected == m.id
                                        ? "selected" : "" }
                            >
                                <img
                                    className="movieImage"
                                    src={IMAGE + m.poster_path}
                                    alt={m.title}
                                />
                            </div>
                            {props.select && props.selected == m.id && (
                                <div>
                                    <span>{m.title}</span>
                                    {showInfo && (
                                        <Modal>
                                            {console.log(m)}
                                            <div>Title: {m.title}</div>
                                            <div>Tagline: {m.tagline}</div>
                                            <div>Overview: {m.overview}</div>
                                            <div>Vote: {m.vote_average}</div>
                                        </Modal>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Slider;
