const SelectedReducer = (state, action) => {
    switch (action.key) {
        case "ArrowDown":
            {
                return {
                    i: state.i+1,
                    j: state.j
                }
            }
           
        case "ArrowUp":
            return {
                i: state.i-1 != 0 ? state.i-1 : state.i,
                j: state.j
            }
           
        case "ArrowRight":
            {
                return {
                    i: state.i,
                    j: state.j+1
                }
            }
           
        case "ArrowLeft":
            {
                return {
                    i: state.i+1,
                    j: state.j-1 != 0 ? state.j-1 : state.j
                }
            }
          
        default:
            return state;
    }
};

export default SelectedReducer;
