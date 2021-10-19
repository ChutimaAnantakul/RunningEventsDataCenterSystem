import React from 'react';
import { useHistory } from 'react-router-dom'
// import GoogleMapOneMarker from './GoogleMapOneMarker';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import Switch from '@material-ui/core/Switch';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Hidden from '@material-ui/core/Hidden'

import FocusLock from 'react-focus-lock'
import Header from './Header'
import Footer from './Footer'
import EventDetail from './EventDetail'

const useStyles = makeStyles(theme => ({
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
}));

export default function MaxWidthDialog() {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    let history = useHistory()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
        history.goBack()
    };

    const handleMaxWidthChange = event => {
        setMaxWidth(event.target.value);
    };

    const handleFullWidthChange = event => {
        setFullWidth(event.target.checked);
    };
    document.body.style.overflow = 'hidden'
    return (
        <React.Fragment>
            <FocusLock>
                <Dialog
                    className="ModalDialog"
                    style={{ overflow: 'hidden' }}
                    fullWidth={fullWidth}
                    scroll="body"
                    maxWidth="md"
                    open={true}
                    onClose={handleClose}
                    fullScreen={true}
                    aria-labelledby="max-width-dialog-title"

                >
                    {/* <Hidden smUp>
                        <DialogTitle id="max-width-dialog-title" style={{ backgroundColor: '#1F81C5', color: '#FFFFFF', padding: '8px 24px' }}> <Button style={{ color: '#FFFFFF', marginLeft: '-20px' }} onClick={handleClose} >
                            <ArrowBackIosIcon /></Button></DialogTitle>
                    </Hidden> */}

                    <div style={{ backgroundColor: '#1F1F1F' }}>
                        <Header />
                        <EventDetail />
                        <Footer />
                    </div>

                </Dialog>
            </FocusLock>
        </React.Fragment >
    );
}