import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden'

import Divider from '@material-ui/core/Divider'
import footerBackground from '../imagesv3/Background-Footer.png'
import FooterImage from '../imagesv3/footer-โค้ง.png'
import LogoThaiRun from '../imagesv3/logothairunheaderleft.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faCopyright } from '@fortawesome/fontawesome-free-regular'

import FacebookImage from '../imagesv3/facebook.png'
import IGImage from '../imagesv3/instagram-sketched.png'
import '../css/Footer.css'


const useStyles = makeStyles(theme => ({
    logoThairun: {
        [theme.breakpoints.down('xs')]: {

        },
        [theme.breakpoints.up('sm')]: {
            marginTop: '38px'
        },
    },
    footersubText: {
        fontSize: '16px'
    },
    link: {
        textDecoration: 'inherit',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'inherit',
            color: 'inherit',
        }
    }
}))

const Footer = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="md" style={{
            marginTop: '-10px', backgroundSize: '100%', backgroundPosition: "top", backgroundRepeat: 'no-repeat', paddingLeft: '0px',
            paddingRight: '0px'
        }}>
            <img src={FooterImage} style={{ position: 'absolute', marginTop: '-22px', left: '50%', marginLeft: '-92px', width: '184px' }} />

            <div style={{ backgroundColor: '#1F81C5' }}>
                {/* < Grid container spacing={0} align="center" style={{ zIndex: 2, justifyContent: 'center' }}>
                    <Grid item xs={12}>
                        <Typography variant="h6" style={{ color: '#FFFFFF' }}>
                            CONTACT US
                    </Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="h6" style={{ color: '#FFFFFF' }}>
                            <FontAwesomeIcon icon={faPhoneAlt} style={{ fontSize: '17px', marginRight: '5px' }} />
                            +662-153-4554
                    </Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="caption" style={{ color: '#FFFFFF' }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
                            791 Stadium One Chulalongkorn Soi 4 Rama 5 Rd. Pathumwan.Bangkok 10330
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <a href="https://www.facebook.com/thaidotrun/" target="_blank"><img src={FacebookImage} height="20px" style={{ marginRight: '10px' }} /></a> <a href="https://www.instagram.com/thai.run/?hl=th" target="_blank"><img src={IGImage} height="20px" /></a>
                    </Grid>
                </Grid> */}
                <Grid container style={{ padding: '30px', color: '#FFFFFF' }}>
                    <Grid item xs={12} sm={3}>
                        <img src={LogoThaiRun} style={{ width: '130px' }} className={classes.logoThairun} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography component="div" variant="h6" style={{ fontFamily: 'DBHeaventHevaticaXbd' }}>
                            ABOUT US
                        </Typography>
                        <Typography component="div" className={classes.footersubText} style={{ textDecoration: 'none' }}>
                            <a className={classes.link} href="https://race.thai.run">สมัครวิ่ง | race.thai.run </a> <br />
                            <a className={classes.link} href="https://vr.thai.run">Virtual Run | vr.thai.run </a><br />
                            <a className={classes.link} href="https://shop.thai.run">อุปกรณ์การวิ่ง | shop.thai.run</a>  <br />
                            <a className={classes.link} href="https://photo.thai.run">ซื้อรูปภาพงานวิ่ง | photo.thai.run</a>  <br />
                            <a className={classes.link} href="https://read.thai.run">เรื่องเล่านักวิ่ง | read.thai.run</a>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ paddingRight: '35px' }}>
                        <Typography component="div" variant="h6" style={{ fontFamily: 'DBHeaventHevaticaXbd' }}>
                            CONTACT US
                        </Typography>
                        <Typography component="div" className={classes.footersubText}>
                            <div>
                                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
                                791 Stadium One Chulalongkorn Soi 4 Rama 5 Rd. Pathumwan.Bangkok 10330
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '5px' }} />
                                marathon@thai.run
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Typography component="div" variant="h6" style={{ fontFamily: 'DBHeaventHevaticaXbd' }}>
                            FOLLOW US
                        </Typography>
                        <Typography>
                            <a href="https://www.facebook.com/thaidotrun/" target="_blank"><img src={FacebookImage} height="20px" style={{ marginRight: '10px' }} /></a> <a href="https://www.instagram.com/thai.run/?hl=th" target="_blank"><img src={IGImage} height="20px" /></a>
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <div style={{ backgroundColor: '#FFFFFF' }} >
                <Grid container spacing={0} align="center" style={{ justifyContent: 'center', height: '50px', alignItems: 'center', fontFamily: 'rsuTextFont', fontSize: '23px' }}>
                    <Grid item xs={12} sm={6}>
                        Powered by Thai.run
                        <Hidden xsDown>
                            <FontAwesomeIcon icon={faCopyright} style={{ marginRight: '5px', marginLeft: '10px', fontSize: '13px' }} />
                            2020 Terms & Conditions, Privacy Policy
                        </Hidden>
                    </Grid>
                    <Grid item xs={12} sm={false}>
                        <Hidden smUp><FontAwesomeIcon icon={faCopyright} style={{ marginRight: '5px', fontSize: '13px' }} />
                            2020 Terms & Conditions, Privacy Policy
                    </Hidden>
                    </Grid>
                </Grid>
            </div>

        </Container >
    )
}

export default Footer