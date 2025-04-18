import { useState } from "react";
import Search from "../components/Search";

function App() {
  const [SearchTerm, setSearchTerm] = useState("");
  return (
    <>
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <header className="">
            <h1>
              <img src="/hero.png" alt="" />
              Find <span className="text-gradient">Movies</span> that you'll
              enjoy without the hassle
            </h1>
          </header>
          <Search SearchTerm={SearchTerm} setSearchTerm={setSearchTerm} />
          <h1 className="text-white text-sm"> {SearchTerm} </h1>
        </div>
      </main>
    </>
  );
}

export default App;
