import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { HABITS_QUERY } from '../../gql/query';
import { CREATE_HABIT_MUTATION } from '../../gql/mutation';

function AddHabit() {
	const [description, setDescription] = useState(null);
	const descriptionInput = useRef(null);
	const [createHabit, { error, loading }] = useMutation(CREATE_HABIT_MUTATION, {
		refetchQueries: [ { query: HABITS_QUERY } ],
	});

	const handleChange = () => {
		const { value } = descriptionInput.current;
		setDescription(value);
	}

		const onEnterPress = (e) => {
			if (e.keycode === 13 && description) {
				addHabit(e);
			}
		}

		const addHabit = (e) => {
			e.preventDefault();
			const input = { description };
			createHabit({ variables: { input } });
			descriptionInput.current.value = "";
			setDescription("");
		}

		return (
			<>
				{
					error && <p>Error! { error.message }</p>
				}
				<input 
					type="text"
					placeholder="Apa yang akan anda lakukan hari ini?"
					name="description"
					ref={descriptionInput}
					onChange={handleChange}
					onKeyDown={onEnterPress}
				/>
				<button
					type="button"
					disabled={!description || loading}
					onClick={addHabit}
					>
					Add { loading? "ing..." : "" }
				</button>
			</>
		)
}

export default AddHabit;