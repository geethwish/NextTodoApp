import { Button, CircularProgress, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { connect, useDispatch, useSelector } from 'react-redux';

import { setInfo, userLogin } from '../../../redux/actions/user';

import styles from './LoginForm.module.scss';

const LoginForm = (props) => {

    const dispatch = useDispatch();
    const form = useRef();
    const router = useRouter();

    const userInfo = useSelector(userInfo => userInfo.user);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = () => {

        dispatch(userLogin(formData))
    }

    const onHandleChange = (e) => {

        const id = e.target.id;
        const value = e.target.value;

        setFormData({ ...formData, [id]: value });

    }

    const resetForm = () => {

        setFormData({
            email: '',
            password: '',
        })
    }

    useEffect(() => {

        if (userInfo && userInfo.user && !userInfo.isError) {

            resetForm();

        }

        if (userInfo && userInfo.user && userInfo.isSuccess) {

            setTimeout(() => {

                dispatch(setInfo({ isSuccess: false }));

                router.push('/')

            }, 1000);

        }

    }, [userInfo, dispatch, router])

    return (
        <>
            <ValidatorForm
                ref={form}
                onSubmit={handleSubmit}
            >

                <Grid container spacing={2}>

                    <Grid item xs={12}>

                        <TextValidator
                            label="Email"
                            id="email"
                            onChange={onHandleChange}
                            name="email"
                            value={formData.email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>

                        <TextValidator
                            label="Password"
                            onChange={onHandleChange}
                            id="password"
                            name="password"
                            value={formData.password}
                            validators={['required']}
                            errorMessages={['this field is required',]}
                            fullWidth
                            variant="outlined"
                            type="password"
                        />


                    </Grid>

                    {
                        userInfo.isError && <Grid item xs={12}>

                            <Typography
                                variant="subtitle2"
                                color="error"
                            >
                                {userInfo && userInfo.message}
                            </Typography>

                        </Grid>

                    }

                    <Grid item xs={12}>

                        <Button variant="contained" fullWidth size='large' type='submit'>
                            Sign In  {userInfo && userInfo.isLoading &&
                                <CircularProgress color="light0" sx={{ ml: 1 }} size={17} />}
                        </Button>

                    </Grid>

                </Grid>

            </ValidatorForm>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={userInfo && userInfo.user && userInfo.isSuccess}
                message="Successfully Logged In"
            />

        </>
    )
}

const mapStateToProps = state => ({
    userInfo: state.users
})

const mapDispatchToProps = {
    userLogin: userLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)