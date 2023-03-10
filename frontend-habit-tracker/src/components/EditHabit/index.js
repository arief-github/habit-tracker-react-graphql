import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { HABITS_QUERY } from '../../gql/query';
import { UPDATE_HABIT_MUTATION } from '../../gql/mutation';

function EditHabit({ habit, onEditSuccess }) {
	const [description, setDescription] = useState(habit.description);
	const descriptionInput = useRef(null);

	const [updateHabit, { error, loading }] = useMutation(UPDATE_HABIT_MUTATION, {
		refetchQueries: [{ query: HABITS_QUERY }],
		awaitRefetchQueries: true,
	})

	const handleChange = () => {
		const { value } = descriptionInput.current;
		setDescription(value);
	}

	const editHabit = (e) => {
		e.preventDefault();

		if(habit.description === description) {
			onEditSuccess();
			return;
		}

		const input = { id: habit.id, description };
		updateHabit({ variables: { input } })
	}

	return (
		<form onSubmit={editHabit}>
		      <input
		        type="text"
		        defaultValue={description}
		        style={{ width: "200px" }}
		        name="description"
		        ref={descriptionInput}
		        onChange={handleChange}
		      />
		      <button
		        type="button"
		        className="red-button"
		        onClick={onEditSuccess}
		        disabled={loading}
		      >
		        Cancel
		      </button>
		      <button
		        type="submit"
		        className="blue-button"
		        disabled={!description || loading}
		      >
		        Sav{loading ? "ing..." : "e"}
		      </button>
		      {error && <p>{error.message}</p>}
    </form>
	)
}

export default EditHabit;