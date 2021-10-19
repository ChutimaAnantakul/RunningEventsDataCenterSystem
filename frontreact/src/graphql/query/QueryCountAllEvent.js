import gql from 'graphql-tag';

const QueryCountAllEvent = gql`
  query getQueryCountAllEvent{
    events(first: 1){
      total

    }
  }
`;

export default QueryCountAllEvent