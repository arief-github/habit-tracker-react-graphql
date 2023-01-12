import React from "react";
import { useQuery } from "@apollo/client";
import "./App.css";

import Habit from "./components/Habit";
import AddHabit from './components/AddHabit';

import { HABITS_QUERY } from './gql/query';

function App() {
  const { data, loading, error } = useQuery(HABITS_QUERY);

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error...</p>

  const { habits, totalPoints } = data;

  const entryString =
    totalPoints.totalCompletedEntries.length > 1 ? "entries" : "entry";

  return (
    <div className="container">
      <div>
        <h2 className="bottom-margin">
          Habits{" "}
          <span role="img" aria-label="muscle emoji">
            💪
          </span>
        </h2>
        <p>
          Total Points: {totalPoints.points} (
          {totalPoints.totalCompletedEntries} {entryString})
        </p>
        <AddHabit/>
      </div>
      <ul className="habit-list">
        {habits.map((habit) => {
          return <Habit key={habit.id} habit={habit} />;
        })}
      </ul>
    </div>
  );
}

export default App;