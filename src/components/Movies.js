import { useState, useEffect, useContext } from "react";
import Slider from "./Slider";

// let matrix=[];

const Movies = () => {
    const genre = require("../genres.json").genres;
    const [matrix, setMatrix] = useState(Array.apply(null, Array(genre.length)).map(function (x, i) { return new Array(); }));
    const [selected, setSelected] = useState({ i: 0, j: 0 });

    useEffect(() => {
        document.addEventListener("keydown", onKey, false);
        setSelected({ i: 0, j: 0 });
    }, []);

    const onKey = event => {

        switch (event.key) {
            case "ArrowDown":
                {
                    setSelected(selected => ({
                        ...selected,
                        i:
                            selected.i + 1 == matrix.length
                                ? selected.i
                                : selected.i + 1,
                        j:0
                    }));
                }
                break;
            case "ArrowUp":
                {
                    setSelected(selected => ({
                        ...selected,
                        i: selected.i != 0 ? selected.i - 1 : selected.i,
                        j: 0
                    }));
                }
                break;
            case "ArrowRight":
                {
                    setSelected(selected =>  ({
                        ...selected,
                        j: selected.j + 1 == Object.keys(matrix[selected.i]).length ? selected.j : selected.j + 1
                    }));
                }
                break;
            case "ArrowLeft":
                {
                    setSelected(selected => ({
                        ...selected,
                        j: selected.j != 0 ? selected.j - 1 : selected.j
                    }));
                }
                break;
            default:
                break;
        }

    };

    return (
        <div>
            {genre.map((g, i) => (
                <div key={g.id}>
                    <Slider
                        genre={g}
                        niz={matrix[i]}
                        selected={matrix[selected.i][selected.j]}
                        select={selected.i == i}
                        j={selected.j}
                    />
                </div>
            ))}
        </div>
    );
};
export default Movies;
