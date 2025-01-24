import { useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
  const [mode, setMode] = useState("light");

  return (
    <main className={"main " + mode}>
      <div className="container">
        <Header setMode={setMode} />
        <TodoList />
        <footer className="container__footer">
          <p className="footer__text">Drag and drop to reorder list</p>
        </footer>
      </div>
    </main>
  );
}

export default App;
