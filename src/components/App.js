import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionList, setQuestionlist] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestionlist(questions));
  }, []);

  function handleNewQuestion(newQuestion) {
    setQuestionlist([...questionList, newQuestion]);
   }

   function handleDeleteQuestion(id) {
      const updatedQuestionList = questionList.filter((question) => question.id !== id);
      setQuestionlist(updatedQuestionList);
   }

  return (
    <main>
      <AdminNavBar className="top-buttons" onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestion={handleNewQuestion} /> : <QuestionList questions={questionList} onDeleteQuestion={handleDeleteQuestion}/>}
    </main>
  );
}

export default App;
