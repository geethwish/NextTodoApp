import { Button, Container, Grid, TextField, Typography } from '@mui/material';

import styles from './LoginForm.module.scss';

const LoginForm = (props) => {
    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={12}>

                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                    />

                </Grid>

                <Grid item xs={12}>

                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        autoComplete="current-password"
                        fullWidth
                    />

                </Grid>

                <Grid item xs={12}>

                    <Button variant="contained" fullWidth size='large'>
                        Sign In
                    </Button>

                </Grid>

            </Grid>
        </>
    )
}

export default LoginForm