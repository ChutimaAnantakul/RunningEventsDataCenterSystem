// import gql from 'graphql-tag';

// const QueryAdvanceFilterSearch = gql`
//   query searchEvent($searchString : String, $startDate : DateTime, $endDate : DateTime
//   ,$province : String, $raceType: String, $fromDistance: Float, $toDistance : Float, $sort : EventOrderByInput, $first : Int, $after : String)
// {
//   events(where: {
//     AND: [
//       {OR: [{
//         eventNameTHLowerCase: {
//       contains: $searchString
//     }},
//       {
//         eventNameENLowerCase: {
//           contains: $searchString
//         }
//       }]
//       },
//       {
//       location: {
//         contains: $province
//       }
//       }
//         ,
//         {
//           raceType: {
//           equals : $raceType
//         }      
//         },
//     {
//       eventDateStart: { 
//         gte : $startDate
//       }
//     },
//       {
//         eventDateStart : {
//           lte : $endDate
//         }
//       }
//       ,{
//         distance: {
//           some: {
//             AND: [
//               {distance: {
//                 gte: $fromDistance
//               }},
//               {
//                 distance: {
//                   lte : $toDistance
//                 }
//               }
//             ]
//           }
//         }
//       }
//     ]
//   }, orderBy: $sort, first: $first, after: $after){
//     eventId
//     eventNameTH
//     eventNameEN
//     createDate
//     eventDateStart
//     eventDateEnd
//     coverPhotoUrl
//     thumbnailPhotoUrl
//     distance{
//       distance
//     }
//     slug
//     location
//     raceType
//   }
// }
// `;

// export default QueryAdvanceFilterSearch

import gql from 'graphql-tag';

const QueryAdvanceFilterSearch = gql`
  query searchEvent($whereInput: EventWhereInput , $sort: EventOrderByInput, $first: Int, $after: String)
{
  events(where: $whereInput, orderBy: $sort, first: $first, after: $after){
    eventId
    eventNameTH
    eventNameEN
    createDate
    eventDateStart
    eventDateEnd
    coverPhotoUrl
    thumbnailPhotoUrl
    distance{
      distance
    }
    slug
    location
    raceType
    provinceTH
    locationTextShowTH
  }
}
`;

export default QueryAdvanceFilterSearch