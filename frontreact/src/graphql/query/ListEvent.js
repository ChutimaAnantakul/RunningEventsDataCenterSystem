import gql from 'graphql-tag';

const ListEvent = gql`
  query getListEvent($eventDateStart : DateTime, $sort : EventOrderByInput, $first : Int, $after : String) {
    events(where : {
      eventDateStart : {
        gte : $eventDateStart
      },
      isRecommend: {
        lte: 0
      },
      isPublic: {
        equals: true
      }
    }, orderBy: $sort, first: $first, after: $after){
      eventId
      eventNameTH
      eventNameEN
      # latitude
      # createDate
      # longtitude
      # priceStart
      # priceEnd
      # eventDate
      eventDateStart
      # coverPhotoUrl
      thumbnailPhotoUrl
      raceType
      
      # bookableDateStart
      slug
      distance{
        distanceTypeId
        distance
      }
      provinceTH
      locationTextShowTH

    }
  }
`;

export default ListEvent