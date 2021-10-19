import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';




import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import SearchIconImage from '../images/icons/searchIcon.png'
import FilterIcon from '../imagesv2/adjust (1).png'
import FilterIconBlue from '../imagesv2/adjust.png'
import LocationIcon from '../imagesv2/pin (5).png'



import queryString from 'query-string'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import { DateRangePickerComponent, CalendarView } from '@syncfusion/ej2-react-calendars';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '../imagesv2/search (3).png'
// import FilterIcon from '../imagesv2/adjust (1).png'
import backgroundImage from '../imagesv3/Background Banner.png'

// import RangePicker from './RangePicker'
import '../css/AdvanceSearch.css'
import '../css/AdvanceSearchModal.css'

//import ProvinceJson from 'json!../json/provinces.json'
const ProvinceJson = require('../json/provinces.json');

const useStyles = makeStyles(theme => ({
    paper: {
        width: '100%',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0), 0px 1px 1px 0px rgba(0,0,0,0), 0px 1px 3px 0px rgba(0,0,0,0)',
        borderRadius: '5px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    grid: {
        marginTop: '20px'
    }
}));

const DialogContentStyle = styled(DialogContent)`
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

const AdvanceSearchModal = (props) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');


    const handleChangeRaceType = name => event => {
        setRaceType({ ...raceType, [name]: event.target.checked });
    };

    const handleChangeDistance = name => event => {
        setDistance({ ...distance, [name]: event.target.checked });
    };


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const handleClickOpen = () => {
        setOpen(true);
    };



    const handleClose = () => {

        setOpen(false);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////



    const history = useHistory()



    const [province, setProvince] = React.useState("")



    // const [distance, setDistance] = React.useState(null)
    // const [raceType, setRaceType] = React.useState(null)

    // const [dateRange, setDateRange] = React.useState([])

    // const [startDate, setStartDate] = React.useState(null)
    // const [endDate, setEndDate] = React.useState(null)
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
        other: false,
    })


    const handleChangeProvince = (event) => {
        setProvince(event.target.value)
    };




    const handleDateRange = (date) => {

        if (_.get(date, 'value', null) == null) {
            setDateRange([])
            setStartDate(null)
            setEndDate(null)
        }
        else {
            setDateRange([new Date(date.value[0]).toISOString(), new Date(date.value[1]).toISOString()])
            setStartDate(new Date(date.value[0]).toISOString())
            setEndDate(new Date(date.value[1]).toISOString())

        }
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
        if (raceType.other === true) {

            queryParam['other'] = 1
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
        setOpen(false)

        history.push(`/eventSearch?${build}`)



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







    return (
        <React.Fragment>
            <Fab
                variant="extended"
                size="small"
                aria-label="Add"
                className={classes.margin}
                style={{ height: '35px', backgroundColor: "#1F81C5", color: '#1F81C5', borderRadius: '5px', boxShadow: '0px 3px 5px -1px rgba(0,0,0,0), 0px 6px 10px 0px rgba(0,0,0,0), 0px 1px 18px 0px rgba(0,0,0,0)' }}
                onClick={handleClickOpen}
            >
                <img height="20px" src={FilterIcon} />
            </Fab>

            <Dialog
                className="ModalDialog"
                style={{ overflow: 'hidden' }}
                fullWidth={fullWidth}
                maxWidth="sm"
                scroll="body"
                open={open}
                onClose={handleClose}
                fullScreen={fullScreen}
                aria-labelledby="max-width-dialog-title"
            >
                {/* <DialogTitle id="max-width-dialog-title" style={{ color: '#FB8D0A', backgroundColor: '#1F81C5', padding: '8px 24px' }} >
                    <Button onClick={handleClose} style={{ color: '#FFFFFF', marginLeft: '-20px' }}>
                        <ArrowBackIosIcon /></Button>
                </DialogTitle> */}
                <DialogContentStyle style={{ backgroundImage: `url('${backgroundImage}')`, height: '100%' }}>
                    <Typography component="div" align="right">
                        <IconButton onClick={handleClose} style={{ padding: '0px' }}>
                            <CloseIcon style={{ color: '#FFFFFF' }} />
                        </IconButton>

                    </Typography>


                    <Grid container spacing={1}>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <Typography component={'div'} style={{ color: '#FFFFFF' }} variant="h5">
                                {/* <img src={FilterIconBlue} height='15px' style={{ marginRight: '5px' }} /> */}
                                ค้นหาอย่างละเอียด
                        </Typography>
                            <p style={{ marginTop: '10px' }}></p>
                        </Grid>
                        <Grid item xs={12} className={classes.grid} >
                            <Paper component="div" className={classes.paper} style={{ textAlign: 'left' }}>
                                <img src={SearchIcon} height="20px" style={{ marginBottom: '-5px', marginLeft: '5%', marginRight: '8px' }} />
                                <InputBase
                                    autoComplete="test"
                                    style={{ width: '80%' }}
                                    className={classes.input}
                                    placeholder="ค้นหาชื่องาน"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                />
                                {/* <span style={{ borderLeft: '3px solid grey', height: '10px' }}></span> */}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} className={classes.grid}>
                            <Paper component="div" className={classes.paper} style={{ textAlign: 'left' }}>
                                <img src={LocationIcon} height="20px" style={{ marginBottom: '-5px', marginLeft: '5%', marginRight: '8px' }} />
                                <Select
                                    native
                                    style={{ width: '80%', color: province === "" ? '#A8A8A8' : 'black' }}
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

                    </Grid>

                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12} sm={7} className={classes.grid}>
                            <Paper component="div" className={classes.paper} style={{ textAlign: 'left', paddingLeft: '5%' }}>
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
                                    style={{ marginRight: '20px' }}
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
                                />
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} alignItems="center">
                        {/* <Grid item xsDown implementation="css" component={Hidden} sm={3} /><Grid item xs={12} sm={2}> <Typography variant="h6" gutterBottom style={{ color: '#FB8D0A' }}>ระยะ</Typography> </Grid> */}
                        <Grid item xs={12} sm={7} className={classes.grid}>
                            <Paper component="div" className={classes.paper} style={{ textAlign: 'left', paddingLeft: '5%' }}>
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
                    </Grid>



                    <Grid container spacing={0} alignItems="center">
                        <Grid item xs={12} className={classes.grid}>
                            <Paper component="div" className={classes.paper} style={{ textAlign: 'left', paddingLeft: '5%' }}>
                                <DateRangePickerComponent startDate={startDate} style={{ textAlign: 'left', border: '1px solid rgba(224,220,224,1) !important', borderRadius: '5px' }}
                                    // open={e => window.scrollTo({ top: 100, left: 100, behavior: 'smooth' })} 
                                    endDate={endDate}
                                    placeholder=" กดปฏิทินเพื่อเลือกช่วงเดือน" strictMode={true} width="100%" onChange={handleDateRange}
                                    format='dd-MMM-yyyy' start="Year" depth="Year" zIndex={10000}></DateRangePickerComponent>
                            </Paper>
                        </Grid>
                    </Grid>
                    <p style={{ marginTop: '10px' }}></p>
                    <Divider style={{ width: 'calc(100% + 47px)', marginLeft: '-23px', backgroundColor: '#FFFFFF' }} />
                    <Grid container spacing={0} alignItems="center">
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <p style={{ marginTop: '10px' }}></p>
                            <Fab
                                variant="extended"
                                size="medium"
                                color="primary"
                                aria-label="add"
                                className={classes.margin}
                                onClick={handleAdvanceSearch}
                                style={{ backgroundColor: '#F9A11E', width: '80%', height: '32px', borderRadius: '10px', boxShadow: '0px 3px 5px -1px rgba(0,0,0,0), 0px 6px 10px 0px rgba(0,0,0,0), 0px 1px 18px 0px rgba(0,0,0,0)' }}
                            >
                                ค้นหา
                            </Fab>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '10px' }}>
                            <Fab
                                variant="extended"
                                size="medium"
                                aria-label="add"
                                className={classes.margin}
                                onClick={handleResetAll}
                                style={{ textDecoration: 'underline', backgroundColor: 'transparent', color: '#FFFFFF', width: '100px', height: '32px', borderRadius: '10px', boxShadow: '0px 3px 5px -1px rgba(0,0,0,0), 0px 6px 10px 0px rgba(0,0,0,0), 0px 1px 18px 0px rgba(0,0,0,0)' }}
                            >
                                Reset All
                            </Fab>
                        </Grid>
                    </Grid>
                    <p style={{ marginTop: '10px' }}></p>



                </DialogContentStyle>

                {/* <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment >
    );
}

{/* <RangePicker setStartDate={handleStartDate} setEndDate={handleEndDate} startDate={startDate}
                                endDate={endDate} /> */}

export default AdvanceSearchModal