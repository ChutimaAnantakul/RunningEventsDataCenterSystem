import gql from 'graphql-tag';

const ListEvent = gql`
  query QueryCommentFromEvent($eventDateStart : DateTime, $sort : EventOrderByInput, $first : Int, $after : String) {
    events(where : {
      eventDateStart : {
        gte : $eventDateStart
      }
    }, orderBy: $sort, , first: $first, after: $after){
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

    }
  }
`;

export default ListEvent