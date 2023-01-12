import { gql } from '@apollo/client';

const CREATE_HABIT_MUTATION = gql`
	mutation CREATE_HABIT_MUTATION($input: NewHabitInput) {
	    createHabit(input: $input) {
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
  }
`;

const DELETE_HABIT_MUTATION = gql` 
	mutation DELETE_HABIT($id: ID!) {
	    deleteHabit(id: $id) {
	      success
	    }
 	}

`

export { CREATE_HABIT_MUTATION, DELETE_HABIT_MUTATION };