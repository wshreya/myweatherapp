const getUserName = (userName) => 
    {
         return dispatch => {
             console.log('getUserName');
             dispatch ({type: "USER_NAME", payload: userName}) 
            }
    };

const storeWeatherData = (weatherData) => 
{
        return dispatch => {
            console.log('storeWeatherData');
            dispatch ({type: "WEATHER_MAIN", payload: weatherData}) 
        }
};

const storeWeatherHistory = (weatherHistory) =>
{
        return dispatch => {
            dispatch({type:"WEATHER_HISTORY",payload: weatherHistory})
        }
};

const signOut = () =>
{
        return dispatch => {
            dispatch({type:"SIGN_OUT"})
        }
};

module.exports = {getUserName,storeWeatherData,storeWeatherHistory,signOut}