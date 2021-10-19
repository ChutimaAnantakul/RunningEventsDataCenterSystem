import gql from 'graphql-tag';

const ListEventCountQuery = gql`
  query getListEvent($eventDateStart : DateTime) {
    events(where : {
      eventDateStart : {
        gte : $eventDateStart
      }
    }){
      isPublic

    }
  }
`;

export default ListEventCountQuery