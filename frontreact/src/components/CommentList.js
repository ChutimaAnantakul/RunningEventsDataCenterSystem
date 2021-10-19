import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import QueryComment from '../graphql/query/QueryComment'
import Comment from './Comment'
import { Waypoint } from 'react-waypoint'


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

const CommentList = (props) => {
    const classes = useStyles()

    window.YTConfig = {
        host: 'https://www.youtube.com'
    }

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
            },
            first: 5
        }
    })

    const handleLoadMore = (lastestData) => {
        console.log("tt")
        // setData(lastestData)
        //setCurrentId(data[data.length - 1].eventId)
        // queryEvent.fetchMore({ after: data[data.length - 1].eventId })
        //queryEvent.refetch()
        queryComment.fetchMore({
            variables: {
                after: queryComment.data.comments[queryComment.data.comments.length - 1].commentId,
                first: 10
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) { return previousResult }
                return {
                    ...previousResult,
                    comments: [...previousResult.comments, ...fetchMoreResult.comments]
                }
            }
        })
    }

    return (
        <React.Fragment>
            <p style={{ marginTop: '10px' }}></p>

            {
                queryComment.loading ?
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <CircularProgress style={{}} />
                    </div>
                    :
                    queryComment.data.comments.map((comment, i) => (
                        <React.Fragment key={comment.commentId}>
                            {i === queryComment.data.comments.length - 3 && <Waypoint onEnter={handleLoadMore} />}
                            <Comment data={comment} />
                        </React.Fragment>
                    )
                    )

            }
        </React.Fragment>
    )
}

export default CommentList