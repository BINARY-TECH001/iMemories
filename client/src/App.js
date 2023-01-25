import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [getPosts]);

  return (
    <div className="App">
      <Navbar />

      <div className="page">
        <Posts
          setCurrentId={setCurrentId}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
        />
        <Form
          currentId={currentId}
          setCurrentId={setCurrentId}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
        />
      </div>
    </div>
  );
}

export default App;
