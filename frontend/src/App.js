import React, { useEffect, useState } from 'react';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from './api';
import ProductForm from './components/ProductForm';
import './styles.css';


function App() {
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSave = async (product) => {
        try {
            if (product._id) {
                await updateProduct(product._id, product);
                alert('Producto actualizado');
            } else {
                await createProduct(product);
                alert('Producto creado');
            }
            fetchProducts(); // Recargar productos
        } catch (error) {
            console.error('Error al guardar producto:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Seguro que querés borrar este producto?')) {
            try {
                await deleteProduct(id);
                alert('Producto eliminado');
                fetchProducts();
            } catch (error) {
                console.error('Error al eliminar producto:', error);
            }
        }
    };

    return (
        <div>
            <h1>CRUD de Productos</h1>
            <ProductForm
                onSave={handleSave}
                productToEdit={productToEdit}
                clearEdit={() => setProductToEdit(null)}
            />

            <h1>Lista de productos</h1>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product._id} className="product-item">
                        <div className="product-info">
                            <h4>{product.name}</h4>
                            <p><strong>Precio:</strong> ${product.price}</p>
                        </div>
                        <div className="product-actions">
                            <button className="edit-btn" onClick={() => setProductToEdit(product)}>
                                Editar
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                                Borrar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default App;
