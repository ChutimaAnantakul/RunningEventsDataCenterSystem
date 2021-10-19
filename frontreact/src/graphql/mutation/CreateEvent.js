import gql from 'graphql-tag';



const CreateEvent = gql`
mutation CreateEvent($eventNameTH: String, $eventNameEN: String, $eventNameTHLowerCase: String, 
$eventNameENLowerCase: String, $slug: String!, $distance: [DistanceTypeCreateWithoutEventInput!],
$eventDate: DateTime,$eventDateStart: DateTime, $eventDateEnd: DateTime, $bookableDateStart: DateTime, $bookableDateEnd: DateTime,
 $priceStart: Int, $priceEnd: Int,
$organizer: String, $latitude: Float, $longtitude: Float, $location: String, $keyword: String, $raceType: String,
$linkUrl: String, $coverPhotoUrl: String, $thumbnailPhotoUrl: String, $descriptionTH: String, $descriptionEN: String, $adminId: String){
  createOneEvent(data:{
    eventNameTH: $eventNameTH,eventNameEN: $eventNameEN,eventNameTHLowerCase: $eventNameTHLowerCase,
    eventNameENLowerCase: $eventNameENLowerCase,slug : $slug, distance:{create: 
      $distance
    },eventDate: $eventDate,eventDateStart : $eventDateStart, eventDateEnd : $eventDateEnd
    bookableDateStart: $bookableDateStart,
    bookableDateEnd: $bookableDateEnd,
    priceStart: $priceStart, priceEnd: $priceEnd
    organizer: $organizer, latitude: $latitude, longtitude,: $longtitude, location: $location,
    keyword: $keyword, raceType: $raceType,
    linkUrl: $linkUrl, coverPhotoUrl: $coverPhotoUrl, thumbnailPhotoUrl : $thumbnailPhotoUrl, descriptionTH: $descriptionTH,
    descriptionEN: $descriptionEN, eventAdminCreator: {
      connect: {
        adminId: $adminId
      }
    }, lastUpdateAdmin: {
      connect: {
        adminId: $adminId
      }

    }
  }    
  ){
    eventNameTH
    eventId
    distance{
      distance
      distanceTypeId
    }
  }
}`;


export default CreateEvent