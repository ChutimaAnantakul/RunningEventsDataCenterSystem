import gql from 'graphql-tag';

const QueryComment = gql`
  query listComment($whereInput: CommentWhereInput , $sort: CommentOrderByInput, $first: Int, $after: String)
{
  comments(where: $whereInput, orderBy: $sort, first: $first, after: $after){
    commentId
    name
    comment
    mainScoreRating
    photoSearchRating
    routeRating
    organizeRating
    organizeRating
    photo{
        commentPhotoId
        imageUrl
    }
    createTime
    videoURL
  }
}
`;

export default QueryComment