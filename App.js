import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import DataTree from "./DataTree.js";
import EditorPanel from "./EditorPanel.js";
import DownloadButton from "./DownloadButton.js";
import UploadInput from "./UploadInput.js";
import SearchBox from "./SearchBox.js";

import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [selectedPath, setSelectedPath] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleDataChange = (newData) => setData(newData);

  const handleUpload = (uploadedData) => setData(uploadedData);

  const handleSearchResults = (results) => setSearchResults(results);

  return (
    <div className="app-container">
      <header>
        <h1>Veri Editör</h1>
        <button onClick={() => setDarkMode((prev) => !prev)}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      <UploadInput onUpload={handleUpload} />
      <SearchBox data={data} onResults={handleSearchResults} />

      <div className="main-layout">
        <div className="left-panel">
          <DataTree
            data={data}
            onPathSelect={setSelectedPath}
            selectedPath={selectedPath}
            onDataChange={handleDataChange}
          />
        </div>
        <div className="right-panel">
          <EditorPanel
            data={data}
            selectedPath={selectedPath}
            onDataChange={handleDataChange}
          />
          <DownloadButton data={data} />
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
