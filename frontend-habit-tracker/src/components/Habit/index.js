import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_HABIT_MUTATION } from '../../gql/mutation';
import { HABITS_QUERY } from '../../gql/query';

import EditHabit from '../EditHabit'

function Habit({ habit }) {
	const [showEditForm, setShowEditForm] = useState(false);
	const [deleteHabit, { error, loading }] = useMutation(DELETE_HABIT_MUTATION, {
		refetchQueries: [{ query: HABITS_QUERY }],
		awaitRefetchQueries: true,
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
			   {
			   	!showEditForm ? (
			   		<>
			   			{habit.description} ({habit.points} points)
			   			<button
			   				className="emoji-button"
			   				type="button"
			   				onClick={() => setShowEditForm(true)}
			   				alt="Edit Habit"
			   			>
			   				<span role="img" aria-label="pencil emoji">
			   					✏
			   				</span>
			   			</button>
			   			<button
							type="button"
							onClick={() => deleteHabit({ variables: { id: habit.id } })}
							disabled={loading}
						>
						Delete
						</button> 
			   		</>
			   		
			   	) : (
			   		<EditHabit habit={habit} onEditSuccess={() => setShowEditForm(false)}/>
			   	)
			   }
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