import React, { useState } from "react";
import InputNotes from "./Components/InputNotes";
import NotesCard from "./Components/NotesCard";
import SearchNotes from "./Components/SearchNotes";
import uuid from "react-uuid";
import { Divider, Row, Col } from "antd";
import { getInitialData } from "./Utils/index";
import moment from "moment/moment";

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createdAt] = useState(moment().format("ddd D MMM YYYY"));
  const [savedNotes, setSavedNotes] = useState(getInitialData());
  const [savedNotesSearch, setSavedNotesSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [archivedNotes, setArchivedNotes] = useState([]);

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  const handleContentChange = (newContent) => {
    setBody(newContent);
  };

  const handleSave = () => {
    setSavedNotes([
      ...savedNotes,
      {
        id: uuid(),
        title: title,
        body: body,
        createdAt: createdAt,
        archived: false,
      },
    ]);
    setTitle("");
    setBody("");
  };

  const handleDelete = (id) => {
    if (savedNotes) {
      const updatedNotes = savedNotes.filter((note) => note.id !== id);
      setSavedNotes(updatedNotes);
    }
    if (archivedNotes) {
      const updatedNotes = archivedNotes.filter((note) => note.id !== id);
      setArchivedNotes(updatedNotes);
    }
    if (savedNotesSearch) {
      const updatedNotes = savedNotesSearch.filter((note) => note.id !== id);
      setSavedNotesSearch(updatedNotes);
    }
  };

  const handleArchive = (id) => {
    if (savedNotes.length !== 0) {
      const updatedNotes = savedNotes.map((note) =>
        note.id === id ? { ...note, archived: true } : note
      );
      const noteToArchive = updatedNotes.find((note) => note.id === id);

      setArchivedNotes([...archivedNotes, noteToArchive]);
      setSavedNotes(updatedNotes.filter((note) => note.id !== id));
    }
    if (savedNotesSearch.length !== 0) {
      const updatedNotes = savedNotesSearch.map((note) =>
        note.id === id ? { ...note, archived: true } : note
      );
      const noteToArchive = updatedNotes.find((note) => note.id === id);

      setArchivedNotes([...archivedNotes, noteToArchive]);
      setSavedNotesSearch(updatedNotes.filter((note) => note.id !== id));
    }
  };

  const handleSearch = () => {
    const searchResult = savedNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSavedNotesSearch(searchResult);
  };

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  return (
    <>
      <Divider>
        <h1 style={{ textAlign: "center" }}>MY NOTES</h1>
      </Divider>

      <Row gutter={24} style={{ padding: 30 }}>
        <Col span={8} style={{ margin: "auto", width: 50 }}>
          <SearchNotes onSearch={handleSearch} setSearchTerm={setSearchTerm} />
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8} style={{ margin: "auto", width: 50 }}>
          <InputNotes
            inputTitle={title}
            inputContent={body}
            onTitleChange={handleTitleChange}
            onContentChange={handleContentChange}
            onSave={handleSave}
          />
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          {savedNotes.length === 0 ? (
            <h2 style={{ textAlign: "center" }}>Tidak ada catatan</h2>
          ) : (
            chunkArray(
              savedNotesSearch.length ? savedNotesSearch : savedNotes,
              3
            ).map((row, rowIndex) => (
              <Row gutter={24} key={rowIndex} justify="center" align="middle">
                {row.map((note, colIndex) => (
                  <Col span={6} key={colIndex}>
                    <NotesCard
                      id={note.id}
                      inputTitle={note.title}
                      inputCreatedAt={note.createdAt}
                      inputContent={note.body}
                      onDelete={handleDelete}
                      onArchive={handleArchive}
                    />
                  </Col>
                ))}
              </Row>
            ))
          )}
        </Col>
      </Row>

      <Row style={{ display: archivedNotes.length === 0 ? "none" : "block" }}>
        <Divider>
          <h3 style={{ textAlign: "start" }}>ARCHIVE</h3>
        </Divider>
        {chunkArray(archivedNotes, 3).map((row, rowIndex) => (
          <Row gutter={24} key={rowIndex} justify="center" align="middle">
            {row.map((archive) => (
              <Col span={6} key={archive.id}>
                <NotesCard
                  id={archive.id}
                  inputTitle={archive.title}
                  inputCreatedAt={archive.createdAt}
                  inputContent={archive.body}
                  onDelete={handleDelete}
                  archived={archivedNotes}
                />
              </Col>
            ))}
          </Row>
        ))}
      </Row>
    </>
  );
}

export default App;
