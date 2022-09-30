import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Modal from "./Modal";
import { SelectedContext } from "../context/SelectedContext";

const IMAGE = "https://image.tmdb.org/t/p/w500";

const Slider = props => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShow] = useState(false);

    useEffect(() => {
        const getMovies = async () => {
            await axios
                .get(
                    `https://api.themoviedb.org/3/discover/movie?with_genres=${props.genre.id}&page=1&api_key=d38aa8716411ef7d8e9054b34a6678ac`
                )
                .then(p => {
                    setMovies(p.data.results);
                    p.data.results.forEach((element, index) => {
                        props.niz[index] = element.id;
                    });
                });
        };
        setLoading(true);
        getMovies();
        setLoading(false);
        document.addEventListener("keydown", onKey, false);
    }, []);

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
                <div
                    className="slide"
                    style={{
                        transform: props.select ? "translateX(-" + props.j * 4 + "%)" : "translateY(-0%)"
                    }}
                >
                    {movies.map((m, i) => (
                        <div className="movie" key={m.id}>
                            <div
                                className={
                                    props.select && props.selected == m.id
                                        ? "selected"
                                        : ""
                                }
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
