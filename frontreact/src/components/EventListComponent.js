import React, { useState, useEffect } from 'react';
import { Waypoint } from 'react-waypoint'
import { useLocation } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { Link } from "react-router-dom";
import _ from 'lodash'
import styled from 'styled-components'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import topBackground from '../images/newTopBackGround.jpg'
import calendarIcon from '../imagesv2/calendarInList.png'
import locationIcon from '../images/icons/placeholder-filled-point.png'
import raceTypeIcon from '../imagesv2/raceTypeInList.png'
import whereToRunLogo from '../imagesv2/wheretorun_4.png'
import orangeCircle from '../imagesv2/วงกลมส้ม.png'
import blueCircle from '../imagesv2/วงกลมฟ้า.png'
import circleBackground from '../imagesv2/BG_Where_V1.jpg'

import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack, faRunning } from '@fortawesome/free-solid-svg-icons'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

import Hidden from '@material-ui/core/Hidden';


import QueryAdvanceFilterSearch from '../graphql/query/QueryAdvanceFilterSearch'


const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundImage: `url(${topBackground})`,
        padding: theme.spacing(8, 0, 6),
        //maxWidth: '960px',
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundSize: 'cover',

    },
    topBackground: {
        [theme.breakpoints.up('xs')]: {
            marginBottom: '50px'
        },
        [theme.breakpoints.up('sm')]: {
            marginBottom: '100px'
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: '100px'
        },
    },
    stickyAppBar: {
        [theme.breakpoints.up('xs')]: {
            height: '120px'
        },
        [theme.breakpoints.up('sm')]: {
            height: '80px'
        },
        [theme.breakpoints.up('md')]: {
            height: '80px'
        },
    },
    mainContain: {
        [theme.breakpoints.up('xs')]: {
            // height: '141px'
        },
        [theme.breakpoints.up('sm')]: {
            // height: '80px'
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: '0px',
            paddingRight: '0px'
        },
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    loadMore: {
        //paddingTop: theme.spacing(8),
        //paddingBottom: theme.spacing(8),
        //maxWidth: '1100px'
        [theme.breakpoints.up('xs')]: {
            paddingLeft: '0px',
            paddingRight: '0px'
        },
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '0px',
            paddingRight: '0px'
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: '0px',
            paddingRight: '0px'
        },
    },
    marginGridItem: {
        [theme.breakpoints.up('md')]: {
            marginLeft: '8px',
            marginRight: '8px'
        },
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    lists: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '30px',
            marginBottom: '20px',
            borderRadius: '10px',
            width: '95%'

        },
    },
    cardContent: {
        [theme.breakpoints.down('xs')]: {
            // textAlign: 'center'
        },
        [theme.breakpoints.up('md')]: {
        },
    },
}));

const ListItemStyle = styled(ListItem)`

.eventName{
    letter-spacing: 0.01em;
    font-family: DBHeaventHevaticaXbd;
}

&:hover .eventName{
    text-decoration: underline;

}
`


const EventListComponent = React.forwardRef((props, ref) => {

    const classes = useStyles();
    let location = useLocation()

    const queryEvent = useQuery(QueryAdvanceFilterSearch, {
        variables: {
            whereInput: props.whereCondition
            , sort: {
                eventDateStart: 'asc'
            }
        },
        fetchPolicy: 'network-only'
    });



    // if (props.data.length === 0) {
    //     return (
    //         <Container ref={ref} maxWidth="md" style={{ textAlign: 'center' }}>
    //             <Typography variant="h5">
    //                 ไม่พบ Event
    //             </Typography>
    //         </Container>
    //     )
    // }


    return (
        // <Container maxWidth="md" className={classes.mainContain} style={{ backgroundColor: '#FFFFFF', backgroundImage: `url("${circleBackground}")`, backgroundRepeat: 'repeat-y', backgroundSize: '100%', paddingBottom: '30px' }} >
        <Container ref={ref} maxWidth="md" className={classes.mainContain} style={{ paddingBottom: '0px', paddingLeft: '0px', paddingRight: '0px', marginBottom: '0px' }} >

            {/* <Container maxWidth="md" style={{ padding: '10px' }} > */}


            <Grid container style={{ backgroundColor: "#F6F6F6", paddingBottom: '40px' }}>
                <List className={classes.lists} style={{ backgroundColor: "#FFFFFF" }}>

                    {/* Pinned Event */}

                    {queryEvent.loading ?
                        null
                        :
                        queryEvent.data.events.map((event, i) => (
                            <Link key={`${event.eventId}pin`} to={{ pathname: `/event/${event.slug}`, state: { background: location } }} style={{ textDecoration: 'none', color: "black" }}>

                                {/* PC Version */}
                                <Hidden xsDown>
                                    <ListItemStyle key={`${event.eventId}pin`} className={classes.root} style={{ borderRadius: '0px' }} >

                                        <Grid container className={classes.cardContent}>
                                            <Grid item xs={12} sm={1}>
                                                <Typography component="div" style={{ fontSize: '23px', marginLeft: '18px', color: '#FF0000' }}>{moment(event.eventDateStart).format('MMM')}</Typography>
                                                <Typography component="div" style={{ fontWeight: 'bold', marginLeft: '20px', fontSize: '30px', marginTop: '-18px' }}>{moment(event.eventDateStart).format('DD')}</Typography>

                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <Typography variant="h6" className="eventName" style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    color: '#000000',
                                                    marginTop: '-4px'
                                                }}>
                                                    {event.eventNameTH}
                                                </Typography>
                                                <Typography component="span" style={{ marginTop: '-10px', color: '#B1B1B1' }}>
                                                    <FontAwesomeIcon icon={faRunning} color="#F9A11E" height="20px" /> &nbsp;{event.raceType.toUpperCase()}, &nbsp;
                        {event.distance.filter(distance => { if (distance.distance === 0) { return false } return true }).map((distance, index) => (<span key={distance.distanceTypeId} style={{ marginRight: '0px' }}>
                                                        {distance.distance}{index === event.distance.filter(distance => { if (distance.distance === 0) { return false } return true }).length - 1 ? " km" : "/"}
                                                    </span>
                                                    )
                                                    )
                                                    }
                                                </Typography>
                                                <Typography component="span" style={{ color: '#FFFFFF', backgroundColor: '#1F81C5', borderRadius: '5px', fontSize: '15px', marginLeft: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
                                                    Recommended
                                                </Typography>

                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography component="div" style={{
                                                    color: '#F9A11E', marginTop: '4px', whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}><img src={locationIcon} height="15px" style={{ marginRight: '5px' }} />
                                                    {event.raceType === 'vr' ? "วิ่งที่ไหนก็ได้" : event.locationTextShowTH}
                                                </Typography>
                                                <Typography component="div" style={{ color: '#B1B1B1', marginLeft: '20px', marginTop: '-12px' }}>
                                                    {event.provinceTH}
                                                </Typography>

                                            </Grid>
                                        </Grid>
                                    </ListItemStyle>
                                </Hidden>

                                {/* MoBile Version */}
                                <Hidden smUp>
                                    <ListItemStyle className={classes.root} style={{ borderRadius: '0px' }} >

                                        <Grid container className={classes.cardContent}>
                                            <Grid item xs={12} sm={7} style={{ textAlign: 'left' }}>
                                                <Typography variant="h6" className="eventName" style={{
                                                    marginLeft: '5px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    color: '#000000',
                                                    marginTop: '-4px'
                                                }}>
                                                    {event.eventNameTH}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} style={{ marginTop: '-12px' }}>
                                                <Grid container style={{}}>
                                                    <Grid item style={{}}>
                                                        <Typography component="div" style={{ color: '#FF0000', marginLeft: '3px' }}>{moment(event.eventDateStart).format('MMM')}</Typography>
                                                        <div style={{ fontWeight: 'bold', fontSize: '30px', marginTop: '-19px', marginLeft: '4px' }}>{moment(event.eventDateStart).format('DD')}</div>
                                                    </Grid>
                                                    <Grid item style={{ marginTop: '13px', marginLeft: '10px' }}>
                                                        <Typography style={{ color: '#B1B1B1' }}>
                                                            <FontAwesomeIcon icon={faRunning} color="#F9A11E" height="20px" /> &nbsp;{event.raceType.toUpperCase()}, &nbsp;
                                                                {event.distance.filter(distance => { if (distance.distance === 0) { return false } return true }).map((distance, index) => (<span key={distance.distanceTypeId} style={{ marginRight: '0px' }}>
                                                                {distance.distance}{index === event.distance.filter(distance => { if (distance.distance === 0) { return false } return true }).length - 1 ? " km" : "/"}
                                                            </span>
                                                            )
                                                            )
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography component="div" style={{ marginTop: '-5px' }}>
                                                    <img src={locationIcon} height="15px" />
                                                    &nbsp; <Typography component="span" style={{ color: '#F9A11E' }}>{event.raceType === 'vr' ? "วิ่งที่ไหนก็ได้" : event.locationTextShowTH}</Typography>
                                                    &nbsp; <Typography component="span" style={{ color: '#B1B1B1' }}>{event.provinceTH ? `(${event.provinceTH})` : null} </Typography>
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography component="span" style={{ color: '#FFFFFF', backgroundColor: '#1F81C5', borderRadius: '5px', fontSize: '15px', paddingLeft: '10px', paddingRight: '10px' }}>
                                                    Recommended
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItemStyle>
                                    <Divider style={{ backgroundColor: 'rgba(225,225,225,0.9)' }} />

                                </Hidden>
                            </Link>
                        ))
                    }





                    {/* Normal Event */}
                    {props.loading ?

                        props.data.map(event => (
                            <Grid item key={event} xs={12} style={{ marginBottom: '10px' }}>
                                <ListItem alignItems="flex-start" button className={classes.marginGridItem}>

                                    <Skeleton variant="circle" width={40} height={40} />

                                    <ListItemText style={{ marginLeft: '5px' }}>
                                        <Skeleton variant="rect" width="40%" />
                                        <br />
                                        <Skeleton variant="rect" width="100%" />
                                    </ListItemText>
                                </ListItem>
                            </Grid>

                        ))
                        :
                        props.data.map((event, i) => (
                            <Link key={event.eventId} to={{ pathname: `/event/${event.slug}`, state: { background: location } }} style={{ textDecoration: 'none', color: "black" }}>
                                {i === props.data.length - 10 && <Waypoint onEnter={props.handleLoadMore} />}

                                {/* PC Version */}
                                <Hidden xsDown>
                                    <ListItemStyle className={classes.root} style={{ borderRadius: '0px' }} >

                                        <Grid container className={classes.cardContent}>
                                            <Grid item xs={12} sm={1}>
                                                <Typography component="div" style={{ fontSize: '23px', marginLeft: '18px', color: '#FF0000' }}>{moment(event.eventDateStart).format('MMM')}</Typography>
                                                <Typography component="div" style={{ fontWeight: 'bold', marginLeft: '20px', fontSize: '30px', marginTop: '-18px' }}>{moment(event.eventDateStart).format('DD')}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <Typography variant="h6" className="eventName" style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    color: '#000000',
                                                    marginTop: '-4px'
                                                }}>
                                                    {event.eventNameTH}
                                                </Typography>
                                                <Typography style={{ marginTop: '-10px', color: '#B1B1B1' }}>
                                                    <FontAwesomeIcon icon={faRunning} color="#F9A11E" height="20px" /> &nbsp;{event.raceType.toUpperCase()}, &nbsp;
{event.distance.filter(distance => { if (distance.distance === 0) { return false } return true }).map((distance, index) => (<span key={distance.distanceTypeId} style={{ marginRight: '0px' }}>
                                                        {distance.distance}{index === event.distance.filter(distance => { if (distance.distance === 0) { return false } return true }).length - 1 ? " km" : "/"}
                                                    </span>
                                                    )
                                                    )
                                                    }
                                                </Typography>

                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography component="div" style={{
                                                    color: '#F9A11E', marginTop: '4px', whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}><img src={locationIcon} height="15px" style={{ marginRight: '5px' }} />
                                                    {event.raceType === 'vr' ? "วิ่งที่ไหนก็ได้" : event.locationTextShowTH}
                                                </Typography>
                                                <Typography component="div" style={{ color: '#B1B1B1', marginLeft: '20px', marginTop: '-12px' }}>
                                                    {event.provinceTH}
                                                </Typography>

                                            </Grid>
                                        </Grid>
                                    </ListItemStyle>
                                </Hidden>

                                {/* MoBile Version */}
                                <Hidden smUp>
                                    <ListItemStyle className={classes.root} style={{ borderRadius: '0px' }} >

                                        <Grid container className={classes.cardContent}>
                                            <Grid item xs={12} sm={7} style={{ textAlign: 'left' }}>
                                                <Typography variant="h6" className="eventName" style={{
                                                    marginLeft: '5px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    color: '#000000',
                                                    marginTop: '-4px'
                                                }}>
                                                    {event.eventNameTH}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} style={{ marginTop: '-12px' }}>
                                                <Grid container style={{}}>
                                                    <Grid item style={{}}>
                                                        <Typography component="div" style={{ color: '#FF0000', marginLeft: '3px' }}>{moment(event.eventDateStart).format('MMM')}</Typography>
                                                        <div style={{ fontWeight: 'bold', fontSize: '30px', marginTop: '-19px', marginLeft: '4px' }}>{moment(event.eventDateStart).format('DD')}</div>
                                                    </Grid>
                                                    <Grid item style={{ marginTop: '13px', marginLeft: '10px' }}>
                                                        <Typography style={{ color: '#B1B1B1' }}>
                                                            <FontAwesomeIcon icon={faRunning} color="#F9A11E" height="20px" /> &nbsp;{event.raceType.toUpperCase()}, &nbsp;
                                                                {event.distance.filter(distance => { if (distance.distance === 0) { return false } return true }).map((distance, index) => (<span key={distance.distanceTypeId} style={{ marginRight: '0px' }}>
                                                                {distance.distance}{index === event.distance.filter(distance => { if (distance.distance === 0) { return false } return true }).length - 1 ? " km" : "/"}
                                                            </span>
                                                            )
                                                            )
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Typography component="div" style={{ marginTop: '-5px' }}>
                                                    <img src={locationIcon} height="15px" />
                                                    &nbsp; <Typography component="span" style={{ color: '#F9A11E' }}>{event.raceType === 'vr' ? "วิ่งที่ไหนก็ได้" : event.locationTextShowTH}</Typography>
                                                    &nbsp; <Typography component="span" style={{ color: '#B1B1B1' }}>{event.provinceTH ? `(${event.provinceTH})` : null} </Typography>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItemStyle>
                                    {i === props.data.length - 1 ? null : <Divider style={{ backgroundColor: 'rgba(225,225,225,0.9)' }} />}

                                </Hidden>
                            </Link>
                        ))
                    }
                </List>
                {/* <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Fab onClick={props.handleLoadMore} style={{ backgroundColor: '#1F81C5', width: '123px', height: '36px', marginBottom: '20px', borderRadius: '15px' }}>
                        <Typography variant="caption" style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: '#FFFFFF'
                        }}>

                            {props.loading ? <CircularProgress size={24} className={classes.buttonProgress} /> : <b>LOAD MORE EVENTS</b>}
                        </Typography>
                    </Fab>
                </Grid> */}
            </Grid>

        </Container>
    )
}
)

export default EventListComponent