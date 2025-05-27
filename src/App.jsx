import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnitOfMeasureList from './components/UnitOfMeasureList';
import UnitOfMeasureForm from './components/UnitOfMeasureForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/units" element={<UnitOfMeasureList />} />
        <Route path="/units/new" element={<UnitOfMeasureForm />} />
        <Route path="/units/edit/:id" element={<UnitOfMeasureForm />} />
        <Route path="*" element={<UnitOfMeasureList />} />
      </Routes>
    </Router>
  );
}

export default App;
