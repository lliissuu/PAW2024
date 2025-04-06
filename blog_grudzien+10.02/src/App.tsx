import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostsList from "./components/PostsList";
import PostDetails from "./components/PostDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
