// src/App.jsx
import { useState } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NotesquicImg from './Notesquic.png';
import Navbar from './componentes/Navbar';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editNote, setEditNote] = useState('');
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [startDate, setStartDate] = useState(new Date()); // Estado para la fecha del DatePicker

  const addNote = () => {
    if (newNote.trim() && selectedCategory.trim()) {
      const newNoteWithCategory = { text: newNote, category: selectedCategory, date: startDate };
      setNotes([...notes, newNoteWithCategory]);
      setNewNote('');
      setSelectedCategory('');
      setStartDate(new Date()); // Reinicia la fecha después de agregar la nota
    }
  };

  const editExistingNote = (index) => {
    const updatedNotes = notes.map((note, i) => 
      i === index ? { ...note, text: editNote } : note
    );
    setNotes(updatedNotes);
    setEditIndex(null);
    setEditNote('');
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const archiveNote = (index) => {
    const noteToArchive = notes[index];
    setArchivedNotes([...archivedNotes, noteToArchive]);
    deleteNote(index);
  };

  const unarchiveNote = (index) => {
    const noteToUnarchive = archivedNotes[index];
    setNotes([...notes, noteToUnarchive]);
    setArchivedNotes(archivedNotes.filter((_, i) => i !== index));
  };

  const addCategory = (category) => {
    if (category.trim() && !categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const filteredNotes = filterCategory
    ? notes.filter(note => note.category === filterCategory)
    : notes;

  return (
    <>
      <Navbar /> {/* Navbar añadida aquí */}
      <main>
        <section id="inicio">
          <div style={{ textAlign: 'center' }}>
            <img src={NotesquicImg} alt="Notesquic" style={{ width: '150px', marginBottom: '1rem' }} />
          </div>
          <h2 className="title">Mis Notas</h2>
          <p className="page-description">Esta aplicación te permite gestionar tus notas de manera sencilla. Puedes agregar, editar, eliminar, categorizar y archivar notas según tus necesidades.</p>
          <div className="notes-section">
            <div className="category-input-container">
              <input
                type="text"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                placeholder="Categoría"
                className="category-input"
              />
              <button onClick={() => addCategory(selectedCategory)} className="add-category-button">Agregar Categoría</button>
            </div>

            <div className="note-input-container">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Escribe tu nota aquí"
                className="note-input"
              />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)} 
                className="category-select"
              >
                <option value="">Seleccionar Categoría</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="date-picker-container">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                className="date-picker"
              />
            </div>

            <button onClick={addNote} className="add-note-button">Agregar Nota</button>

            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)} 
              className="filter-select"
            >
              <option value="">Seleccionar Categoría</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>

            <ul className="notes-list">
              {filteredNotes.map((note, index) => (
                <li key={index} className="note-item">
                  <p>La categoría seleccionada fue: <span className="note-category">{note.category}</span></p>
                  <p>La nota es: {note.text}</p>
                  <p>Fecha: {note.date.toLocaleDateString()}</p>
                  {editIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                      />
                      <button onClick={() => editExistingNote(index)}>Guardar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => {
                        setEditIndex(index);
                        setEditNote(note.text);
                      }}>Editar</button>
                      <button onClick={() => deleteNote(index)}>Eliminar</button>
                      <button onClick={() => archiveNote(index)}>Archivar</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <h2>Notas Archivadas</h2>
            <ul className="notes-list">
              {archivedNotes.map((note, index) => (
                <li key={index} className="note-item">
                  <p>La categoría seleccionada fue: <span className="note-category">{note.category}</span></p>
                  <p>La nota es: {note.text}</p>
                  <p>Fecha: {note.date.toLocaleDateString()}</p>
                  <button onClick={() => unarchiveNote(index)}>Desarchivar</button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
