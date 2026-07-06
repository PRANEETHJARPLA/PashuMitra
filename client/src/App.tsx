import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BrowseAnimals from './pages/BrowseAnimals';
import AnimalDetail from './pages/AnimalDetail';
import CreateAnimal from './pages/CreateAnimal';

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-green-800 text-white px-6 py-4 flex gap-6">
        <Link to="/" className="font-bold text-lg">PashuMitra</Link>
        <Link to="/animals" className="hover:underline">Browse</Link>
        <Link to="/create" className="hover:underline">Sell an Animal</Link>
      </nav>

      <Routes>
        <Route path="/" element={<BrowseAnimals />} />
        <Route path="/animals" element={<BrowseAnimals />} />
        <Route path="/animals/:id" element={<AnimalDetail />} />
        <Route path="/create" element={<CreateAnimal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
