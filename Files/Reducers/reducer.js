

    const INITIAL_STATE = {
      userName : 'Hardik'
    }

    const reducer = (states = INITIAL_STATE,action) => {

    switch (action.type) {

        case "CHANGE_STATE":
            return ({...states,
                   userName: action.payload
                })

        default:
        return states;
    }
  }
  export default reducer;
