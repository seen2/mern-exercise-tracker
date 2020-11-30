import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditExercise(props) {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const onChangeUserName = (event) => {
    setUserName(event.target.value);
  };
  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const onChangeDuration = (event) => {
    setDuration(event.target.value);
  };
  const onChangeDate = (date) => {
    setDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(props);
        const res = await fetch(
          `http://localhost:5000/exercises/${props.match.params.id}`
        );
        const exc = await res.json();
        setUserName(exc.userName);
        setDescription(exc.description);
        setDuration(exc.duration);
        setDate(new Date(exc.date));
        const response = await fetch("http://localhost:5000/users/");
        const data = await response.json();
        if (data.length) {
          setUsers(data.map((user) => user.userName));
          setUserName(data[0].userName);
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const onSUbmit = async (event) => {
    try {
      event.preventDefault();
      const exercise = { userName, description, duration, date };
      const response = await fetch(
        `http://localhost:5000/exercises/update/${props.match.params.id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(exercise),
        }
      );
      const result = await response.json();
      console.log(result);

      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Edit Excercise Log</h3>
      <form onSubmit={onSUbmit}>
        <div className="form-group">
          <label>UserName:</label>
          <select
            required
            className="form-control"
            value={userName}
            onChange={onChangeUserName}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes):</label>
          <input
            type="text"
            required
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <DatePicker required selected={date} onChange={onChangeDate} />
        </div>
        <div className="form-group">
          <input type="submit" value="Save" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}
