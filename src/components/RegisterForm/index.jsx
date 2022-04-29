import { useEffect, useRef, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { useRouter } from 'next/router'

import { register, setInfo } from '../../../redux/actions/user';

import styles from './RegisterForm.module.scss'

const RegisterForm = (props) => {

    const dispatch = useDispatch();
    const form = useRef();
    const router = useRouter();

    const userInfo = useSelector(userInfo => userInfo.user);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = () => {

        dispatch(register(formData))
    }

    const onHandleChange = (e) => {

        const id = e.target.id;
        const value = e.target.value;

        setFormData({ ...formData, [id]: value });

    }

    const resetForm = () => {

        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {

            console.log(value, formData.password);
            if (value !== formData.password) {
                return false;
            }
            return true;
        });

    })

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

    }, [userInfo, dispatch])



    return (
        <>
            <ValidatorForm
                ref={form}
                onSubmit={handleSubmit}
            >
                <Grid container spacing={2}>

                    <Grid item xs={12}>

                        <TextValidator
                            label="Full Name"
                            placeholder="john smith"
                            id="name"
                            onChange={onHandleChange}
                            name="name"
                            value={formData.name}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            fullWidth
                            variant="outlined"
                        />

                    </Grid>

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

                    <Grid item xs={12}>

                        <TextValidator
                            label="Confirm Password"
                            onChange={onHandleChange}
                            id={"confirmPassword"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            validators={['required', 'isPasswordMatch']}
                            errorMessages={['this field is required', 'Password does not match']}
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
                            Register  {userInfo && userInfo.isLoading &&
                                <CircularProgress color="light0" sx={{ ml: 1 }} size={17} />}
                        </Button>

                    </Grid>

                </Grid>

            </ValidatorForm>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={userInfo && userInfo.user && userInfo.isSuccess}
                message="User Registration Succeed"
            />
        </>
    )
}

const mapStateToProps = state => ({
    userInfo: state.users
})

const mapDispatchToProps = {
    register: register
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
