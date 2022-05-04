import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { anecdote: "If it hurts, do it more often", score: 0 },
    {
      anecdote: "Adding manpower to a late software project makes it later!",
      score: 0,
    },
    {
      anecdote:
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      score: 0,
    },
    {
      anecdote:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      score: 0,
    },
    { anecdote: "Premature optimization is the root of all evil.", score: 0 },
    {
      anecdote:
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      score: 0,
    },
    {
      anecdote:
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
      score: 0,
    },
  ]);
  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(0);

  const handleNext = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVote = () => {
    const tempCopy = [...anecdotes];
    tempCopy[selected].score += 1;
    setAnecdotes(tempCopy);
    if (anecdotes[selected].score > anecdotes[mostVoted].score)
      setMostVoted(selected);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected].anecdote}</div>
      <div>has {anecdotes[selected].score} votes</div>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNext} text="next anecdote" />
      <div>
        <h2>Anecdote with most votes</h2>
        <div>{anecdotes[mostVoted].anecdote}</div>
        <div>has {anecdotes[mostVoted].score} votes</div>
      </div>
    </div>
  );
};

export default App;
