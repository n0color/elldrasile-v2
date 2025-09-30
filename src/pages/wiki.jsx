import Footer from "../components/footer";
import Header from "../components/header";
import "../styles/note.scss";
import { useState, useEffect } from "react";


export default function Wiki() {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  useEffect(() => {
    try {
      const NoteData = localStorage.getItem("notedata");
      if (NoteData) {
        const parsedNotes = JSON.parse(NoteData);
        setNotes(parsedNotes)
      }
    } catch (error) {
      console.error('Ошибка загрузки блокнота:', error);
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const HandleAddNote = () => {
    const value = currentNote;
    if (!value) return;
    const newNote = { value, createdAt: Date.now() };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('notedata', JSON.stringify(updatedNotes));
    setCurrentNote("");
  }

  const HandleDeleteNote = (e) => {
    const oldNotes = notes;
    const updateNotes = oldNotes.filter((note) => note.createdAt !== e);
    setNotes(updateNotes);
    localStorage.setItem('notedata', JSON.stringify(updateNotes))
  }


  return (
    <>
      <Header />
      <div className="flex">
        <h2>Все заметки:</h2>
        {notes.length ? notes.map(m => (
              <div className="rows">
              <div key={m.createdAt} className="note">{m.value}</div>
              <button onClick={(e) => HandleDeleteNote(m.createdAt)} type="button">Удалить</button>
              </div>
            )): "Ещё нет заметок"}
      </div>
      <div className="flex">
        <label htmlFor="value">Новая заметка:</label>
        <textarea name="value" id="value" value={currentNote} onChange={e => setCurrentNote(e.target.value)}></textarea>
        <button onClick={HandleAddNote} type="button">Добавить заметку</button>
      </div>
      <Footer />
    </>
  )
}