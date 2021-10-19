import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { Link } from "react-router-dom";
import _ from 'lodash'
import queryString from 'query-string'
import styled from 'styled-components'

// import SearchComponent from '../components/SearchComponent'
import AdvanceSearch from '../components/AdvanceSearch'
// import HomeMenu from '../components/HomeMenu'
//import NavBar from './components/NavBar'
import '../App.css';

// import LazyLoad from 'react-lazyload';

import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';




import topBackground from '../images/newTopBackGround.jpg'

import whereToRunLogo from '../imagesv2/wheretorun_4.png'

import RoadImage from '../imagesv3/Road.jpg'
import TrailImage from '../imagesv3/Trail.jpg'
import VRImage from '../imagesv3/vr.jpg'


import BannerMobile from '../imagesv2/Banner-Mobile2.jpg'
import BannerPc from '../imagesv2/banner-Web2.jpg'

//import GoogleMaps from '../components/GoogleAutoComplete'
import ListEvent from '../graphql/query/ListEvent'
//import GoogleMapCluster from '../components/GoogleMapCluster'
import ListEventCountQuery from '../graphql/query/ListEventCountQuery'

import QueryAdvanceFilterSearch from '../graphql/query/QueryAdvanceFilterSearch'
import QueryAdvanceFilterSearchCount from '../graphql/query/QueryAdvanceFilterSearchCount'

import StickyDetailBar from '../components/StickyDetailBar'
import EventListComponent from '../components/EventListComponent'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


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

const CardStyle = styled(Card)`
position: relative;

&:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0;
    transition: .3s all;
    }
    
   

    &:hover h5 {
        color: #FFFFFF;
        opacity: 1;
        z-index:100
    } 
`
// &:hover:after {
//     opacity: 0.2;
//     }

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const Home = (props) => {

    const EventRef = useRef(null)
    let location = useLocation()
    const parsed = queryString.parse(location.search);



    // const [queryString, setQueryString] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date().toISOString())
    const [sort, setSort] = useState({ mainScoreRating: "desc" })
    const [currentId, setCurrentId] = useState('')
    const [data, setData] = useState([])
    const classes = useStyles();

    let eventShow
    //const currentDate = new Date().toISOString()

    let variables = {
        // eventDateStart: currentDate,
        sort: sort,
        first: 50
    }

    // if (currentId === '') {
    //     variables = {
    //         eventDateStart: currentDate,
    //         sort: sort,
    //         first: 50
    //     }
    // }
    // else {
    //     variables = {
    //         eventDateStart: currentDate,
    //         sort: sort,
    //         first: 50,
    //         after: currentId
    //     }
    // }

    let whereInput = {
        AND: [
            {
                isRecommend: {
                    gt: 0
                }
            },
            {
                isPublic: {
                    equals: true
                }
            }
        ]
    }

    const queryEvent = useQuery(ListEvent, {
        variables: variables,
        fetchPolicy: 'network-only'
    });

    const queryEventCount = useQuery(ListEventCountQuery, {
        variables: variables,
        fetchPolicy: 'network-only'
    });



    useEffect(() => {

        if (_.get(parsed, "comingEvent", null) === "1") {
            scrollToEvent()
        }

    }, [parsed])

    useEffect(() => {
        if (!queryEvent.loading && currentId === '') {
            //setData(queryEvent.data.events)
        }
        else if (!queryEvent.loading && !queryEvent.error && currentId !== '' && data[0].eventId !== queryEvent.data.events[0].eventId) {

            //setData(oldData => [...oldData, ...queryEvent.data.events])
        }
        else if (queryEvent.loading && currentId === '') {
            //  setData(cards)
        }
    }, [queryEvent])

    // const queryEvent = useQuery(ListEvent, {
    //     variables: {
    //         eventDateStart: currentDate,
    //         sort: sort
    //     },
    // });

    // let [events] = useQuery(ListEvent);
    const scrollToEvent = () => {
        window.scrollTo({
            top: EventRef.current.offsetTop - 120,
            left: 100,
            behavior: 'smooth'
        });
    }

    const handleSortFromStickyComponent = (sortValue) => {
        // setCurrentId('')
        // setData([])
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
        // queryEvent.refetch()
        //console.log(sortValue)

    }

    // useEffect(() => {
    //     if (queryEvent.loading) {
    //         eventShow = cards
    //     } else {
    //         eventShow = _.get(queryEvent.data, 'events', null)

    //     }

    // }, [])
    //eventShow = queryEvent.loading && currentId === '' ? cards : queryEvent.data

    // if (queryEvent.loading && currentId === '') {
    //     //eventShow = cards
    //     console.log('cards')
    // }
    // else if (!queryEvent.loading && currentId === '') {
    //     //eventShow = _.get(queryEvent.data, 'events', cards)
    //     //setData(eventShow)
    // }
    // else if (queryEvent.loading && currentId !== '') {
    //     console.log("what happen")
    //     //eventShow = data
    //     //setData(eventShow)
    // }
    // else if (!queryEvent.loading && currentId !== '') {
    //     console.log("data before concat", data)
    //     console.log("querydetail", _.get(queryEvent.data, 'events', []))
    //     //eventShow = data.concat(_.get(queryEvent.data, 'events', []))
    //     // setData(eventShow)
    // }
    // console.log('evebtShow', eventShow)
    // console.log('data', data)
    // console.log('currentId', currentId)

    // useEffect(() => {
    //     console.log("firsttime")
    //     // eventShow = []
    // }, [])

    // useEffect(() => {
    //     // console.log("useeffectdata", data)
    //     // if (data.length !== 0) {
    //     //     setCurrentId(data[data.length - 1].eventId)
    //     // }
    //     console.log("currentId from useeffect", currentId)

    // }, [currentId])



    const handleLoadMore = (lastestData) => {

        // setData(lastestData)
        //setCurrentId(data[data.length - 1].eventId)
        // queryEvent.fetchMore({ after: data[data.length - 1].eventId })
        //queryEvent.refetch()
        queryEvent.fetchMore({
            variables: {
                after: queryEvent.data.events[queryEvent.data.events.length - 1].eventId,
                first: 20
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

    // console.log(currentDate)


    // if (queryEvent.loading) {
    //     eventShow = cards
    // } else {
    //     eventShow = _.get(queryEvent.data, 'events', null)
    //     console.log(eventShow.filter(event => {
    //         if (event.latitude == null || event.longtitude == null) {
    //             return false
    //         }
    //         return true
    //     }))
    // }
    //console.log(eventShow)
    //alert(process.env.REACT_APP_TEST)



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

            <AppBar className={classes.stickyAppBar} style={{ backgroundColor: "#000000", alignItems: 'center' }} position="sticky">
                <Container maxWidth="md" style={{ alignItems: 'center' }} className={classes.topBackground}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom >

                        <StickyDetailBar title="งานวิ่งทั้งหมด" handleSortFromStickyComponent={handleSortFromStickyComponent} count={queryEventCount.loading ? 0 : queryEventCount.data.events.length} />

                    </Typography>
                </Container>
            </AppBar>

            {/* <Container maxWidth="md" style={{ backgroundColor: "#DCDCDC", paddingTop: '20px' }}>

                <Typography style={{ marginTop: '30px', marginBottom: '30px', fontFamily: 'rsuTextFont' }} align="center" variant="h4">
                    <P blue>ประเภทการวิ่ง</P>
                </Typography>
                <Grid container spacing={4} style={{ textAlign: 'center', justify: 'center' }}>
                    <Grid item xs={12} sm={4}>
                        <Link to="/road">
                            <CardStyle style={{ height: '200px', width: '100%', backgroundSize: 'cover', backgroundImage: `url('${RoadImage}')` }}>
                                <CardActionArea style={{ height: ' 100%', width: '100%' }}>
                                    <div style={{ alignItems: 'center', height: '40px', width: '100%', backgroundColor: 'rgba(255,255,255,0.6)' }}>
                                        <Typography variant="h5" align="center">
                                            Road
                                    </Typography>
                                    </div>
                                </CardActionArea>
                            </CardStyle>
                        </Link>

                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Link to="/trail">
                            <CardStyle style={{ height: '200px', width: '100%', backgroundSize: 'cover', backgroundImage: `url('${TrailImage}')` }}>
                                <CardActionArea style={{ height: ' 100%', width: '100%' }}>
                                    <div style={{ alignItems: 'center', height: '40px', width: '100%', backgroundColor: 'rgba(255,255,255,0.6)' }}>
                                        <Typography variant="h5" align="center">
                                            Trail
                                    </Typography>
                                    </div>
                                </CardActionArea>
                            </CardStyle>
                        </Link>

                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Link to="/vr">
                            <CardStyle style={{ height: '200px', width: '100%', backgroundSize: 'cover', backgroundImage: `url('${VRImage}')` }}>
                                <CardActionArea style={{ height: ' 100%', width: '100%' }}>
                                    <div style={{ alignItems: 'center', height: '40px', width: '100%', backgroundColor: 'rgba(255,255,255,0.6)' }}>
                                        <Typography variant="h5" align="center">
                                            VR
                                    </Typography>
                                    </div>
                                </CardActionArea>
                            </CardStyle>
                        </Link>

                    </Grid>
                </Grid>
                <Typography ref={EventRef} style={{ paddingBottom: '15px' }} align="center" variant="h4">
                    <P>งานวิ่งที่กำลังมาถึง</P>
                </Typography>
            </Container> */}


            {/* <span /> */}
            <EventListComponent ref={EventRef} whereCondition={whereInput} handleLoadMore={handleLoadMore} loading={queryEvent.loading} data={queryEvent.loading ? cards : queryEvent.data.events} />

            {/* <Container maxWidth="md" className={classes.mainContain} style={{ backgroundColor: '#FFFFFF', backgroundImage: `url("${circleBackground}")`, backgroundRepeat: 'repeat-y', backgroundSize: 'contain', paddingBottom: '30px' }} >



                <Grid container spacing={4} style={{ width: '95%', marginTop: '10px', marginLeft: '2.5%', borderRadius: '10px', backgroundColor: "#DCDCDC" }}>
                    <List className={classes.lists} style={{ marginRight: 'auto', marginLeft: 'auto', width: '95%' }}>


                        {queryEvent.loading ?

                            cards.map(event => (
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
                            queryEvent.data.events.map(event => (
                                <Link to={{ pathname: `/event/${event.slug}`, state: { background: location } }} style={{ textDecoration: 'none', color: "black" }}>
                                    <Card className={classes.root} style={{ borderLeft: '5px solid #1F81C5', marginBottom: '10px' }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Grid container className={classes.cardContent}>
                                                    <Grid item xs={12} sm={10}>
                                                        <Typography gutterBottom variant="h5" style={{
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            color: '#1F81C5'
                                                        }}>
                                                            <b>{event.eventNameTH}</b>
                                                        </Typography>
                                                        <Typography style={{ marginTop: '-10px' }}>
                                                            {event.distance.filter(distance => { if (distance.distance === 0) { return false } return true }).map(distance => (<span keu={distance.distanceTypeId} style={{ marginRight: '10px' }}>
                                                                {distance.distance} กิโลเมตร,
                                                                                    </span>
                                                            )
                                                            )
                                                            } {event.provinceTH}
                                                        </Typography>
                                                        <Typography style={{ marginTop: '0px' }}>
                                                            <img height="20px" src={raceTypeIcon} /> {event.raceType.toUpperCase()} &nbsp;  &nbsp;<img height="20px" src={calendarIcon} /> {moment(event.eventDateStart).format('DD MMM YYYY')}
                                                        </Typography>

                                                    </Grid>
                                                    <Grid item xs={12} sm={2}>
                                                        <Fab
                                                            variant="extended"
                                                            size="small"
                                                            aria-label="Add"
                                                            className={classes.margin}
                                                            style={{ backgroundColor: '#1F81C5', height: '37px', color: '#FFFFFF', borderRadius: '5px', boxShadow: '0px 3px 5px -1px rgba(0,0,0,0), 0px 6px 10px 0px rgba(0,0,0,0), 0px 1px 18px 0px rgba(0,0,0,0)' }}
                                                        >
                                                            VIEW EVENT
                                                        </Fab>

                                                    </Grid>
                                                </Grid>
                                             
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Link>
                            ))
                        }



                    </List>
                </Grid>


            </Container> */}

            {/* <Container className={classes.loadMore} maxWidth="md">
                <Divider component="li" />
                <ListItem alignItems="flex-start" button style={{ textAlign: 'center', backgroundColor: "#1F81C5" }} onClick={e => handleLoadMore(eventShow)}>
                    <ListItemText
                        primary={<Typography gutterBottom variant="h5" style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: '#FFFFFF'
                        }}>

                            {queryEvent.loading ? <CircularProgress size={24} className={classes.buttonProgress} /> : <b>LOAD MORE EVENTS</b>}
                        </Typography>}
                    />
                </ListItem>
            </Container> */}


        </div>
    )
}

export default Home