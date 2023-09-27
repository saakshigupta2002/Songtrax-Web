import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import CreateSample from './components/CreateSample';
import ListSamples from './components/ListSamples';
import ShareSamples from './components/ShareSamples';
import EditSample from './components/EditSample';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route path="/" element={<ListSamples />} />
          <Route path="/create-sample" element={<CreateSample />} />
          <Route path="/share-samples" element={<ShareSamples />} />
          <Route path="/edit-sample" element={<EditSample />} />

        </Routes>

        <footer class="page-footer"></footer>
      </div>
    </Router>
  );
}

export default App;
