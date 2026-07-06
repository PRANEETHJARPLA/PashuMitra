import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import BrowseAnimals from './pages/BrowseAnimals';
import AnimalDetail from './pages/AnimalDetail';
import CreateAnimal from './pages/CreateAnimal';
import Signup from './pages/Signup';
import Login from './pages/Login';

function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-800 text-white px-6 py-4 flex gap-6 items-center">
      <Link to="/" className="font-bold text-lg">PashuMitra</Link>
      <Link to="/animals" className="hover:underline">Browse</Link>
      <Link to="/create" className="hover:underline">Sell an Animal</Link>

      <div className="ml-auto flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <button onClick={logout} className="hover:underline text-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<BrowseAnimals />} />
          <Route path="/animals" element={<BrowseAnimals />} />
          <Route path="/animals/:id" element={<AnimalDetail />} />
          <Route path="/create" element={<CreateAnimal />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
