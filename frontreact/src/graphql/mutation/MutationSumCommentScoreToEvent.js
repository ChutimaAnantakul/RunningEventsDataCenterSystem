import gql from 'graphql-tag';



const MutationSumCommentScoreToEvent = gql`
mutation sumCommentScore($eventSlug: String!){
ratingSummaryFromCommentToEvent( eventSlug: $eventSlug) 
{
    ratingSummary
    photoSearchRating
    routeRating
    organizeRating
    hotelAndTourismRating
    commentCount
  }
}

`;


export default MutationSumCommentScoreToEvent