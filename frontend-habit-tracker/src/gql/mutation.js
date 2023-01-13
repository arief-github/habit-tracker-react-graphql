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
`;

const UPDATE_HABIT_MUTATION = gql`
	  mutation UPDATE_HABIT_MUTATION($input: UpdateHabitInput) {
	    updateHabit(input: $input) {
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


export { CREATE_HABIT_MUTATION, DELETE_HABIT_MUTATION, UPDATE_HABIT_MUTATION };