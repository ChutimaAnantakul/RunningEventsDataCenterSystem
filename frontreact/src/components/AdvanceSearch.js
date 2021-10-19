import React, { useEffect } from 'react';
import queryString from 'query-string'
import _ from 'lodash'
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import SearchIcon from '../imagesv2/search (3).png'
import LocationIcon from '../imagesv2/pin (5).png'

// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import ToggleButton from '@material-ui/lab/ToggleButton';
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
// import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
// import FilterListIcon from '@material-ui/icons/FilterList';
import Divider from '@material-ui/core/Divider'
import Select from '@material-ui/core/Select'
import Hidden from '@material-ui/core/Hidden'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


import { DateRangePickerComponent, CalendarView } from '@syncfusion/ej2-react-calendars';


//import { Button, Input } from 'semantic-ui-react'
//import { DatePicker } from 'antd';
//import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
//const { RangePicker, MonthPicker } = DatePicker;
import AdvanceSearchModal from './AdvanceSearchModal'
//import { DateRangePickerComponent, CalendarView } from '@syncfusion/ej2-react-calendars';

// import RangePicker from './RangePicker'
import '../css/AdvanceSearch.css'

//import ProvinceJson from 'json!../json/provinces.json'
const ProvinceJson = require('../json/provinces.json');




const useStyles = makeStyles(theme => ({
    paper: {
        width: '100%',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0), 0px 1px 1px 0px rgba(0,0,0,0), 0px 1px 3px 0px rgba(0,0,0,0)',
        borderRadius: '5px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    AdvanceSearchOpenButton: {
        //paddingTop: theme.spacing(8),
        //paddingBottom: theme.spacing(8),
        //maxWidth: '1100px'
        [theme.breakpoints.up('xs')]: {
            textAlign: "center"
        },
        [theme.breakpoints.up('sm')]: {
            textAlign: "left"
        },
        [theme.breakpoints.up('md')]: {
            // paddingLeft: '0px',
            // paddingRight: '0px'
        },
    },
    textSize: {
        fontSize: '25px',
        marginBottom: '5px',
        textAlign: 'left'
    }
}));

const DivStyle = styled.div`
.MuiFormControlLabel-label{
    font-family: DBHeavent !important;
    font-size: 20px;
}

.e-input-group input.e-input, .e-input-group.e-control-wrapper input.e-input, .e-input-group textarea.e-input, .e-input-group.e-control-wrapper textarea.e-input{
    font-family: DBHeavent !important;
    font-size: 20px;
}
.MuiInputBase-input{
    font-family: DBHeavent !important;
    font-size: 20px;
}

`

const AdvanceSearch = (props) => {
    const classes = useStyles();

    const history = useHistory()
    const location = useLocation()

    const [province, setProvince] = React.useState("")
    const [searchQuery, setSearchQuery] = React.useState("")

    const [startDate, setStartDate] = React.useState(null)
    const [endDate, setEndDate] = React.useState(null)
    const [dateRange, setDateRange] = React.useState([])

    const [distance, setDistance] = React.useState({
        km9: false,
        km20: false,
        km40: false,
        km42above: false
    })

    const [raceType, setRaceType] = React.useState({
        road: false,
        trail: false,
        vr: false,
        other: false
    })

    const handleChangeRaceType = name => event => {
        setRaceType({ ...raceType, [name]: event.target.checked });
    };

    const handleChangeDistance = name => event => {
        setDistance({ ...distance, [name]: event.target.checked });
    };





    const handleNormalSearch = () => {

        history.push(`/eventSearch?searchString=${searchQuery.toLowerCase()}`)
    }

    const handleChangeProvince = (event) => {
        setProvince(event.target.value)
    };

    const handleDateRange = (date) => {
        console.log(date)

        if (_.get(date, 'value', null) == null) {
            setDateRange([])
            setStartDate(null)
            setEndDate(null)
            // alert("null")
        }
        else {
            // setDateRange([new Date(date.value[0]).toISOString(), new Date(date.value[1]).toISOString()])
            setStartDate(date.value[0])
            setEndDate(date.value[1])

        }
    }

    const handleResetAll = () => {
        setSearchQuery("")
        setProvince("")
        setDistance({
            km9: false,
            km20: false,
            km40: false,
            km42above: false
        })
        setRaceType({
            trail: false,
            road: false,
            vr: false
        })
        setStartDate(null)
        setEndDate(null)
        setDateRange([])
    }




    const handleAdvanceSearch = () => {

        // setOpen(false);

        let queryParam = []
        if (searchQuery !== null && searchQuery !== "") {
            console.log("searchString", searchQuery)

            queryParam['searchString'] = searchQuery.toLowerCase()

        }
        if (distance.km9 === true) {

            queryParam['km9'] = 1
        }
        if (distance.km20 === true) {

            queryParam['km20'] = 1
        }
        if (distance.km40 === true) {

            queryParam['km40'] = 1
        }
        if (distance.km42above === true) {

            queryParam['km42above'] = 1
        }


        if (raceType.road === true) {

            queryParam['road'] = 1
        }
        if (raceType.trail === true) {

            queryParam['trail'] = 1
        }
        if (raceType.vr === true) {

            queryParam['vr'] = 1
        }

        if (province !== null && province !== "") {

            queryParam['province'] = province
        }

        if (startDate !== null && startDate !== "") {

            queryParam['startDate'] = new Date(startDate).toISOString()
            queryParam['endDate'] = new Date(endDate).toISOString()
        }

        // queryParam = { ...queryParam, distance }
        // console.log(queryParam)
        // let build2 = queryString.stringify(queryParam);
        // console.log(build2)




        let build = queryString.stringify(queryParam);
        console.log("queryString", build)

        history.push(`/eventSearch?${build}`)



    }





    return (
        <DivStyle>

            {/* PC Version= ============================== */}
            <Hidden xsDown>
                <Grid container spacing={3} justify="center" style={{ marginTop: '60px', paddingBottom: '30px' }}>

                    <Grid item xs={5} sm={6} >
                        <Paper component="div" className={classes.paper} style={{ textAlign: 'left' }}>
                            <div>
                                <img src={SearchIcon} height="20px" style={{ marginBottom: '-5px', marginLeft: '5%', marginRight: '8px' }} />
                                <InputBase
                                    autoComplete="test"
                                    style={{ width: '70%', marginLeft: '32px', fontFamily: 'DBHeavent' }}
                                    className={classes.input}
                                    placeholder="ค้นหาชื่องาน"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={6} >
                        <Paper component="div" className={classes.paper} style={{ textAlign: 'left' }}>
                            <div>
                                <img src={LocationIcon} height="20px" style={{ marginBottom: '-5px', marginLeft: '5%', marginRight: '8px' }} />
                                <Select
                                    native
                                    style={{ width: '70%', marginLeft: '32px', color: province === "" ? '#A8A8A8' : 'black', fontFamily: 'DBHeavent' }}
                                    value={province}
                                    onChange={handleChangeProvince}


                                >
                                    <option style={{ color: '#eeeeee' }} key="0" value="">ค้นหาจังหวัด</option>
                                    {ProvinceJson.map(province => (
                                        <option key={province._id} value={province._id}>{province.name.th}</option>
                                    ))}
                                </Select>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        {/* <div className={classes.textSize}>ประเภทการวิ่ง :</div> */}
                        <Paper component="div" className={classes.paper} style={{ textAlign: 'left' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        checked={raceType.road}
                                        style={{ color: '#1F81C5' }}
                                        onChange={handleChangeRaceType('road')}
                                    />
                                }
                                label="Road"
                                style={{ marginRight: '20px', marginLeft: '10px', fontFamily: 'DBHeavent' }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        checked={raceType.trail}
                                        style={{ color: '#1F81C5' }}
                                        onChange={handleChangeRaceType('trail')}
                                    />
                                }
                                label="Trail"
                                style={{ marginRight: '20px' }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        checked={raceType.vr}
                                        style={{ color: '#1F81C5' }}
                                        onChange={handleChangeRaceType('vr')}
                                    />
                                }
                                label="VR"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        checked={raceType.other}
                                        style={{ color: '#1F81C5' }}
                                        onChange={handleChangeRaceType('other')}
                                    />
                                }
                                label="Other"
                                style={{ marginRight: '20px' }}
                            />

                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        {/* <div className={classes.textSize}>ระยะทางที่วิ่ง :</div> */}
                        <Paper component="div" className={classes.paper} style={{ textAlign: 'center' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        checked={distance.km9}
                                        style={{ color: '#1F81C5' }}
                                        onChange={handleChangeDistance('km9')}
                                    />
                                }
                                label="1-9 กม."
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        checked={distance.km20}
                                        style={{ color: '#1F81C5' }}
                                        onChange={handleChangeDistance('km20')}
                                    />
                                }
                                label="10-20 กม."
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        checked={distance.km40}
                                        style={{ color: '#1F81C5' }}
                                        onChange={handleChangeDistance('km40')}
                                    />
                                }
                                label="21-41 กม."
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                                        checked={distance.km42above}
                                        style={{ color: '#1F81C5' }}
                                        onChange={handleChangeDistance('km42above')}
                                        size="small"
                                    />
                                }
                                label="42 กม. ขึ้นไป"
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={6} className="datePickerInModalPC">
                        {/* <div className={classes.textSize}>ช่วงเดือนที่วิ่ง :</div> */}
                        <Paper component="div" className={classes.paper} style={{ textAlign: 'center' }}>

                            <DateRangePickerComponent startDate={startDate} style={{ textAlign: 'left' }}
                                // open={e => window.scrollTo({ top: 100, left: 100, behavior: 'smooth' })} 
                                // focus={e => alert("test")}
                                open={e => document.body.style.overflow = 'hidden'}
                                close={e => document.body.style.overflow = 'unset'}
                                endDate={endDate}
                                placeholder=" กดปฏิทินเพื่อเลือกช่วงเดือน" strictMode={true} width="90%" onChange={handleDateRange}
                                format='dd-MMM-yyyy' start="Year" depth="Year" zIndex={99999}></DateRangePickerComponent>

                        </Paper>


                    </Grid>
                    <Grid item xs={6} sm={6} style={{ marginTop: '-5px', textAlign: 'left' }}>
                        <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={handleAdvanceSearch} style={{ marginRight: '10px', height: '35px', width: '142px', backgroundColor: '#1F81C5', color: '#FFFFFF', borderRadius: '5px', boxShadow: '0px 3px 5px -1px rgba(0,0,0,0), 0px 6px 10px 0px rgba(0,0,0,0), 0px 1px 18px 0px rgba(0,0,0,0)' }}>
                            ค้นหา
                        </Fab>

                        <Fab style={{
                            fontSize: '20px', marginLeft: '27px', backgroundColor: 'rgba(0,0,0,0)', width: '100px',
                            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0), 0px 6px 10px 0px rgba(0,0,0,0), 0px 1px 18px 0px rgba(0,0,0,0)'
                        }} onClick={handleResetAll} >Reset All</Fab>



                    </Grid>
                    {/* <Grid item xs={2} style={{ marginTop: '30px' }}>

                    </Grid> */}
                    {/* <Grid item xs={8} sm={3} className={classes.AdvanceSearchOpenButton}>
                        
                        <AdvanceSearchModal setSearchQueryToModal={searchQuery} />

                    </Grid>
                    <Grid item xs={8} sm={3} className={classes.AdvanceSearchOpenButton} style={{ fontSize: '21px', marginBottom: '10px' }}>
                        
                </Grid> */}

                </Grid>
            </Hidden>





            {/* Mobile Version= ============================== */}
            <Hidden smUp>
                <Grid container spacing={3} alignItems="center" justify="center" style={{ marginTop: '60px' }}>

                    <Grid item xs={11} sm={4} >
                        <Paper component="div" className={classes.paper} style={{ textAlign: 'left' }}>
                            <img src={SearchIcon} height="20px" style={{ marginBottom: '-5px', marginLeft: '6px', marginRight: '8px' }} />
                            <InputBase
                                autoComplete="test"
                                style={{ width: '85%' }}
                                className={classes.input}
                                placeholder="ค้นหาชื่องาน"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                            />
                            <Divider orientation="vertical" />


                        </Paper>
                    </Grid>
                    <Grid item xs={11}>
                        <Paper component="div" className={classes.paper} style={{ textAlign: 'left' }}>
                            <img src={LocationIcon} height="20px" style={{ marginBottom: '-5px', marginLeft: '6px', marginRight: '8px' }} />
                            <Select
                                native
                                style={{ width: '85%', color: province === "" ? '#A8A8A8' : 'black' }}
                                value={province}
                                onChange={handleChangeProvince}


                            >
                                <option style={{ color: '#eeeeee' }} key="0" value="">ค้นหาจังหวัด</option>
                                {ProvinceJson.map(province => (
                                    <option key={province._id} value={province._id}>{province.name.th}</option>
                                ))}
                            </Select>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} sm={3} className={classes.AdvanceSearchOpenButton}>
                        <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={handleAdvanceSearch} style={{ marginRight: '10px', height: '35px', width: '100px', backgroundColor: '#1F81C5', color: '#FFFFFF', borderRadius: '5px', boxShadow: '0px 3px 5px -1px rgba(0,0,0,0), 0px 6px 10px 0px rgba(0,0,0,0), 0px 1px 18px 0px rgba(0,0,0,0)' }}>
                            ค้นหา
                        </Fab>
                        <AdvanceSearchModal setSearchQueryToModal={searchQuery} />

                    </Grid>
                    <Grid item xs={8} sm={3} className={classes.AdvanceSearchOpenButton} style={{ fontSize: '21px', marginBottom: '10px' }}>
                        <Fab style={{
                            fontSize: '20px', backgroundColor: 'rgba(0,0,0,0)', width: '100px',
                            boxShadow: '0px 3px 5px -1px rgba(0,0,0,0), 0px 6px 10px 0px rgba(0,0,0,0), 0px 1px 18px 0px rgba(0,0,0,0)'
                        }} onClick={handleResetAll} >Reset All</Fab>
                    </Grid>

                </Grid>
            </Hidden>


        </DivStyle>
    );
}

{/* <RangePicker setStartDate={handleStartDate} setEndDate={handleEndDate} startDate={startDate}
                                endDate={endDate} /> */}


export default AdvanceSearch
