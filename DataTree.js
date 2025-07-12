import React from "react";

function DataTree({ data, onPathSelect, selectedPath, onDataChange }) {
  const renderTree = (node, path = []) => {
    if (typeof node !== "object" || node === null) return null;

    return Object.entries(node).map(([key, child]) => {
      const newPath = [...path, key];
      const isSelected = JSON.stringify(selectedPath) === JSON.stringify(newPath);

      return (
        <li key={key}>
          <span
            className={`clickable ${isSelected ? "selected" : ""}`}
            onClick={() => onPathSelect(newPath)}
            title="Seçmek için tıklayın"
          >
            {key}
          </span>
          <button
            className="small-btn"
            onClick={() => {
              const confirmed = window.confirm("Bu öğeyi silmek istediğinizden emin misiniz?");
              if (!confirmed) return;

              const updated = { ...data };
              let ref = updated;
              for (let i = 0; i < newPath.length - 1; i++) {
                ref = ref[newPath[i]];
              }
              delete ref[newPath[newPath.length - 1]];
              onDataChange(updated);
              if (isSelected) onPathSelect([]);
            }}
            title="Bu öğeyi sil"
          >
            ✖
          </button>
          {typeof child === "object" && renderTree(child, newPath)}
        </li>
      );
    });
  };

  return (
    <div className="card">
      <h3>Veri Yapısı</h3>
      <ul>{renderTree(data)}</ul>
    </div>
  );
}

export default DataTree;
