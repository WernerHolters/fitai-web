import { useEffect, useState } from 'react';
import { getAllUnits, deleteUnit } from '../Services/unitOfMeasureService';
import { Link } from 'react-router-dom';

export default function UnitOfMeasureList() {
  const [units, setUnits] = useState([]);

  const loadData = async () => {
    const response = await getAllUnits();
    setUnits(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que quieres eliminar esta unidad?')) {
      await deleteUnit(id);
      loadData();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Units of Measure</h2>
      <Link to="/units/new" className="btn btn-primary mb-2">Add New</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Abbreviation</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.abbreviation}</td>
              <td>{u.description}</td>
              <td>
                <Link to={`/units/edit/${u.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
