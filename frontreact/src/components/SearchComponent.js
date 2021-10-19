import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const SearchComponent = (props) => {
    const classes = useStyles();

    return (
        <div style={{ align: 'center', margin: 'auto' }}>
            <form noValidate autoComplete="off">
                <Grid container spacing={3} alignItems="center" justify="center">
                    <Grid item xs={11} sm={8} >
                        <TextField id="outlined-basic" label="What are you looking for ?" variant="outlined" style={{ borderRadius: '50%', width: '100%' }} />
                    </Grid>
                    <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add"
                        className={classes.margin}
                    >
                        <SearchIcon className={classes.extendedIcon} />
                        Search
                    </Fab>
                </Grid>
            </form>
        </div>
    )
}


export default SearchComponent