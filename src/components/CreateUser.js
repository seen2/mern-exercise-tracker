import React, { useState } from "react";

export default function CreateUser() {
  const [userName, setUserName] = useState("");

  const onChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const onSUbmit = async (event) => {
    event.preventDefault();
    const newUser = { userName };
    const response = await fetch("http://localhost:5000/users/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const result = await response.json();
    console.log(result);
    setUserName("");
  };
  return (
    <div>
      <h3>Create new User</h3>
      <form onSubmit={onSUbmit}>
        <div className="form-group">
          <label>User Name:</label>
          <input
            type="text"
            className="form-control"
            required
            value={userName}
            onChange={onChangeUserName}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
