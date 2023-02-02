import React, { useState, useEffect } from 'react'
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPosts());
    }, [getPosts]);
  
  return (
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
  )
}

export default Home