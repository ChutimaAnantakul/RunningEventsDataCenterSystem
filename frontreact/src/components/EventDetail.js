import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';
import Rating from '@material-ui/lab/Rating';

import IconButton from '@material-ui/core/IconButton';

import CircularProgress from '@material-ui/core/CircularProgress';

import QueryEventDetail from '../graphql/query/QueryEventDetail'
import LogoThairun from '../imagesv3/logothairun-(blue)-ปรับแล้ว.png'


import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faRunning, faMapMarkerAlt, faLink } from '@fortawesome/free-solid-svg-icons'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';



import CalendarIcon from '../imagesv2/calendar (4).png'
import LocationIcon from '../imagesv2/pin (6).png'
import RaceTypeIcon from '../imagesv2/security-pin (1).png'
import circleBackground from '../imagesv2/circleBackground.png'

import Header from './Header'
import Footer from './Footer'
import CommentSection from './CommentSection'

import '../css/EventDetail.css'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    // test: {
    //     '&$expanded': {
    //         margin: 'auto',
    //     }
    // },
    contentSection: {
        // backgroundColor: '#FFFFFF',
        [theme.breakpoints.up('sm')]: {
            // backgroundImage: `url("${circleBackground}")`,
            // backgroundRepeat: 'no-repeat',
            // backgroundSize: '100%',
        },
    },
    dialogContent: {
        [theme.breakpoints.down('xs')]: {
            padding: '0px'
        },
    },
    coverImage: {
        [theme.breakpoints.down('xs')]: {
            borderRadius: '0px',
            width: 'calc(100% + 32px)',
            marginLeft: '-16px'
        },
        [theme.breakpoints.up('sm')]: {
            borderRadius: '10px',
            marginTop: '30px',
            width: '100%'
        },
    },
    infoBox: {
        marginTop: '30px',
        // marginBottom: '30px',
        [theme.breakpoints.down('xs')]: {
            borderRadius: '0px',
            width: 'calc(100% + 32px)',
            marginLeft: '-16px'
        },
        [theme.breakpoints.up('sm')]: {
            borderRadius: '10px',
            width: '100%'
        },
    },
    infoImage: {
        [theme.breakpoints.down('xs')]: {
            padding: '0px',
        },
        [theme.breakpoints.up('sm')]: {
            padding: '30px',
        },
    },
    infoEventName: {
        [theme.breakpoints.down('xs')]: {
            textAlign: 'left'
        },
        [theme.breakpoints.up('sm')]: {
            textAlign: 'left'
        },

    },
    infoEventProperty: {
        [theme.breakpoints.down('xs')]: {
            // marginLeft: '20%'
        },
        [theme.breakpoints.up('sm')]: {

        },

    },
    ratingText: {
        fontSize: '18px'
    },
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const EventDetail = (props) => {

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const history = useHistory()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let { eventSlug } = useParams()
    const queryEventDetail = useQuery(QueryEventDetail, {
        variables: {
            eventSlug: eventSlug
        }
    })
    console.log(eventSlug)


    if (queryEventDetail.loading) {
        return <Container maxWidth="md" style={{ backgroundColor: '#EEEEEE', paddingBottom: '60px', position: 'relative' }}>
            <Hidden xsDown>
                <br />
                <br />
            </Hidden>
            <CircularProgress style={{ marginTop: '120px', position: 'absolute', marginLeft: '44%' }} />
            <Skeleton variant="rect" height="400px" className={classes.coverImage} style={{ marginTop: '0px' }} animation="wave" />
            <br />
            <Grid container spacing={2}>
                <Grid item xs={12}><Skeleton variant="rect" width="50%" height="20px" animation="wave" /></Grid>
                <Grid item xs={12}><Skeleton variant="rect" width="30%" height="20px" animation="wave" /></Grid>
            </Grid>
            <p style={{ marginTop: '20px' }}></p>
            <Divider />
            <p style={{ marginTop: '20px' }}></p>
            <Grid container spacing={2}>
                <Grid item xs={12}><Skeleton variant="rect" width="70%" height="20px" animation="wave" /></Grid>
                <Grid item xs={12}><Skeleton variant="rect" width="60%" height="20px" animation="wave" /></Grid>
                <Grid item xs={12}><Skeleton variant="rect" width="30%" height="20px" animation="wave" /></Grid>
                <Grid item xs={12}><Skeleton variant="rect" width="30%" height="20px" animation="wave" /></Grid>
                <Grid item xs={12}><Skeleton variant="rect" width="80%" height="20px" animation="wave" /></Grid>
                <Grid item xs={12}><Skeleton variant="rect" width="90%" height="20px" animation="wave" /></Grid>
            </Grid>


        </Container>
    }

    return (
        <Container maxWidth="md" style={{ backgroundColor: '#F6F6F6', paddingBottom: '60px' }}>

            <img width="100%" className={classes.coverImage} src={queryEventDetail.data.events[0].coverPhotoUrl} />

            {/* PC Version=================================== */}
            <div>

                <Typography variant="h5" style={{ fontFamily: 'DBHeaventHevaticaXbd', marginTop: '20px' }}>
                    {queryEventDetail.data.events[0].eventNameTH}
                </Typography>
                <Typography style={{ fontSize: '20px' }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} color="#B1B1B1" style={{ fontSize: '20px', marginRight: '10px' }} />
                    {queryEventDetail.data.events[0].raceType === "vr" ? "วิ่งที่ไหนก็ได้" : <React.Fragment><span style={{ marginRight: '5px' }}>{queryEventDetail.data.events[0].locationTextShowTH}</span><span>{queryEventDetail.data.events[0].provinceTH}</span></React.Fragment>}
                </Typography>

            </div>
            <p style={{ marginTop: '20px' }}></p>
            <Divider />
            <p style={{ marginTop: '20px' }}></p>
            <Typography style={{ fontStyle: 'italic', fontFamily: 'DBHeaventHevaticaXbd', fontSize: '15px', color: '#636363' }}>
                เผยแพร่ &nbsp;
                {moment(queryEventDetail.data.events[0].lastUpdateTime).format('DD MMM YYYY')}
            </Typography>
            <p style={{ marginTop: '20px' }}></p>
            <Divider />
            <p style={{ marginTop: '20px' }}></p>

            <div style={{ backgroundColor: '#FFFFFF', marginBottom: '30px', boxShadow: '0px 1px 2px 1px rgba(214,210,214,1)' }} className={classes.infoBox}>
                <Grid container>
                    <Grid item xs={12} sm={6} className={classes.infoImage}>
                        <img src={queryEventDetail.data.events[0].thumbnailPhotoUrl} style={{ width: '100%' }} />
                    </Grid>
                    <Grid xs={12} sm={6} item style={{ padding: '30px' }}>
                        <Typography variant="h5" component="div" style={{ fontFamily: 'DBHeaventHevaticaXbd' }} className={classes.infoEventName}>
                            {queryEventDetail.data.events[0].eventNameTH}
                        </Typography>
                        <Typography component="div" className={classes.infoEventProperty}>
                            <FontAwesomeIcon icon={faCalendarAlt} color="#1F81C5" style={{ marginRight: '5%' }} />
                            {moment(queryEventDetail.data.events[0].eventDateStart).format('dddd DD MMM YYYY')}
                        </Typography>
                        <Typography component="div" className={classes.infoEventProperty}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} color="#1F81C5" style={{ marginRight: '5%' }} />
                            {queryEventDetail.data.events[0].raceType === "vr" ? "วิ่งที่ไหนก็ได้" : <React.Fragment><span style={{ marginRight: '5px' }}>{queryEventDetail.data.events[0].locationTextShowTH}</span><span>{queryEventDetail.data.events[0].provinceTH}</span></React.Fragment>}                            </Typography>
                        <Typography component="div" className={classes.infoEventProperty}>
                            <FontAwesomeIcon icon={faRunning} color="#1F81C5" style={{ marginRight: '5%' }} />
                            {queryEventDetail.data.events[0].distance.filter(distance => { if (distance.distance === 0) { return false } return true }).map((distance, index) => (<span key={distance.distanceTypeId} style={{ marginRight: '0px' }}>
                                {distance.distance}{index === queryEventDetail.data.events[0].distance.filter(distance => { if (distance.distance === 0) { return false } return true }).length - 1 ? " km" : "/"}
                            </span>
                            )
                            )
                            }
                        </Typography>
                        <CopyToClipboard text={`https://marathon.thai.run/event/${eventSlug}`}>
                            <Typography component="div" style={{ cursor: 'copy' }} className={classes.infoEventProperty}>
                                <FontAwesomeIcon icon={faLink} color="#1F81C5" style={{ marginRight: '4%' }} />
                                {`https://marathon.thai.run/event/${eventSlug}`}
                            </Typography>
                        </CopyToClipboard>

                        {queryEventDetail.data.events[0].linkUrl.includes("https://race.thai.run") ?
                            <Typography component="div" className={classes.infoEventProperty} style={{ fontFamily: 'DBHeaventHevaticaXbd', marginTop: '20px' }}>
                                รับสมัครผ่าน
                                <img src={LogoThairun} style={{ marginTop: '-3px', height: '30px', marginLeft: '10px', position: 'absolute' }} />
                            </Typography>
                            : null
                        }
                        <div className={classes.infoEventName}>
                            <a target="_blank" href={queryEventDetail.data.events[0].linkUrl} >
                                <Button style={{ backgroundColor: "#1F81C5", color: "white", marginTop: '20px', marginBottom: '20px', height: '35px', width: '142px' }} variant="contained"><span style={{ marginTop: '-5px' }}>สมัครงานวิ่ง</span></Button>
                            </a>
                        </div>

                    </Grid>
                </Grid>
            </div>




            <div className={classes.contentSection} >

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="div">
                            <div className="dangerouslyInnerEventDetail" dangerouslySetInnerHTML={{ __html: queryEventDetail.data.events[0].descriptionTH }} />

                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <div>




                <CommentSection slug={queryEventDetail.data.events[0].slug}>
                    <div style={{ backgroundColor: '#FFFFFF', boxShadow: '0px 1px 2px 1px rgba(214,210,214,1)' }} className={classes.infoBox}>
                        <Grid container style={{ marginTop: '10px', padding: '20px' }}>
                            <Grid item xs={12} sm={8} md={6} style={{ textAlign: 'left' }}>
                                <Grid container>
                                    <Grid item xs={12} style={{ marginBottom: '10px' }}>
                                        <Typography component="span" variant="h6" style={{ fontFamily: 'DBHeaventHevaticaXbd' }}>
                                            อันดับคะแนนรวม
                                    </Typography>
                                        <Typography component="div" className={classes.ratingText}>
                                            จากจำนวนผู้รีวิว {queryEventDetail.data.events[0].commentCount ? queryEventDetail.data.events[0].commentCount : 0} คน
                                    </Typography>
                                        <Divider />
                                    </Grid>
                                    <Grid xs={6} item>
                                        <Typography className={classes.ratingText}>
                                            การค้นหาภาพงานวิ่ง
                                        </Typography>
                                    </Grid>
                                    <Grid xs={6} item style={{ textAlign: 'right' }}>
                                        <Rating readOnly precision={0.25} name="rating1" style={{ color: '#CD2626' }} value={queryEventDetail.data.events[0].photoSearchRating} size="small" />
                                    </Grid>
                                    <Grid xs={6} item>
                                        <Typography className={classes.ratingText}>
                                            เส้นทางวิ่ง บรรยากาศ
                            </Typography>
                                    </Grid>
                                    <Grid xs={6} item style={{ textAlign: 'right' }}>
                                        <Rating readOnly precision={0.25} name="rating2" style={{ color: '#FF750A' }} value={queryEventDetail.data.events[0].routeRating} size="small" />
                                    </Grid>
                                    <Grid xs={6} item>
                                        <Typography className={classes.ratingText}>
                                            การบริหารงาน และการบริการของผู้จัดงาน
                            </Typography>
                                    </Grid>
                                    <Grid xs={6} item style={{ textAlign: 'right' }}>
                                        <Rating readOnly precision={0.25} name="rating3" style={{ color: '#FAB041' }} value={queryEventDetail.data.events[0].organizeRating} size="small" />
                                    </Grid>
                                    <Grid xs={6} item>
                                        <Typography className={classes.ratingText}>
                                            ที่พักและสถานที่ท่องเที่ยวใล้งานวิ่ง
                            </Typography>
                                    </Grid>
                                    <Grid xs={6} item style={{ textAlign: 'right' }}>
                                        <Rating readOnly precision={0.25} name="rating4" style={{ color: '#F7CA87' }} value={queryEventDetail.data.events[0].hotelAndTourismRating} size="small" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>

                            </Grid>
                        </Grid>
                    </div>
                </CommentSection>




                {/* <p style={{ marginTop: '30px' }}></p> */}


            </div>
        </Container>
    )
}
{/* <CommentSection eventId={queryEventDetail.data.events[0].eventId} /> */ }


export default EventDetail