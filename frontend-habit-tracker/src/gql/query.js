import { gql } from '@apollo/client';

const HABITS_QUERY = gql`
  query HABITS_QUERY {
    habits {
      id
      description
      points
      entries {
        id
        notes
        date
        completed
      }
    }

    totalPoints {
      points
      totalCompletedEntries
    }
  }
`;

export { HABITS_QUERY };