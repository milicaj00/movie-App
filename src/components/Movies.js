import { useState, useEffect, useContext } from "react";
import { SelectedContext } from "../context/SelectedContext";
import Slider from "./Slider";

// let matrix=[];

const Movies = () => {
    const genre = require("../genres.json").genres;
    const [matrix, setMatrix] = useState(genre);
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
                                : selected.i + 1
                    }));
                }
                break;
            case "ArrowUp":
                {
                    setSelected(selected => ({
                        ...selected,
                        i: selected.i != 0 ? selected.i - 1 : selected.i
                    }));
                }
                break;
            case "ArrowRight":
                {
                    setSelected(selected => ({
                        ...selected,
                        j: selected.j + 1 == matrix[selected.i].length ? selected.j : selected.j + 1
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
            {matrix.map((g, i) => (
                <div key={g.id}>
                    {/* {console.log(selected)} */}

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
