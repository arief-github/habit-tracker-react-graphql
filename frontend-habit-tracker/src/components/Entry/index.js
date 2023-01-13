import React from 'react';
import { useMutation } from "@apollo/client";
import { ENTRIES_QUERY } from '../../gql/query';
import { DELETE_ENTRY_MUTATION } from '../../gql/mutation';

export default function Entry({ entry, lastEntry, showEntryForm }) {
	const [deleteEntry, { error, loading }] = useMutation(DELETE_ENTRY_MUTATION, {
		refetchQueries: [
			{ query: ENTRIES_QUERY, variables: { id: entry.habitId } }			
		],
		awaitRefetchQueries: true,
	})

	const date = new Date(entry.date).toLocaleDateString();
	const completed = entry.completed ? "✅" : "😑";

	return (
		<li key={entry.id} style={{ margin: " 5px 0 " , color: error ? "red":"black"}}>
			{
				error && (
					<>
						<span role="img" aria-label="warn-emoji">
							 ⚠
						</span>
					</>
				)
			}
			{`${date} : ${entry.notes} ${completed}`}
			<button
				type="button"
				className="emoji-button"
				alt="Delete Entry"
				disabled={loading}
				onClick={() => deleteEntry({ variables: { id: entry.id } })}
			>
				<span role="img" aria-label="trash can">
          			🗑
        		</span>
			</button>
			{
				lastEntry && (
					<button
						type="button"
						className="emoji-button"
						alt="Add new Entry"
						onClick={showEntryForm}
					>
						<span role="img" aria-label="plus">
            				➕
          				</span>	
					</button>
				)
			}
		</li>
	)
}