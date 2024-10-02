import React, { useState } from 'react';
import './q.css'; // Import the CSS file


const QuestionTable = () => {
  const [answers, setAnswers] = useState({});

  const handleInputChange = (e, questionId) => {
    setAnswers({
      ...answers,
      [questionId]: e.target.value,
    });
  };

  const handleSend = (questionId) => {
    // Here you can implement the logic to send the answer
    console.log(`Sending answer for ${questionId}:`, answers[questionId]);
  };

  const data = [
    {
      name: "Steven Terry",
      question: "How to create a Landing page?",
      date: "19 AUGUST",
      answer: "To create a landing page, design a focused, visually appealing page with a clear call-to-action and relevant content to drive conversions",
    },
    {
      name: "Shreya",
      question: "How to develop a UI design?",
      date: "just now",
      answer: "",
    },
    {
      name: "Brian Fisher",
      question: "What's your go-to development tool?",
      date: "18 AUGUST",
      answer: "",
    },
    {
      name: "Molly Mills",
      question: "How do you optimize page load times?",
      date: "12 AUGUST",
      answer: "My go-to development tool is VS Code for its versatility and extensive extensions.",
    },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Questions</th>
          <th>Date</th>
          <th>Answers</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.question}</td>
            <td>{item.date}</td>
            <td>
              {item.answer ? (
                <>
                  {item.answer} <button onClick={() => handleSend(item.question)}>Send</button>
                </>
              ) : (
                <textarea
                  placeholder="Start typing your answer..."
                  value={answers[item.question] || ''}
                  onChange={(e) => handleInputChange(e, item.question)}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuestionTable;