import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Execise = (props) => (
  <tr>
    <td>{props.exercise.userName}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={`/edit/${props.exercise._id}`}>Edit</Link> |{" "}
      <a href="#" onClick={() => props.deleteExercise(props.exercise._id)}>
        Delete
      </a>
    </td>
  </tr>
);

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/exercises/");
        const data = await response.json();
        setExercises(await data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const deleteExercise = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/exercises/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setExercises(exercises.filter((exercise) => exercise._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>User Name</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <Execise
              exercise={exercise}
              deleteExercise={deleteExercise}
              key={exercise._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
