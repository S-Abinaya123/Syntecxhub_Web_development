import { useState, useRef, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSave = () => {
    if (!text.trim()) return;

    if (editIndex !== null) {
      const updated = [...notes];
      updated[editIndex] = text;
      setNotes(updated);
      setEditIndex(null);
    } else {
      setNotes([...notes, text]);
    }

    setText("");
    inputRef.current.focus();
  };

  const handleEdit = (i) => {
    setText(notes[i]);
    setEditIndex(i);
    inputRef.current.focus();
  };

  const handleDelete = (i) => {
    setNotes(notes.filter((_, index) => index !== i));
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "40px auto",
        padding: "20px",
        background: "#f5f5f5",
        borderRadius: "10px",
        border: "1px solid #ccc",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Notes App</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Write a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #888",
          }}
        />
        <button
          onClick={handleSave}
          style={{
            padding: "10px 15px",
            border: "none",
            background: "#007bff",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {notes.map((note, index) => (
          <li
            key={index}
            style={{
              background: "white",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{note}</span>

            <div>
              <button
                onClick={() => handleEdit(index)}
                style={{
                  marginRight: "5px",
                  padding: "5px 10px",
                  border: "none",
                  background: "orange",
                  color: "white",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                style={{
                  padding: "5px 10px",
                  border: "none",
                  background: "red",
                  color: "white",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
