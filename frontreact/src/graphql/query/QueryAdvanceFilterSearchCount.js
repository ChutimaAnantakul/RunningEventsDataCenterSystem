import gql from 'graphql-tag';

const QueryAdvanceFilterSearchCount = gql`
  query searchEvent($whereInput: EventWhereInput , $sort: EventOrderByInput, $first: Int, $after: String)
{
  events(where: $whereInput, orderBy: $sort, first: $first, after: $after){
    eventId
  }
}
`;

export default QueryAdvanceFilterSearchCount


// import gql from 'graphql-tag';

// const QueryAdvanceFilterSearchCount = gql`
//   query searchEvent( $whereInput: EventWhereInput ,$sort: EventOrderByInput, $first: Int, $after: String)
// {
//   events(where: $whereInput ,orderBy: $sort, first: $first, after: $after){
//     eventId
//   }
// }
// `;

// export default QueryAdvanceFilterSearchCount