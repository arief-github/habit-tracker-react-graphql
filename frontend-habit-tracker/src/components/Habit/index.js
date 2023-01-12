import React from 'react';
import {useMutation} from '@apollo/client';
import { DELETE_HABIT_MUTATION } from '../../gql/mutation';
import { HABITS_QUERY } from '../../gql/query';

function Habit({ habit }) {
	const [deleteHabit, { error, loading }] = useMutation(DELETE_HABIT_MUTATION, {
		refetchQueries: [{ query: HABITS_QUERY }]
	});

	return (
		<li style={{ color: error ? 'red' : 'black' }}>
			   {error && (
			        <>
			          <span role="img" aria-label="warn emoji">
			            ⚠
			          </span>{" "}
			        </>
			      )}
			{ ` ${habit.description} ${habit.points} points` }
			<button
				type="button"
				onClick={() => deleteHabit({ variables: { id: habit.id } })}
				disabled={loading}
			>
				Delete
			</button>
			<ul>
				{
					habit.entries && 
						habit.entries.map((entry) => {
							const date = new Date(entry.date).toLocaleDateString();
							const completed = entry.completed ?  "✅" : "😑";
							return (
								<li key={entry.id}>{`${date}: ${entry.notes} ${completed}`}</li>
							)
						})
				}
			</ul>
		</li>
	)
}

export default Habit;