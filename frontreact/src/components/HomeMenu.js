import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import shoe from '../images/trail-running-shoe.svg'

const images = [
    {
        url: 'https://storage.googleapis.com/s.where.thai.run/files/e980e44d-273a-4ecc-a301-e4d3cdf3427b.jpeg',
        title: 'ประเภทการวิ่ง',
        width: '30%',
        color: 'red',
    },
    {
        url: 'https://storage.googleapis.com/s.where.thai.run/files/e980e44d-273a-4ecc-a301-e4d3cdf3427b.jpeg',
        title: 'ระยะการวิ่ง',
        width: '30%',
        color: 'green',
    },
    {
        url: 'https://storage.googleapis.com/s.where.thai.run/files/e980e44d-273a-4ecc-a301-e4d3cdf3427b.jpeg',
        title: 'ภูมิประเทศ',
        width: '30%',
        color: 'blue',
    },
    {
        url: 'https://storage.googleapis.com/s.where.thai.run/files/e980e44d-273a-4ecc-a301-e4d3cdf3427b.jpeg',
        title: 'แผนที่',
        width: '30%',
        color: 'yellow',
    },
];

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xl')]: {
            width: '100% !important', // Overrides inline-style
            height: 70,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

const HomeMenu = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {images.map(image => (
                <ButtonBase
                    id="test"
                    focusRipple
                    key={image.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                        borderRadius: '20px'
                    }}
                >
                    <span
                        className={classes.imageSrc}
                        style={{
                            //backgroundImage: `url(${shoe})`,
                            backgroundColor: image.color
                        }}
                    />
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                        >
                            {image.title}
                            <span className={classes.imageMarked} />
                        </Typography>
                    </span>
                </ButtonBase>
            ))}
        </div>
    );
}

export default HomeMenu
