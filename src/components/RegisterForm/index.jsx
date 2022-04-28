import { Button, Grid, TextField } from '@mui/material';
import styles from './RegisterForm.module.scss'

const RegisterForm = () => {
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

                    <TextField
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        autoComplete="confirmPassword"
                        fullWidth
                    />

                </Grid>

                <Grid item xs={12}>

                    <Button variant="contained" fullWidth size='large'>
                        Register
                    </Button>

                </Grid>

            </Grid>
        </>
    )
}

export default RegisterForm