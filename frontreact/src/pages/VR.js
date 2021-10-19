import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { Link } from "react-router-dom";
import _ from 'lodash'
import styled from 'styled-components'

import AdvanceSearch from '../components/AdvanceSearch'



import AppBar from '@material-ui/core/AppBar';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import whereToRunLogo from '../imagesv2/wheretorun_4.png'

import RoadImage from '../imagesv3/Road.jpg'
import TrailImage from '../imagesv3/Trail.jpg'
import VRImage from '../imagesv3/vr.jpg'


import BannerMobile from '../imagesv2/Banner-Mobile2.jpg'
import BannerPc from '../imagesv2/banner-Web2.jpg'

import QueryAdvanceFilterSearch from '../graphql/query/QueryAdvanceFilterSearch'
//import GoogleMaps from '../components/GoogleAutoComplete'
import ListEvent from '../graphql/query/ListEvent'
//import GoogleMapCluster from '../components/GoogleMapCluster'
import ListEventCountQuery from '../graphql/query/ListEventCountQuery'

import StickyDetailBar from '../components/StickyDetailBar'
import EventListComponent from '../components/EventListComponent'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';



const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        marginRight: 'auto',
        marginLeft: 'auto',
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
        },
        [theme.breakpoints.up('sm')]: {
        },
        [theme.breakpoints.up('md')]: {
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
        },
        [theme.breakpoints.up('sm')]: {
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
            paddingTop: '6px',
            paddingLeft: '0px',
            paddingRight: '0px',
            width: 'calc(100% + 32px)',
            marginLeft: '-16px',
            marginTop: '-17px'

        },
    }
}));

const P = styled.p`
display: inline-block;
position: relative;
${ props => props.topHeader ? 'color: #FFFFFF; font-style: italic;' : null}

&:after{
    content: "";
  height: 3px;
  width: ${props => props.topHeader ? '71%' : '50%'};
  background-color: ${props => props.topHeader ? '#FFFFFF' : '#F9A11E'};
  position: absolute;
  bottom: ${props => props.topHeader ? '19px' : '7px'};
  left: ${props => props.topHeader ? '86%' : '50%'};
  transform: translate(-50%);
}
`



const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const VR = (props) => {

    let location = useLocation()
    const [queryString, setQueryString] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date().toISOString())
    const [sort, setSort] = useState({ eventDateStart: "asc" })
    const [currentId, setCurrentId] = useState('')
    const [data, setData] = useState([])
    const classes = useStyles();

    let eventShow
    //const currentDate = new Date().toISOString()

    // let variables
    //     variables = {
    //         eventDateStart: currentDate,
    //         sort: sort,
    //         first: 50
    //     }
    const queryEvent = useQuery(QueryAdvanceFilterSearch, {
        variables: {
            whereInput: {
                AND: [
                    {
                        eventDateStart: {
                            gte: currentDate
                        }
                    },
                    {
                        raceType: {
                            equals: 'vr'
                        }
                    }
                ]
            },
            sort: {
                eventDateStart: 'asc'
            },
            first: 20
        },
        fetchPolicy: 'network-only'
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 100,
            behavior: 'smooth'
        });
    }, [])

    const handleSortFromStickyComponent = (sortValue) => {

        window.scrollTo({
            top: 100,
            left: 100,
            behavior: 'smooth'
        });
        if (sortValue === 'Date') {
            setSort({ eventDateStart: "asc" })

        }
        else if (sortValue === 'Name') {
            setSort({ eventNameTH: "asc" })
        }
        else {
            setSort({ raceType: "asc" })

        }


    }




    const handleLoadMore = (lastestData) => {


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





    return (
        <div>



            <Container maxWidth="md" style={{ backgroundColor: "#DCDCDC", paddingTop: '11px' }}>

                <Grid container spacing={0} style={{ textAlign: 'center', justify: 'center' }} className={classes.topImage}>
                    <Grid item xs={12} >
                        <Card style={{ height: '300px', width: '100%', backgroundSize: 'cover', backgroundImage: `url('${VRImage}')` }}>
                            <div style={{ alignItems: 'center', width: '100%' }}>
                                <Typography style={{ Color: '#FFFFFF', marginTop: '106px', paddingBottom: '15px' }} align="center" variant="h3">
                                    <P topHeader>VR</P>
                                </Typography>
                            </div>
                        </Card>
                    </Grid>

                </Grid>

                <Typography style={{ marginTop: '40px', paddingBottom: '15px' }} align="center" variant="h5">
                    <P>งานวิ่งประเภท VR</P>
                </Typography>
            </Container>



            <EventListComponent handleLoadMore={handleLoadMore} loading={queryEvent.loading} data={queryEvent.loading ? cards : queryEvent.data.events} />




        </div>
    )
}

export default VR