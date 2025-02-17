import React, { useState, useEffect } from "react";

import ThoughtForm from "./components/ThoughtsForm";
import ThoughtList from "./components/ThoughtList";

import { API_URL, LIKES_URL } from "./reusable/urls";
import { Loading } from "./components/Loading";

export const App = () => {
  const [thoughtList, setThoughtList] = useState([]);
  const [thoughtNew, setThoughtNew] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThoughtList();
  }, []);

  //Fetching the API data
  const fetchThoughtList = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((thoughts) => {
        setLoading(false);
        setThoughtList(thoughts);
      })
      .catch((err) => console.error(err));
  };

  //Update the form input value onChange
  const handleThoughtNewChange = (event) => {
    setThoughtNew(event.target.value);
  };

  //Form submitted
  const handleFormSubmit = (event) => {
    event.preventDefault("");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: thoughtNew }),
    };
    //Sending POST request
    fetch(API_URL, options)
      .then((res) => res.json())
      .then(() => fetchThoughtList())
      .catch((err) => console.error(err));

    setThoughtNew("");
  };

  //POST request, when like button is clicked
  const handleLikesIncrease = (id) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(LIKES_URL(id), options)
      .then((res) => res.json())
      .then(() => {
        fetchThoughtList();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="main">
      <ThoughtForm
        thoughtNew={thoughtNew}
        onFormSubmit={handleFormSubmit}
        onThoughtNewChange={handleThoughtNewChange}
      />
      {loading && <Loading />}
      <ThoughtList
        thoughtList={thoughtList}
        handleLikesIncrease={handleLikesIncrease}
      />
    </div>
  );
};
