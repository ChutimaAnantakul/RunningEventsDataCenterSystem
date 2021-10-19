import React, { useState } from "react";
import '../css/imageUpload.css';
import { Upload, Icon, message } from "antd";
import loadImage from 'blueimp-load-image'
import _get from 'lodash/get'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons'
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

// const signatureUri = 'http://localhost:4000/upload/sign'

function beforeUpload(file) {
    // console.log(file)
    // const isJPG = file.type === "image/jpeg";
    // if (!isJPG) {
    //   message.error("You can only upload JPG file!");
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error("Image must smaller than 2MB!");
    // }
    // return true;
}



const resizeImg = async (file, { width, height }, quolity = 1) => {
    return new Promise((resolve, reject) => {
        loadImage(file, canvas => {
            if (canvas.type === 'error') {
                return Promise.reject(new Error('Incorrect Image'))
            }
            canvas.toBlob((blob) => {
                const result = new File([blob], file.name, {
                    type: file.type,
                    lastModified: Date.now()
                })
                resolve(result)
            }, file.type, 1)
        }, {
            maxWidth: width,
            maxHeight: height,
            contain: true,
            orientation: true,
            canvas: true
        })
    })
}

const gcsUpload = async (file, onProgress) => {
    const res = await fetch(`${process.env.REACT_APP_IMAGE_UPLOAD_URL}?mimetype=${file.type}`, { method: 'POST' })
    const { signedUrl, fileUrl } = await res.json()
    return new Promise((resolve, reject) => {
        loadImage(file, canvas => {
            if (canvas.type === 'error') {
                return Promise.reject(new Error('Incorrect Image'))
            }
            const { width, height } = canvas
            canvas.toBlob((blob) => {
                const result = new File([blob], file.name, {
                    type: file.type,
                    lastModified: Date.now()
                })
                const xhr = new XMLHttpRequest()
                xhr.open('PUT', signedUrl, true)
                xhr.onprogress = ({ loaded, total }) => {
                    if (onProgress) {
                        onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, file)
                    }
                    // console.log({ progress })
                }
                xhr.onload = (response) => {
                    //console.log(xhr.status, response)
                    const status = xhr.status
                    if (status === 200) {
                        resolve({ url: fileUrl, size: { width, height } })
                        // alert('File is uploaded')
                    } else {
                        reject(new Error('Something went wrong'))
                        // alert('Something went wrong!')
                    }
                }

                xhr.onerror = () => {
                    reject(new Error('Something went wrong'))
                }
                xhr.setRequestHeader('Content-Type', file.type)
                xhr.setRequestHeader('x-goog-acl', 'public-read')
                xhr.send(file)
            }, file.type, 1)
        }, {
            orientation: true,
            canvas: true
        })
    })
}


const ImageUpload = (props) => {
    // state = {
    //     loading: false
    // };

    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    const customRequest = async ({
        action,
        data,
        file,
        filename,
        headers,
        onError,
        onProgress,
        onSuccess,
        withCredentials
    }) => {
        // TODO: use axios

        // const [originalFile, thumbnailFile] = await Promise.all([
        //   resizeImg(file, { width: MAX_DIMENSION, height: MAX_DIMENSION }),
        //   resizeImg(file, { width: MAX_THUMBNAIL_DIMENSION, height: MAX_THUMBNAIL_DIMENSION })
        // ])

        const [original, thumbnail] = await Promise.all([
            gcsUpload(file, onProgress),
            gcsUpload(file)
        ])
        onSuccess({
            original,
            thumbnail
        })
    }



    // handleChange = info => {
    //   if (info.file.status === "uploading") {
    //     this.setState({ loading: true });
    //     return;
    //   }
    //   if (info.file.status === "done") {
    //     // Get this url from response in real world.
    //     getBase64(info.file.originFileObj, imageUrl =>
    //       this.setState({
    //         imageUrl,
    //         loading: false
    //       })
    //     );
    //   }
    // };

    const handleChange = ({ file, fileList, event }) => {
        // console.log('change', { file })
        //this.setState({ loading: true })
        if (file.status === "uploading") {
            setLoading(true)
            return;
        }
        // const { onChange } = this.props
        if (file.status === 'done') {
            getBase64(file.originFileObj, imageUrl => {
                // this.setState({
                //     imageUrl,
                //     loading: false
                // })
                setImageUrl(imageUrl)
                setLoading(false)
            }
            );
            // const { fileUrl } = file.response
            props.onChange(file.response, props.index)
            // this.setState({ loading: false })
            setLoading(false)
        }
    }

    const click = e => {
        // this.setState({
        //     imageUrl: ""
        // });
        setImageUrl('')
        props.onChange(null, props.index)
    };

    const uploadButton = (
        <div style={{ marginTop: 'calc(50% - 9px)', textAlign: 'center' }}>
            <Icon type={loading ? "loading" : "plus"} />
            <div>Click to upload cover photo for your event.</div>
        </div>
    );

    // const imageUrl = this.state.imageUrl;
    return (
        <Grid container>
            {props.index === 0 ?
                <Grid item xs={12} style={{ textAlign: 'left' }}>
                    <Typography variant="h6" style={{ fontFamily: 'DBHeaventHevaticaXbd' }}>
                        รูปภาพ
                </Typography>
                </Grid> : null
            }
            <Grid item xs={12} sm={3} style={{ paddingBottom: '10px' }}>
                <div className="show-image" style={{ height: '150px', width: '150px', background: '#B1B1B1', borderRadius: '5px' }}>

                    {props.imageUrl ? (
                        <img
                            style={{ width: "100%", height: "100%", borderRadius: '5px' }}
                            src={imageUrl}
                            alt="avatar"
                        />
                    ) : (
                            <div style={{ textAlign: 'center' }}>
                                <Icon type={loading ? "loading" : "plus"} style={{ marginTop: 'calc(50% - 9px)' }} />
                            </div>
                        )}

                    {props.imageUrl ? (
                        <React.Fragment>
                            <IconButton aria-label="Delete" className="delete" onClick={e => click(e)} style={{ top: 0, left: '74%', marginTop: '-15px' }}>
                                <CancelTwoToneIcon style={{ color: 'red' }} />
                            </IconButton>
                        </React.Fragment>
                    ) : null}
                </div>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Upload
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    customRequest={customRequest}
                >
                    <Button style={{ backgroundColor: '#1f81C5', width: '100px', height: '31px' }}>
                        <Typography component="span" style={{ marginTop: '-3px', color: '#FFFFFF', fontSize: '17px' }}>
                            เลือกไฟล์
                        </Typography>
                    </Button>
                </Upload>
                <Typography component="div" style={{ color: '#B1B1B1', marginTop: '5px', fontSize: '16px' }}>
                    <span style={{ color: 'red' }}>*</span> ไฟล์ JPG หรือ PNG ขนาดต่ำกว่า 1Mb
                </Typography>
            </Grid>


        </Grid>
    );

}

export default ImageUpload;
