import React, { useEffect, useState } from 'react';

function ProductForm({ onSave, productToEdit, clearEdit }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price);
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ _id: productToEdit?._id, name, price });
    setName('');
    setPrice('');
    clearEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <h2>Nombre:</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="container">
        <h2>Precio:</h2>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">{productToEdit ? 'Actualizar' : 'Crear'}</button>
      {productToEdit && <button onClick={clearEdit}>Cancelar</button>}
    </form>
  );
}

export default ProductForm;
