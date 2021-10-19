import gql from 'graphql-tag';



const MutationCreateComment = gql`
mutation CreateComment($comment: String!, $eventSlug: String, $photo: [CommentPhotoCreateWithoutCommentInput!],
$mainScoreRating: Float, $photoSearchRating: Float, $routeRating: Float, $organizeRating: Float, $hotelAndTourismRating: Float,
$name: String, $videoURL: String){
  createOneComment(data: {
    comment: $comment,
    event: {
      connect: {
        slug: $eventSlug
      }
    },
    photo: {
      create: $photo
    },
    mainScoreRating: $mainScoreRating,
    photoSearchRating: $photoSearchRating,
    routeRating: $routeRating,
    organizeRating: $organizeRating,
    hotelAndTourismRating: $hotelAndTourismRating,
    name: $name,
    videoURL: $videoURL
  }
    ){
    comment
    event{
      slug
    }
    photo{
      commentPhotoId
      imageUrl
    }
  }
}

`;


export default MutationCreateComment