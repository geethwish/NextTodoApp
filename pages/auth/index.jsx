import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';




// components
import LoginForm from '../../src/components/LoginForm';
import RegisterForm from '../../src/components/RegisterForm';

//styles
import styles from './login.module.scss';



const Login = () => {
    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Login" value={1} />
                                    <Tab label="Register" value={2} />
                                </TabList>
                            </Box>
                            <TabPanel className={styles.contentContainer} value={1}> <LoginForm /></TabPanel>
                            <TabPanel className={styles.contentContainer} value={2}><RegisterForm /></TabPanel>

                        </TabContext>

                    </div>

                </div>

            </Container>

        </>
    )
}

export default Login