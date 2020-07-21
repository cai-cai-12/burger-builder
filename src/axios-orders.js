import axios from 'axios';

const instance = axios.create({
    // This is your URL where you want to send our request to store data in the DB.
    baseURL: 'https://react-my-burger-fa20a.firebaseio.com/'
});

export default instance;