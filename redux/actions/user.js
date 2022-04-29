import axios from 'axios';
import * as type from '../types';

const url = process.env.API_URL || "http://localhost:8000/api/";

export const setInfo = (data) => ({
    type: type.SET_USER,
    payload: data

});

export const getUserInfo = () => (async dispatch => {

    const user = JSON.parse(localStorage.getItem('user'));
    console.log('sdsd', user);

    dispatch({
        type: type.GET_USER,
        payload: user
    })

})


export const register = (data) => async dispatch => {


    const path = `${url}auth/register`;

    const initialData = {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: '',
        user: {}

    }


    // set loading
    initialData.isLoading = true;

    dispatch(setInfo({ ...initialData }))

    // save user details
    axios.post(path, { ...data })
        .then(function(response) {

            const user = response.data
            initialData.isError = false;
            initialData.isLoading = false;
            initialData.isSuccess = true;
            initialData.message = '';
            initialData.user = user;

            // save user data on local storage
            localStorage.setItem('user', JSON.stringify(user));

            //set authentication key
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

            dispatch(setInfo({ ...initialData }))

        })
        .catch(function(error) {

            initialData.isError = true;
            initialData.message = error.response.data.message

            dispatch(setInfo({ ...initialData }))

        });

}