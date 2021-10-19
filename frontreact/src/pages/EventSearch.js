import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import _ from 'lodash'
import cloneDeep from 'lodash/cloneDeep'
import queryString from 'query-string'
import moment from 'moment'
import styled from 'styled-components'

import AdvanceSearch from '../components/AdvanceSearch'
import QueryAdvanceFilterSearch from '../graphql/query/QueryAdvanceFilterSearch'
import QueryAdvanceFilterSearchCount from '../graphql/query/QueryAdvanceFilterSearchCount'
import '../App.css';

import LazyLoad from 'react-lazyload';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import calendarIcon from '../images/icons/calendar.png'
import locationIcon from '../images/icons/placeholder-filled-point.png'
import raceTypeIcon from '../images/icons/raceTypeIcon.png'

import AppBar from '@material-ui/core/AppBar';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';

//import GoogleMaps from '../components/GoogleAutoComplete'

import topBackground from '../images/newTopBackGround.jpg'
import whereToRunLogo from '../imagesv2/wheretorun_4.png'

import BannerMobile from '../imagesv2/Banner-Mobile2.jpg'
import BannerPc from '../imagesv2/banner-Web2.jpg'

import StickyDetailBar from '../components/StickyDetailBar'
import EventListComponent from '../components/EventListComponent'



const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        // backgroundImage: `url(${topBackground})`,
        // padding: theme.spacing(8, 0, 6),
        //maxWidth: '960px',
        marginRight: 'auto',
        marginLeft: 'auto',
        // backgroundSize: 'cover',
        [theme.breakpoints.up('xs')]: {
            backgroundImage: `url("${BannerMobile}")`,
            backgroundSize: 'cover',

        },
        [theme.breakpoints.up('sm')]: {
            backgroundImage: `url("${BannerPc}")`,
            backgroundSize: 'cover',

        },

    },
    topBackground: {
        [theme.breakpoints.up('xs')]: {
            // marginBottom: '50px'
        },
        [theme.breakpoints.up('sm')]: {
            // marginBottom: '100px'
        },
        [theme.breakpoints.up('md')]: {
            // marginBottom: '100px'
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
    // mainDiv: {
    //     [theme.breakpoints.up('md')]: {
    //         paddingLeft: '0px',
    //         paddingRight: '0px',
    //         maxWidth: '960px',
    //         marginLeft: 'auto',
    //         marginRight: 'auto'
    //     },
    // },
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
        width: '100%'
    },
    cardContent: {
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.up('md')]: {
        },
    },
    gridImage: {
        [theme.breakpoints.down('xs')]: {
            marginTop: '35px',
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: '100px',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '110px',

        },
    },
    topImage: {
        [theme.breakpoints.down('xs')]: {
            height: '100px'
        },
        [theme.breakpoints.up('sm')]: {
            height: '220px'
        },
        [theme.breakpoints.up('md')]: {
            height: '250px',
            // marginBottom: '50px'
        },
    },
    topWording: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '-12px'
        },
    }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const P = styled.p`
display: inline-block;
position: relative;

&:after{
    content: "";
  height: 3px;
  width: 50%;
  background-color: ${props => props.blue ? '#1F81C5' : '#F9A11E'};
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%);
}
`

const EventSearch = (props) => {

    const EventRef = useRef(null)
    let location = useLocation()
    const [sort, setSort] = useState({ mainScoreRating: "desc" })
    // const [currentDate, setCurrentDate] = useState(new Date().toISOString())
    const classes = useStyles();

    const parsed = queryString.parse(location.search);

    let whereInput = {
        AND: [{
            isPublic: {
                equals: true
            }
        }]
    }

    let distanceSection = {
        distance: {
            some: {
                OR: []
            }
        }
    }
    if (_.get(parsed, "km9", null) === "1") {
        distanceSection.distance.some.OR.push({
            AND: [
                {
                    distance: {
                        gte: 0
                    }
                },
                {
                    distance: {
                        lte: 9
                    }
                }

            ]
        })
    }
    if (_.get(parsed, "km20", null) === "1") {
        distanceSection.distance.some.OR.push({
            AND: [
                {
                    distance: {
                        gte: 9.1
                    }
                },
                {
                    distance: {
                        lte: 20
                    }
                }

            ]
        })
    }
    if (_.get(parsed, "km40", null) === "1") {
        distanceSection.distance.some.OR.push({
            AND: [
                {
                    distance: {
                        gte: 20.1
                    }
                },
                {
                    distance: {
                        lte: 41
                    }
                }

            ]
        })
    }
    if (_.get(parsed, "km42above", null) === "1") {
        distanceSection.distance.some.OR.push({
            distance: {
                gte: 41.1
            }
        })
    }

    let raceTypeSection = {
        OR: []
    }

    if (_.get(parsed, "road", null) === "1") {
        raceTypeSection.OR.push({
            raceType: {
                equals: "road"
            }

        })
    }
    if (_.get(parsed, "trail", null) === "1") {
        raceTypeSection.OR.push({
            raceType: {
                equals: "trail"
            }

        })
    }
    if (_.get(parsed, "vr", null) === "1") {
        raceTypeSection.OR.push({
            raceType: {
                equals: "vr"
            }

        })
    }
    if (_.get(parsed, "other", null) === "1") {
        raceTypeSection.OR.push({
            raceType: {
                equals: "other"
            }

        })
    }


    if (_.get(parsed, "searchString", null) !== null) {
        whereInput.AND.push({
            OR: [
                {
                    eventNameTHLowerCase: {
                        contains: parsed.searchString.toLowerCase()
                    }
                },
                {
                    eventNameENLowerCase: {
                        contains: parsed.searchString.toLowerCase()
                    }
                },
                {
                    keyword: {
                        contains: parsed.searchString.toLowerCase()
                    }
                }
            ]
        })
    }

    if (_.get(parsed, "province", null) !== null) {
        whereInput.AND.push({
            provinceEN: {
                equals: parsed.province
            }
        })
    }

    if (_.get(parsed, "startDate", null) && _.get(parsed, "endDate", null)) {
        whereInput.AND.push({
            AND: [
                {
                    eventDateStart: {
                        gte: parsed.startDate
                    }
                },
                {
                    eventDateStart: {
                        lte: parsed.endDate
                    }
                }

            ]
        })
    }




    if (distanceSection.distance.some.OR.length > 0) {
        whereInput.AND.push(distanceSection)
    }
    if (raceTypeSection.OR.length > 0) {
        whereInput.AND.push(raceTypeSection)
    }

    let newWhereInputCutOutIsRecommend = cloneDeep(whereInput)
    newWhereInputCutOutIsRecommend.AND.push({
        isRecommend: {
            lte: 0
        }
    })

    let newWhereInputQueryOnlyRecommend = cloneDeep(whereInput)
    newWhereInputQueryOnlyRecommend.AND.push({
        isRecommend: {
            gt: 0
        }
    })


    const searchEvent = useQuery(QueryAdvanceFilterSearch, {
        variables: {
            whereInput: newWhereInputCutOutIsRecommend, sort: sort, first: 20
        },
        fetchPolicy: 'network-only'

    });

    const searchEventCount = useQuery(QueryAdvanceFilterSearchCount, {
        variables: { whereInput: whereInput },
        fetchPolicy: 'network-only'

    });

    const scrollToEvent = () => {
        window.scrollTo({
            top: EventRef.current.offsetTop - 120,
            left: 100,
            behavior: 'smooth'
        });
    }


    useEffect(() => {
        scrollToEvent()
    }, [location])

    const handleSortFromStickyComponent = (sortValue) => {
        scrollToEvent()
        if (sortValue === 'Date') {
            setSort({ eventDateStart: "asc" })

        }
        else if (sortValue === 'Name') {
            setSort({ eventNameTH: "asc" })
        }
        else if (sortValue === 'Rating') {
            setSort({ mainScoreRating: "desc" })
        }
        else {
            setSort({ raceType: "asc" })

        }
    }

    const handleLoadMore = (lastestData) => {


        // console.log(searchEvent.data.events[searchEvent.data.events.length - 1].eventId)
        searchEvent.fetchMore({
            variables: {
                after: searchEvent.data.events[searchEvent.data.events.length - 1].eventId
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) { return previousResult }
                return {
                    ...previousResult,
                    events: [...previousResult.events, ...fetchMoreResult.events]
                }
            }
        })
    }



    return (
        <div>

            <div className={classes.heroContent}>
                <Container maxWidth="md" style={{ alignItems: 'center' }} className={classes.topBackground}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom >
                        <Grid container alignItems="center" justify="center">
                            <Grid item xs={10} sm={8} md={4} className={classes.gridImage}>
                                <img src={whereToRunLogo} className={classes.topImage} />
                            </Grid>
                            <Grid item xs={12} className={classes.topWording}>
                                <Typography style={{ color: '#FFFFFF', fontSize: '30px', fontFamily: 'DBHeaventHevaticaXbd' }}>
                                    กว่า 2,000 งานวิ่ง
                                </Typography>
                            </Grid>
                        </Grid>
                        <AdvanceSearch />

                    </Typography>
                </Container>
            </div>
            {/* <div className={classes.heroContent}>
                <Container maxWidth="md" style={{ alignItems: 'center' }} className={classes.topBackground}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom >
                        <Grid container alignItems="center" justify="center">
                            <Grid item xs={10} sm={8} md={4}>
                                <img src={whereToRunLogo} height="200px" />
                            </Grid>
                        </Grid>
                        <AdvanceSearch />

                    </Typography>
                </Container>
            </div> */}


            <AppBar className={classes.stickyAppBar} style={{ backgroundColor: "#000000", alignItems: 'center' }} position="sticky">
                <Container maxWidth="md" style={{ alignItems: 'center' }} className={classes.topBackground}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom >

                        <StickyDetailBar title="งานวิ่งที่กำลังค้นหา" handleSortFromStickyComponent={handleSortFromStickyComponent} count={searchEventCount.loading ? 0 : searchEventCount.data.events.length} />

                    </Typography>
                </Container>
            </AppBar>

            {/* <span ref={EventRef} /> */}
            <EventListComponent whereCondition={newWhereInputQueryOnlyRecommend} ref={EventRef} handleLoadMore={handleLoadMore} loading={searchEvent.loading} data={searchEvent.loading ? cards : searchEvent.data.events} />

            {/* <Container maxWidth="md" className={classes.mainContain} >
                <Grid container spacing={4} style={{ marginTop: '0px' }}>
                    <List className={classes.lists}>


                        {searchEvent.loading ?

                            cards.map(event => (
                                <Grid item key={event} xs={12}>
                                    <Divider component="li" />
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
                            searchEvent.data.events.map(event => (
                                <Grid item key={event.eventId} xs={12} className={classes.marginGridItem}>
                                    <Divider component="li" />
                                    <Link to={{ pathname: `/event/${event.slug}`, state: { background: location } }} style={{ textDecoration: 'none', color: "black" }}>
                                        <ListItem alignItems="flex-start" button className={classes.marginGridItem}>
                                            <ListItemText
                                                primary={<Typography gutterBottom variant="h5" style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    <b>{event.eventNameTH}</b>
                                                </Typography>}
                                                secondary={
                                                    <div>
                                                        <Typography style={{ marginTop: '-10px' }}>
                                                            {event.distance.filter(distance => { if (distance.distance === 0) { return false } return true }).map(distance => (<span keu={distance.distanceTypeId} style={{ marginRight: '10px' }}>
                                                                {distance.distance} กิโลเมตร,
                                                                                    </span>
                                                            )
                                                            )
                                                            } กรุงเทพมหานคร
                                                        </Typography>
                                                        <Typography style={{ marginTop: '0px' }}>
                                                            <img height="20px" src={raceTypeIcon} /> {event.raceType.toUpperCase()} &nbsp;  &nbsp;<img height="20px" src={calendarIcon} /> {moment(event.eventDateStart).format('DD MMM YYYY')}
                                                        </Typography>

                                                    </div>
                                                }
                                            />
                                            <ListItemSecondaryAction>
                                                <Hidden xsDown>
                                                    <Fab
                                                        variant="extended"
                                                        size="small"
                                                        aria-label="Add"
                                                        className={classes.margin}
                                                        style={{ backgroundColor: '#FB8D0A', height: '37px', color: '#FFFFFF', borderRadius: '0px', boxShadow: '0px 3px 5px -1px rgba(0,0,0,0), 0px 6px 10px 0px rgba(0,0,0,0), 0px 1px 18px 0px rgba(0,0,0,0)' }}
                                                    >
                                                        VIEW EVENT
                                                </Fab>
                                                </Hidden>
                                                <Hidden smUp>
                                                    <IconButton edge="end" aria-label="delete">
                                                        <ArrowForwardIosIcon />
                                                    </IconButton>
                                                </Hidden>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </Link>
                                </Grid>
                            ))
                        }
                    </List>
                </Grid>
                <Divider component="li" />
            </Container> */}
            {/* <Container className={classes.loadMore} maxWidth="md">
                <Divider component="li" />
                <ListItem alignItems="flex-start" button style={{ textAlign: 'center', backgroundColor: "#1F81C5" }} onClick={handleLoadMore}>
                    <ListItemText
                        primary={<Typography gutterBottom variant="h5" style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: '#FFFFFF'
                        }}>

                            {searchEvent.loading ? <CircularProgress size={24} className={classes.buttonProgress} /> : <b>LOAD MORE EVENTS</b>}
                        </Typography>}
                    />
                </ListItem>
            </Container> */}


        </div >
    )
}

export default EventSearch