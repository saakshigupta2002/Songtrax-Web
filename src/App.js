import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import ListSamples from './components/ListSamples';
import ShareSamples from './components/ShareSamples';
import EditSample from './components/EditSample';
import { useState } from 'react';

function App() {
  const [editSongId, setEditSongId] = useState(null)

  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route path="/" element={<ListSamples setEditSongId={setEditSongId} />} />
          <Route path="/share-samples" element={<ShareSamples />} />
          <Route path="/edit-sample" element={<EditSample />} />

        </Routes>

        <footer className="page-footer"></footer>
      </div>
    </Router>
  );
}

export default App;
