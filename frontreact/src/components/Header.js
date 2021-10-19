import React from 'react'
import { Link, useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CameraIcon from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import thairunImage from '../imagesv3/logothairunheaderleft.png'
//import HomeIcon from '@material-ui/icons/Home';
import wheretorun from '../images/wheretorun_1.png'
import HomeIcon from '../images/icons/homeIcon.png'
import UserIcon from '../images/icons/userIcon.png'
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faCopyright } from '@fortawesome/fontawesome-free-regular'
import FacebookImage from '../imagesv3/facebook.png'
import IGImage from '../imagesv3/instagram-sketched.png'

import AdvanceSearchModal from './AdvanceSearchModal'


import Hidden from '@material-ui/core/Hidden';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Drawer from '@material-ui/core/Drawer';
//import App from '../App';


import '../css/Header.css'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    icon: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            height: '50px',
        },
        [theme.breakpoints.up('sm')]: {
            height: '77px',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    sideList: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        height: '100%',
        color: '#FFFFFF'
    },
    fullList: {
        width: '100%',
        backgroundColor: '#1F1F1F',
        color: '#FFFFFF'
    },
    appBar: {
        [theme.breakpoints.up('xs')]: {
            backgroundColor: 'rgba(201, 76, 76, 0)',
        },
        [theme.breakpoints.up('sm')]: {
            // backgroundColor: 'rgba(201, 76, 76, 0)',
        },
        [theme.breakpoints.up('md')]: {
            // width: `calc(100% - 240px)`,
            // marginLeft: '240px',
        },
    },
    drawerPaper: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        [theme.breakpoints.up('sm')]: {
            width: '300px',
        },
    },
}));






const Header = () => {

    const history = useHistory()
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const homeClick = () => {
        setOpen(false)
        history.push('/')

    }

    const sideList = (
        <div
            className={classes.sideList}
            role="presentation"
        >
            <div style={{ width: '100%', display: 'flex' }}>
                <IconButton onClick={homeClick}>
                    <FontAwesomeIcon icon={faHome} color="#000000" style={{ fontSize: '25px' }} />
                </IconButton>
                <div style={{ flexGrow: 1 }}></div>
                <IconButton onClick={handleDrawerToggle}>
                    <CloseIcon style={{ color: "#000000" }} />
                </IconButton>


            </div>
            <p style={{ marginTop: '10px' }}></p>
            <List style={{ padding: '10px', minHeight: 'calc(100vh - 157px)' }}>
                <Link to="/eventSearch?road=1" style={{ textDecoration: "none", color: "black" }} onClick={e => setOpen(false)}>
                    <ListItem button key={1}>
                        <ListItemText primary="Road" />
                    </ListItem>
                </Link>
                <Divider style={{ backgroundColor: "rgba(10, 10, 10, 0.1)" }} />
                <Link to="/eventSearch?trail=1" style={{ textDecoration: "none", color: "black" }} onClick={e => setOpen(false)}>
                    <ListItem button key={2}>
                        <ListItemText primary="Trail" />
                    </ListItem>
                </Link>
                <Divider style={{ backgroundColor: "rgba(10, 10, 10, 0.1)" }} />
                <Link to="/eventSearch?vr=1" style={{ textDecoration: "none", color: "black" }} onClick={e => setOpen(false)}>
                    <ListItem button key={3}>
                        <ListItemText primary="VR" />
                    </ListItem>
                </Link>
                <Divider style={{ backgroundColor: "rgba(10, 10, 10, 0.1)" }} />
                <Link to="/?comingEvent=1" style={{ textDecoration: "none", color: "black" }} onClick={e => setOpen(false)}>
                    <ListItem button key={4}>
                        <ListItemText primary="งานวิ่งที่กำลังมาถึง" />
                    </ListItem>
                    <Divider style={{ backgroundColor: "rgba(10, 10, 10, 0.1)" }} />
                </Link>
            </List>
            <div>
                <Grid container style={{ color: '#000000', fontFamily: 'rsuTextFont' }} >
                    <Grid item xs={12} style={{ textAlign: 'right', paddingRight: '10px' }}>
                        <a href="https://www.facebook.com/thaidotrun/" target="_blank"><img src={FacebookImage} height="20px" style={{ marginRight: '10px' }} /></a> <a href="https://www.instagram.com/thai.run/?hl=th" target="_blank"><img src={IGImage} height="20px" /></a>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        Powered by Thai.run
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <FontAwesomeIcon icon={faCopyright} style={{ marginRight: '10px' }} />
                        2020 Terms & Conditions, Privacy Policy
                    </Grid>
                </Grid>

            </div>
        </div>
    );

    return (
        <React.Fragment>
            {/* <div className={classes.root} style={{ backgroundColor: '#FFFFFF' }}> */}
            {/* <Hidden smDown>
                <Drawer
                    variant="permanent"
                    open
                    style={{ backgroundColor: "#1F1F1F" }}
                >
                    {sideList('left')}
                </Drawer>
            </Hidden> */}
            {/* <Container> */}
            <Container maxWidth="md" style={{ backgroundColor: '#1F81C5' }}>
                <AppBar className={classes.appBar} position="relative">

                    <Toolbar style={{ height: '65px' }}>

                        {/* <IconButton onClick={e => setOpen(true)} style={{ paddingLeft: '0px' }}>
                            <MenuIcon style={{ color: "#FFFFFF" }} />
                        </IconButton> */}
                        <Link to="/"><img src={thairunImage} height="30px" style={{ marginLeft: '-20px' }} /></Link>
                        <div style={{ flexGrow: 1 }}></div>
                        {/* <Link to="/"><img src={thairunImage} style={{ marginTop: '23px', height: '55px', marginRight: '0px' }} className={classes.icon} /></Link>
                        <div style={{ flexGrow: 1 }}></div> */}
                        <IconButton onClick={e => setOpen(true)} style={{ marginRight: '-30px' }}>
                            <MenuIcon style={{ color: "#FFFFFF" }} />
                        </IconButton>



                    </Toolbar>
                </AppBar>
            </Container>


            <Hidden smUp implementation="css">
                <Drawer
                    variant="persistent"
                    anchor={'right'}
                    open={open}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {sideList}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    anchor={'right'}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="temporary"
                    open={open}
                    onClose={handleDrawerToggle}
                >
                    {sideList}
                </Drawer>
            </Hidden>

        </React.Fragment>
    )
}
export default Header;