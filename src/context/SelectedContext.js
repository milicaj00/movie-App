import { createContext, useEffect, useReducer } from "react";
import SelectedReducer from "./SelectedReducer";

const defaultValue = {
    i: 0,
    j: 0
};

const SelectedContext = createContext(defaultValue);

const SelectedContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SelectedReducer, defaultValue);

    return (
        <SelectedContext.Provider
            value={{
                i: state.i,
                j:state.j,
                dispatch
            }}
        >
            {children}
        </SelectedContext.Provider>
    );
};

export { SelectedContextProvider, SelectedContext };
