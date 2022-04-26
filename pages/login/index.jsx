import { Container, Typography } from '@mui/material';

// components
import LoginForm from '../../src/components/LoginForm';

//styles
import styles from './login.module.scss';

const login = () => {
    return (
        <>
            <Container>

                <div className={styles.loginFormContainer}>

                    <div className={styles.titleWrapper}>

                        <Typography
                            variant="h3"
                            gutterBottom
                            component="div"
                            className={styles.title}
                        >
                            Todoz
                        </Typography>

                    </div>

                    <div className={styles.loginFormWrapper}>

                        <LoginForm />

                    </div>

                </div>

            </Container>

        </>
    )
}

export default login