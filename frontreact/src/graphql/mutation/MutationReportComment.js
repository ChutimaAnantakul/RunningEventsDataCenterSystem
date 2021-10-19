import gql from 'graphql-tag';



const MutationReportComment = gql`
mutation ReportComment($commentId: String!){
    updateOneComment(data: {
    isReport: true
  }, where: {
    commentId: $commentId
  }
    ){
    commentId
  }
}
`;


export default MutationReportComment