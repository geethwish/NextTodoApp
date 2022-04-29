import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { connect, useDispatch, useSelector } from 'react-redux';
import { getUserInfo, logout } from '../../../redux/actions/user';

// icons
import MoreIcon from '@mui/icons-material/MoreVert';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

// styles
import styles from './Navbar.module.scss'

const Navbar = () => {
    const router = useRouter();
    const user = useSelector(userInfo => userInfo.user.authenticated);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [isAuth, setIsAuth] = useState(user ? true : false);

    const path = router.pathname;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    const handleProfileMenuOpen = (event) => {

        dispatch(logout());

        router.push('/auth');


    };

    const handleMobileMenuClose = () => {

        setMobileMoreAnchorEl(null);

    };

    const handleMenuClose = () => {

        setAnchorEl(null);

        handleMobileMenuClose();

    };

    const handleMobileMenuOpen = (event) => {

        setMobileMoreAnchorEl(event.currentTarget);

    };

    useEffect(() => {

        dispatch(getUserInfo());

    }, [])

    useEffect(() => {

        setIsAuth(user ? true : false)

    }, [user])



    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>

                <Link href="/" passHref>
                    <>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            sx={{ flexDirection: 'column' }}
                            className={path === '/' ? styles.activeRouteMobile : styles.inactiveRoute}
                        >

                            <AssignmentTurnedInIcon size={12} />

                        </IconButton>

                        <p className={styles.activeRouteMobile}>Tasks</p>

                    </>

                </Link>

            </MenuItem>

            <MenuItem>

                {
                    isAuth && <>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            sx={{ flexDirection: 'column' }}
                            className={path === '/auth' ? styles.activeRouteMobile : styles.inactiveRoute}
                        >

                            <LogoutIcon />

                        </IconButton>

                        <p> Sign Out</p>

                    </>
                }

                {
                    !isAuth && <Link href="/login" passHref>

                        <>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                sx={{ flexDirection: 'column' }}
                                className={path === '/' ? styles.activeRouteMobile : styles.inactiveRoute}
                            >

                                <PersonIcon size={12} />

                            </IconButton>

                            <p>Login </p>

                        </>

                    </Link>
                }

            </MenuItem>

        </Menu >
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>

                <AppBar position="static">

                    <Container >

                        <Toolbar>

                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ flexGrow: 1 }}
                                className={styles.logoText}
                            >
                                TodoZ
                            </Typography>

                            <Typography
                                variant="suntitle2"
                                component="div"
                                className={styles.logoText}
                            >
                                Hi {user && user.name}
                            </Typography>

                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                                <Link href="/" passHref>

                                    <MenuItem
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        className={styles.activeRoute}
                                        sx={{ flexDirection: 'column', ml: 2 }}
                                    >

                                        <AssignmentTurnedInIcon size={12} />

                                        <Typography variant="body1" sx={{ fontSize: '12px' }}>
                                            Tasks
                                        </Typography>

                                    </MenuItem>

                                </Link>


                                {
                                    isAuth && <>

                                        <MenuItem
                                            onClick={handleProfileMenuOpen}
                                            color="inherit"
                                            sx={{ flexDirection: 'column' }}
                                            className={styles.inactiveRoute}
                                        >

                                            <LogoutIcon />

                                            <Typography variant="body1" sx={{ fontSize: '12px' }}>
                                                Sign Out
                                            </Typography>

                                        </MenuItem>

                                    </>
                                }

                                {
                                    !isAuth && <Link href="/auth" passHref>

                                        <MenuItem

                                            sx={{ flexDirection: 'column', alignItems: 'center', display: 'flex' }}
                                            className={styles.inactiveRoute}
                                        >

                                            <PersonIcon size={12} />

                                            <Typography variant="body1" sx={{ fontSize: '12px' }}>
                                                Login
                                            </Typography>

                                        </MenuItem>

                                    </Link>
                                }

                            </Box>

                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>

                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />

                                </IconButton>

                            </Box>

                        </Toolbar>

                    </Container>

                </AppBar>

                {renderMobileMenu}

            </Box>

        </>

    )
}

const mapStateToProps = state => ({
    userInfo: state.user
})

const mapDispatchToProps = {
    getUserInfo: getUserInfo,
    logout: logout
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)