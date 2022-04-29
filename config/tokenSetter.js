import axios from 'axios';

export default function tokenSetter(params) {

    // save user data on local storage
    const user = JSON.parse(localStorage.getItem('user'));

    console.log(user);
    //set authentication key
    return axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

};
