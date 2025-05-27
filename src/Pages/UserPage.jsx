import React, { useEffect, useState } from 'react';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from '../services/UserService';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    paternalLastName: '',
    maternalLastName: '',
    phone: '',
    email: '',
    gender: '',
    birthDate: '',
    image: '',
    mealPlanId: '',
    workoutPlanId: '',
  });
  const [editingId, setEditingId] = useState(null);

  const loadUsers = () => {
    getAllUsers().then(setUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir a número los IDs si están presentes
    const payload = {
      ...formData,
      mealPlanId: formData.mealPlanId ? parseInt(formData.mealPlanId) : null,
      workoutPlanId: formData.workoutPlanId ? parseInt(formData.workoutPlanId) : null,
    };

    if (editingId) {
      await updateUser(editingId, payload);
    } else {
      await createUser(payload);
    }

    // Resetear el formulario completamente
    setFormData({
      name: '',
      paternalLastName: '',
      maternalLastName: '',
      phone: '',
      email: '',
      gender: '',
      birthDate: '',
      image: '',
      mealPlanId: '',
      workoutPlanId: '',
    });

    setEditingId(null);
    loadUsers();
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name || '',
      paternalLastName: user.paternalLastName || '',
      maternalLastName: user.maternalLastName || '',
      phone: user.phone || '',
      email: user.email || '',
      gender: user.gender || '',
      birthDate: user.birthDate || '',
      image: user.image || '',
      mealPlanId: user.mealPlanId || '',
      workoutPlanId: user.workoutPlanId || '',
    });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Administrar Usuarios</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input placeholder="Apellido Paterno" value={formData.paternalLastName} onChange={(e) => setFormData({ ...formData, paternalLastName: e.target.value })} />
        <input placeholder="Apellido Materno" value={formData.maternalLastName} onChange={(e) => setFormData({ ...formData, maternalLastName: e.target.value })} />
        <input placeholder="Teléfono" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        <input placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input placeholder="Género" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
        <input type="date" value={formData.birthDate} onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })} />
        <input placeholder="URL de imagen" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
        <input type="number" placeholder="ID Plan de Comida" value={formData.mealPlanId} onChange={(e) => setFormData({ ...formData, mealPlanId: e.target.value })} />
        <input type="number" placeholder="ID Plan de Entrenamiento" value={formData.workoutPlanId} onChange={(e) => setFormData({ ...formData, workoutPlanId: e.target.value })} />
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
      </form>
      <hr />
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name} {user.paternalLastName}</strong> - {user.email}
            <br />
            Comida #{user.mealPlanId}, Entrenamiento #{user.workoutPlanId}
            <br />
            <img src={user.image} alt="User" width="100" style={{ marginTop: 8 }} />
            <br />
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
