import React, { useState, useRef, useEffect } from 'react'
import _ from 'lodash'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import ImageUpload from './ImageUpload'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';

import MutationCreateComment from '../graphql/mutation/MutationCreateComment'
import QueryComment from '../graphql/query/QueryComment'
import QueryEventDetail from '../graphql/query/QueryEventDetail'
import MutationSumCommentScoreToEvent from '../graphql/mutation/MutationSumCommentScoreToEvent'

import CommentList from './CommentList'

import '../css/CommentSection.css'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
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
    insertMorePicButton: {
        [theme.breakpoints.down('xs')]: {

        },
        [theme.breakpoints.up('sm')]: {
            marginTop: '-38px'
        },
    },
    confirmAndCancelButton: {
        [theme.breakpoints.down('xs')]: {
            textAlign: 'left',
            marginTop: '10px'
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: '30px',
            textAlign: 'center'
        },
    }
    ,
    linkTextField: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
        [theme.breakpoints.up('sm')]: {
            width: '340px'
        },
    },
    ratingText: {
        fontSize: '18px'
    },
    onlyConfirm: {
        [theme.breakpoints.down('xs')]: {
            marginBottom: '10px'
        },
    }
}));


const CommentSection = (props) => {
    const classes = useStyles();

    const [images, setImages] = useState([{ imageUrl: "" }])
    const [rating, setRating] = useState({
        rating1: 0,
        rating2: 0,
        rating3: 0,
        rating4: 0,
    })

    const [videoLink, setVideoLink] = useState('')
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')

    const [nameError, setNameError] = useState(false)
    const [commentError, setCommentError] = useState(false)
    const [ratingError, setRatingError] = useState(false)
    const CommentRef = useRef(null)
    const CommentListRef = useRef(null)


    const [sumCommentScoreToEvent] = useMutation(MutationSumCommentScoreToEvent)
    const [createComment] = useMutation(MutationCreateComment)
    const queryComment = useQuery(QueryComment, {
        variables: {
            whereInput: {
                event: {
                    slug: {
                        equals: props.slug
                    }
                }
            },
            sort: {
                createTime: "desc"
            }
        }
    })
    const queryEventDetail = useQuery(QueryEventDetail, {
        variables: {
            eventSlug: props.slug
        }
    })



    // console.log(rating)
    // console.log(comment)
    // console.log(images)

    const handleImageUpload = (upload, index) => {

        // setCoverPhotoUrl(_.get(upload, 'original.url', null))
        const newImageList = images.map((image, idx) => {
            if (index !== idx) {
                return image
            }
            return { ...images, imageUrl: _.get(upload, 'original.url', null) }
        }
        )
        setImages(newImageList)

    }

    const handleAddImageUpload = () => {

        setImages([...images, { imageUrl: '' }])
    }

    const handleRemoveImageUpload = (upload, index) => {
        alert(index)
        // setImages(images.filter((s, sidx) => idx !== sidx))
    }

    useEffect(() => {
        if (rating.rating1 && rating.rating2 && rating.rating3 && rating.rating4) {
            setRatingError(false)
        }

    }, [rating])

    const handleSubmitComment = () => {

        let errorCheck = 0

        if (!name) {
            setNameError(true)
            errorCheck = 1
        }


        if (!comment) {
            setCommentError(true)
            errorCheck = 1
            window.scrollTo({
                top: CommentRef.current.offsetTop - 120,
                left: 100,
                behavior: 'smooth'
            });
        }

        if (!rating.rating1 || !rating.rating2 || !rating.rating3 || !rating.rating4) {
            setRatingError(true)
            errorCheck = 1
        }

        if (errorCheck) return




        setImages([{ imageUrl: '' }])
        setRating({
            rating1: 3,
            rating2: 3,
            rating3: 3,
            rating4: 3,
        })
        setVideoLink('')
        setName('')
        setComment('')

        const imagesArray = []
        images.filter(image => {
            if (!image.imageUrl) { return false } return true
        }).map(image => {
            imagesArray.push({ imageUrl: image.imageUrl })
        })
        let mainscoresum = (rating.rating1 + rating.rating2 + rating.rating3 + rating.rating4) / 4



        createComment({
            variables: {
                comment: comment,
                eventSlug: props.slug,
                photo: imagesArray,
                mainScoreRating: mainscoresum,
                photoSearchRating: rating.rating1,
                routeRating: rating.rating2,
                organizeRating: rating.rating3,
                hotelAndTourismRating: rating.rating4,
                name: name,
                videoURL: videoLink
            }
        }).then(data => {

            queryComment.refetch()

            window.scrollTo({
                top: CommentListRef.current.offsetTop - 120,
                left: 100,
                behavior: 'smooth'
            });

            sumCommentScoreToEvent({
                variables: {
                    eventSlug: props.slug
                }
            }).then(data => { queryEventDetail.refetch() })
                .catch(e => console.log(e))



        })
            .catch(e => console.log(e))
    }

    const cancelComment = () => {
        setImages([{ imageUrl: '' }])
        setRating({
            rating1: 3,
            rating2: 3,
            rating3: 3,
            rating4: 3,
        })
        setVideoLink('')
        setName('')
        setComment('')
    }

    return (
        <React.Fragment>
            <div style={{ backgroundColor: '#FFFFFF', padding: '20px', boxShadow: '0px 1px 2px 1px rgba(214,210,214,1)' }} className={classes.infoBox}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} style={{ textAlign: 'left' }}>
                        <Typography variant="h6" style={{ fontFamily: 'DBHeaventHevaticaXbd' }}>
                            รีวิวงานวิ่ง
                    </Typography>

                    </Grid>
                    <Grid item xs={12} sm={8} style={{ textAlign: 'left' }} className="commentTextArea">
                        <TextField
                            ref={CommentRef}
                            id="outlined-multiline-static"
                            // label="Comment"
                            value={comment}
                            onChange={e => {
                                setComment(e.target.value)
                                if (e.target.value) setCommentError(false)
                            }}
                            placeholder="สามารถแสดงความคิดเห็นได้"
                            multiline
                            rows="4"
                            variant="outlined"
                            fullWidth
                            style={{ backgroundColor: "#FFFFFF" }}
                        />
                        {commentError ?
                            <Typography style={{ color: 'red', fontSize: '16px' }}>
                                กรุณากรอกรายละเอียดรีวิว
                        </Typography>
                            : null
                        }
                    </Grid>
                </Grid>
                <p style={{ marginTop: "5px" }}></p>

                {images.map((image, index) => (
                    <ImageUpload key={index} imageUrl={image.imageUrl} onChange={handleImageUpload} onDelete={handleRemoveImageUpload} index={index} />
                ))

                }
                {images.length < 5 ?
                    <Grid container>
                        <Grid item sm={3} implementation="css" component={Hidden} xsDown />
                        <Grid item xs={12} sm={5} className={classes.insertMorePicButton}>
                            <Button onClick={handleAddImageUpload} style={{ border: '2px #1f81c5 solid', width: '100px', height: '31px', color: '#1f81c5' }}>
                                <Typography component="span" style={{ marginTop: '-5px', fontSize: '17px' }}>
                                    เพิ่มรูปภาพ
                            </Typography>
                            </Button>
                        </Grid>
                    </Grid> : null
                }

                <Grid container style={{ marginTop: '10px' }}>
                    <Grid xs={12} item>
                        <Typography variant="h6" style={{ fontFamily: 'DBHeaventHevaticaXbd' }}>
                            แนบลิงค์วิดีโอ
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField value={videoLink} onChange={e => setVideoLink(e.target.value)} margin="dense" placeholder="ใส่ลิงค์วิดีโอ" variant="outlined" fullWidth style={{ paddingRight: '10px' }} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Typography component="span" style={{ color: '#B1B1B1', marginTop: '5px', fontSize: '16px' }}>
                            <span style={{ color: 'red' }}>*</span> เช่น https://www.youtube.com/watch?v=442vTPUu2eE
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container style={{ marginTop: '10px' }}>
                    <Grid item xs={12} sm={8} md={6} style={{ textAlign: 'left' }}>
                        <Grid container>
                            <Grid item xs={12} style={{ marginBottom: '10px' }}>
                                <Typography variant="h6" style={{ fontFamily: 'DBHeaventHevaticaXbd' }}>
                                    ให้คะแนนงานวิ่งนี้
                            </Typography>
                                <Divider />
                            </Grid>
                            <Grid xs={6} item>
                                <Typography className={classes.ratingText}>
                                    การค้นหาภาพงานวิ่ง
                            </Typography>
                            </Grid>
                            <Grid xs={6} item style={{ textAlign: 'right' }}>
                                <Rating name="rating1" value={rating.rating1} style={{ color: '#CD2626' }} size="small" onChange={(event, newValue) => setRating({ ...rating, rating1: newValue })} />
                            </Grid>
                            <Grid xs={6} item>
                                <Typography className={classes.ratingText}>
                                    เส้นทางวิ่ง บรรยากาศ
                            </Typography>
                            </Grid>
                            <Grid xs={6} item style={{ textAlign: 'right' }}>
                                <Rating name="rating2" value={rating.rating2} style={{ color: '#FF750A' }} size="small" onChange={(event, newValue) => setRating({ ...rating, rating2: newValue })} />
                            </Grid>
                            <Grid xs={6} item>
                                <Typography className={classes.ratingText}>
                                    การบริหารงาน และการบริการของผู้จัดงาน
                            </Typography>
                            </Grid>
                            <Grid xs={6} item style={{ textAlign: 'right' }}>
                                <Rating name="rating3" value={rating.rating3} style={{ color: '#FAB041' }} size="small" onChange={(event, newValue) => setRating({ ...rating, rating3: newValue })} />
                            </Grid>
                            <Grid xs={6} item>
                                <Typography className={classes.ratingText}>
                                    ที่พักและสถานที่ท่องเที่ยวใล้งานวิ่ง
                            </Typography>
                                {ratingError ?
                                    <Typography style={{ color: 'red', fontSize: '16px' }}>
                                        กรุณาให้คะแนนรัวิว
                                     </Typography>
                                    : null
                                }
                            </Grid>
                            <Grid xs={6} item style={{ textAlign: 'right' }}>
                                <Rating name="rating4" value={rating.rating4} style={{ color: '#F7CA87' }} size="small" onChange={(event, newValue) => setRating({ ...rating, rating4: newValue })} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>

                    </Grid>
                </Grid>

                <Grid container style={{ marginTop: '10px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h6" style={{ fontFamily: 'DBHeaventHevaticaXbd' }}>
                            ชื่อผู้รีวิว
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField value={name} onChange={e => {
                            setName(e.target.value)
                            if (e.target.value) setNameError(false)
                        }} margin="dense" placeholder="ชื่อ" variant="outlined" fullWidth style={{ paddingRight: '10px' }} />
                        {nameError ?
                            <Typography style={{ color: 'red', fontSize: '16px' }}>
                                กรุณากรอกชื่อ
                        </Typography>
                            : null
                        }
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={12} className={classes.confirmAndCancelButton} >
                        <Button onClick={handleSubmitComment} style={{ backgroundColor: '#1f81C5', width: '100px', height: '31px', marginRight: '10px' }} className={classes.onlyConfirm}>
                            <Typography component="span" style={{ marginTop: '-3px', color: '#FFFFFF', fontSize: '17px' }}>
                                บันทึก
                        </Typography>
                        </Button>
                        <Hidden smUp><br /></Hidden>
                        <Button onClick={cancelComment} style={{ backgroundColor: '#B1B1B1', width: '100px', height: '31px' }}>
                            <Typography component="span" style={{ marginTop: '-3px', color: '#FFFFFF', fontSize: '17px' }}>
                                ยกเลิก
                        </Typography>
                        </Button>
                    </Grid>


                </Grid>

            </div >

            {props.children}

            <p ref={CommentListRef} style={{ marginTop: ' 10px' }}></p>

            {/* <div style={{ backgroundColor: '#FFFFFF', padding: '20px' }} className={classes.infoBox}>


            </div> */}

            <CommentList slug={props.slug} />

        </React.Fragment>
    )


}

export default CommentSection