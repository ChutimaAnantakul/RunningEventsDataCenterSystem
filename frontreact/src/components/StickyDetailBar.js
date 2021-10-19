import React from 'react';
// import queryString from 'query-string'
import _ from 'lodash'
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks'

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden'

// import Fab from '@material-ui/core/Fab';
// import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';

// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import CountUp from 'react-countup'
import AdvanceSearchModal from './AdvanceSearchModal'
// import QueryCountAllEvent from '../graphql/query/QueryCountAllEvent'

import '../css/AdvanceSearch.css'
import '../css/StickyDetailBar.css'

// const ProvinceJson = require('../json/provinces.json');


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    title: {
        [theme.breakpoints.up('sm')]: {
            textAlign: 'left'
        }
    },
    advanceSearchButton: {
        [theme.breakpoints.up('sm')]: {
            textAlign: 'right'
        }
    },
}));

const StickyDetailBar = (props) => {
    const classes = useStyles();

    const history = useHistory()
    const location = useLocation()

    // const queryCountAllEvent = useQuery(QueryCountAllEvent)


    const [searchQuery, setSearchQuery] = React.useState("")



    const handleNormalSearch = () => {

        history.push(`/eventSearch?searchString=${searchQuery.toLowerCase()}`)
    }







    return (
        <div className={classes.root}>
            <Hidden xsDown>
                <Grid container spacing={0} style={{ marginTop: '15px' }}>
                    <Grid item xs={8} sm={5} className={classes.title}>
                        <Typography component="span" style={{ color: '#FFFFFF', fontFamily: 'DBHeaventHevaticaXbd', fontSize: '28px' }}>
                            {props.title}
                        </Typography>
                        <Typography component="span" style={{ backgroundColor: '#FFFFFF', marginLeft: '5px', paddingLeft: '10px', paddingRight: '10px', fontSize: '30px', borderRadius: '5px', fontFamily: 'DBHeaventHevaticaXbd' }}>
                            < span style={{ color: '#F1F1F1' }}></span><span style={{ color: "#1F81C5" }}><CountUp end={props.count} duration={5} delay={2} />
                            </span>
                        </Typography>
                    </Grid>

                    <div style={{ flexGrow: 1 }}></div>

                    <Grid item xs={6} sm={3} md={3} >
                        <FormControl style={{ marginTop: '5px', color: "#1F81C5", width: "90%", backgroundColor: "white", borderRadius: '5px' }} className={classes.formControl}>

                            <Select
                                native
                                displayEmpty
                                defaultValue="Rating"
                                // value={state.age}
                                onChange={e => props.handleSortFromStickyComponent(e.target.value)}
                                // labelWidth={labelWidth}
                                style={{ borderRadius: '50px', color: "#1F81C5" }}

                            // inputProps={{
                            //     name: 'age',
                            //     id: 'outlined-age-native-simple',
                            // }}
                            >
                                <option value={'Rating'}>&nbsp; จัดเรียงตามคะแนนรีวิว</option>
                                <option value={'Date'}>&nbsp; จัดเรียงตามวันที่</option>
                                <option value={'Name'}>&nbsp; จัดเรียงตามชื่อ</option>
                                <option value={'Type'}>&nbsp; จัดเรียงตามประเภท</option>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
            </Hidden>
            {/* xxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/}

            <Hidden smUp>
                <Grid container spacing={0} alignItems="center" justify="center" style={{ marginTop: '15px' }}>

                    <Grid item xs={12} className={classes.title}>
                        <Typography style={{ color: '#FFFFFF', fontFamily: 'DBHeaventHevaticaXbd', fontSize: '28px' }}>
                            {props.title}
                        </Typography>
                    </Grid>
                    {/* <div style={{ flexGrow: 1 }}></div> */}
                    <Grid item xs={4} style={{ backgroundColor: '#FFFFFF', marginRight: '5px', height: '38px', borderRadius: '5px', fontFamily: 'DBHeaventHevaticaXbd' }}>
                        < span style={{ color: '#F1F1F1' }}></span><span style={{ color: "#1F81C5" }}><CountUp end={props.count} duration={5} delay={2} />
                        </span>

                    </Grid>

                    <Grid item xs={6} >
                        <FormControl style={{ marginTop: '3px', color: "#1F81C5", width: "90%", backgroundColor: "white", borderRadius: '5px' }} className={classes.formControl}>

                            <Select
                                native
                                displayEmpty
                                defaultValue="Rating"
                                // value={state.age}
                                onChange={e => props.handleSortFromStickyComponent(e.target.value)}
                                // labelWidth={labelWidth}
                                style={{ borderRadius: '0px', color: "#1F81C5" }}

                            // inputProps={{
                            //     name: 'age',
                            //     id: 'outlined-age-native-simple',
                            // }}
                            >
                                <option value={'Rating'}>&nbsp; จัดเรียงตามคะแนนรีวิว</option>
                                <option value={'Date'}>&nbsp; จัดเรียงตามวันที่</option>
                                <option value={'Name'}>&nbsp; จัดเรียงตามชื่อ</option>
                                <option value={'Type'}>&nbsp; จัดเรียงตามประเภท</option>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
            </Hidden>
            <br />


        </div >
    );
}




export default StickyDetailBar
