const initialState = {
    userName: '',
    weatherData:{},
    weatherHistory:{}
  };
  const rootReducer = (state = initialState, action) => {
      console.log('rootReducer'+state.userName);
      switch (action.type) {
        case "USER_NAME":
            return { ...state, userName: state.userName + action.payload };
        case "WEATHER_MAIN":
            return { ...state, weatherData: action.payload };
        case "WEATHER_HISTORY":
            return { ...state, weatherHistory: action.payload};
        case "SIGN_OUT":
            return initialState;;
      }
      return state;
  };

  export default rootReducer;