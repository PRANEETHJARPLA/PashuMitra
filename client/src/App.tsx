import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import BrowseAnimals from './pages/BrowseAnimals';
import AnimalDetail from './pages/AnimalDetail';
import CreateAnimal from './pages/CreateAnimal';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyListings from './pages/MyListings';
import EditAnimal from './pages/EditAnimal';
import SchemeFinder from './pages/SchemeFinder';

function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-800 text-white px-6 py-4 flex gap-6 items-center flex-wrap">
      <Link to="/" className="font-bold text-lg">PashuMitra</Link>
      <Link to="/animals" className="hover:underline">Browse</Link>
      <Link to="/create" className="hover:underline">Sell an Animal</Link>
      <Link to="/schemes" className="hover:underline">Govt Schemes</Link>
      {user && (
        <Link to="/my-listings" className="hover:underline">My Listings</Link>
      )}

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
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/edit/:id" element={<EditAnimal />} />
          <Route path="/schemes" element={<SchemeFinder />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
