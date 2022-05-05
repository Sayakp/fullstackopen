import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  const exerciseSum = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={exerciseSum} />
    </>
  );
};

export default Course;
