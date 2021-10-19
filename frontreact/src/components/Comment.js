import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import LazyLoad from 'react-lazyload'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import MutationReportComment from '../graphql/mutation/MutationReportComment'


const useStyles = makeStyles(theme => ({
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
    alignRight: {

        [theme.breakpoints.down('xs')]: {

        },
        [theme.breakpoints.up('sm')]: {
            textAlign: 'right'

        },
    },
}));

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const Comment = (props) => {
    const classes = useStyles()
    const [embeded, setEmbeded] = useState(false)
    const [open, setOpen] = useState(false)

    const [reportComment] = useMutation(MutationReportComment)

    const reportClick = () => {
        setOpen(true)
        console.log(props.data.commentId)
        reportComment({
            variables: {
                commentId: props.data.commentId
            }
        }).then(data => {

        })

    }


    return (
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', boxShadow: '0px 1px 2px 1px rgba(214,210,214,1)' }} className={classes.infoBox}>
            <Snackbar open={open} autoHideDuration={6000} onClose={e => setOpen(false)} message="This comment has been reported! " />
            {/* <Alert onClose={e => setOpen(false)} severity="success">
                    This comment has been reported!
        </Alert> */}
            {/* <span>This comment has been reported! </span>

            </Snackbar> */}
            <Grid container>
                <Grid xs={2} sm={1} item>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.data.name ?
                            props.data.name.charAt(0).toUpperCase()
                            : null
                        }
                    </Avatar>
                </Grid>
                <Grid item xs={10} sm={11}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Typography style={{ fontFamily: 'DBHeaventHevaticaXbd' }}>
                                {props.data.name}
                            </Typography>
                        </Grid>
                        <Grid item implementation="css" component={Hidden} xsDown sm={4} />
                        <Grid item xs={12} sm={2} className={classes.alignRight}>
                            <Typography>
                                {moment(props.data.createTime).format('DD MMM YYYY')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Rating name="rating1" style={{ color: '#FF750A' }} value={props.data.mainScoreRating} precision={0.25} size="small" readOnly />
                            <Typography component="span" style={{ position: 'absolute', marginTop: '-4px', marginLeft: '5px' }}>
                                ({props.data.mainScoreRating})
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="div" style={{ fontSize: '18px', overflowWrap: 'break-word' }}>
                                {/* {props.data.comment.replace(/\r\n|\r|\n/g, "<br />")} */}
                                <div dangerouslySetInnerHTML={{ __html: props.data.comment.replace(/\r\n|\r|\n/g, "<br />") }} />
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                {
                                    props.data.photo.map(image => (
                                        <Grid key={image.commentPhotoId} item xs={6} sm={3} style={{ padding: '10px' }}>
                                            {/* <LazyLoad height={200} offset={100}> */}
                                            <img src={image.imageUrl} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px' }} />
                                            {/* </LazyLoad> */}
                                        </Grid>
                                    ))
                                }
                                {props.data.videoURL ?
                                    <Grid item xs={12} sm={12} style={{
                                        textAlign: 'left', position: 'relative',
                                        paddingTop: embeded ? '56.25%' : 0,
                                        display: embeded ? 'block' : 'none'
                                    }}>
                                        kengekngkengnk
                                        <ReactPlayer
                                            onReady={e => setEmbeded(true)}
                                            config={{
                                                youtube: {
                                                    playerVars: { showinfo: 1 }
                                                }
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0
                                            }}
                                            url={props.data.videoURL}
                                            className='react-player'
                                            // playing
                                            width='100%'
                                            height='100%'
                                        />
                                    </Grid>
                                    : null
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'right' }}>
                            <Button onClick={reportClick} style={{ fontSize: '14px' }}>
                                <FontAwesomeIcon icon={faEllipsisH} /> &nbsp; Report
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Comment