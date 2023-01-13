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

const ENTRIES_QUERY = gql`
  query ENTRIES_QUERY($id: ID!) {
    getEntriesByHabitId(id: $id) {
      id
      notes
      completed
      date
      habitId
    }
  }
`

export { HABITS_QUERY, ENTRIES_QUERY };