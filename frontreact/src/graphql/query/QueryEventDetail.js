import gql from 'graphql-tag';

const QueryEventDetail = gql`
  query getEventDetail($eventSlug : String) {
    events(where : {
      slug : {
        equals : $eventSlug
      }
    },first: 1){
      eventId
      eventNameTH
      eventNameEN
      latitude
      createDate
      longtitude
      priceStart
      priceEnd
      eventDate
      eventDateStart
      coverPhotoUrl
      thumbnailPhotoUrl
      raceType
      bookableDateStart
      slug
      distance{
        distanceTypeId
        distance
      }
      descriptionTH
      linkUrl
      provinceTH
      locationTextShowTH
      lastUpdateTime
      photoSearchRating
      routeRating
      organizeRating
      hotelAndTourismRating
      commentCount
    }
  }
`;

export default QueryEventDetail