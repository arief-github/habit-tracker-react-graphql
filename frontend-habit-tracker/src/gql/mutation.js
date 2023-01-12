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

export { CREATE_HABIT_MUTATION };