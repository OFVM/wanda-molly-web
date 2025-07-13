

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";

function ContactoPage() {
  return (
    <div className="contacto-page">
      <div style={{display:'flex', justifyContent:'flex-end', marginBottom:'12px'}}>
        <Link to="/">
          <button className="btn-contacto-header">Volver al inicio</button>
        </Link>
      </div>
      <h1 className="contacto-titulo">Contacto</h1>
      <div className="contacto-info">
        <div className="contacto-datos">
          <h2 style={{color: '#A12345'}}>Teléfono: <a href="tel:+56974992931" style={{color:'#A12345', textDecoration:'underline'}}>+56 9 7499 2931</a></h2>
          <h3>Contáctanos y encuentra lo mejor para tu compañero dachshund</h3>
          <div className="contacto-formulario-bloque">
            <div className="contacto-formulario">
              <h4>Formulario de contacto</h4>
              <p>Por favor, completa el formulario a continuación y te responderemos a la brevedad. Queremos conocer más sobre ti y asegurarnos de que encuentres lo mejor para tu compañero ideal de tu hogar.</p>
              <form>
                <input type="text" placeholder="Tu nombre" required />
                <input type="email" placeholder="Tu correo" required />
                <textarea placeholder="Tu mensaje"></textarea>
                <button type="submit">Enviar</button>
              </form>
            </div>
            <div className="contacto-mapa">
              <iframe title="San Ramón, Santiago de Chile" src="https://www.google.com/maps?q=San+Ramón,+Santiago,+Chile&output=embed" width="100%" height="250" style={{borderRadius:'12px', border:'2px solid #A12345'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
          <div className="contacto-directo">
            <p style={{marginTop: '32px', fontWeight:'bold'}}>o, si prefieres</p>
            <h4>Comunícate con Nosotros Directamente</h4>
            <p>Si prefieres una respuesta más rápida, puedes llamarnos o enviarnos un mensaje de <a href="https://wa.me/56974992931" target="_blank" rel="noopener noreferrer" style={{color:'#25D366', textDecoration:'underline'}}>WhatsApp</a>. Estamos disponibles para resolver todas tus dudas y ayudarte.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppMain() {
  // Lista de productos
  const productos = [
    {
      id: 1,
      nombre: "Collar Personalizado",
      precio: 9990,
      imagen: "producto1.jpg",
    },
    {
      id: 2,
      nombre: "Juguete de Peluche",
      precio: 5990,
      imagen: "producto2.jpg",
    },
    {
      id: 3,
      nombre: "Ropa de Invierno",
      precio: 14990,
      imagen: "producto3.jpg",
    },
  ];

  // Estado del carrito
  const [carrito, setCarrito] = useState([]);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };


  // Disminuir cantidad de un producto
  const disminuirCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  // Eliminar producto del carrito
  const eliminarProducto = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calcular total
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="app-container">
      <header className="header-centro" style={{width: '100%'}}>
        <div className="header-content">
          <img src="logo.png" alt="Logo Wanda & Molly" className="logo" />
          <p>Ropa, accesorios y juguetes para perros salchicha.</p>
        </div>
        <div className="header-btn" style={{position: 'absolute', top: 32, right: 32}}>
          <Link to="/contacto">
            <button className="btn-contacto-header" style={{padding: '7px 16px', fontSize: '0.98em'}}>Contáctanos</button>
          </Link>
        </div>
      </header>

      <main className="main-centro">
        <h2 className="titulo-productos">Nuestros Productos</h2>
        <section className="productos">
          {productos.map((producto) => (
            <div className="producto" key={producto.id}>
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>${producto.precio.toLocaleString()} CLP</p>
              <button onClick={() => agregarAlCarrito(producto)}>
                Agregar al carrito
              </button>
            </div>
          ))}
        </section>

        <section className="carrito">
          <h2>🛒 Carrito de Compras</h2>
          <ul>
            {carrito.length === 0 ? (
              <li>El carrito está vacío.</li>
            ) : (
              carrito.map((item) => (
                <li key={item.id}>
                  {item.nombre} x {item.cantidad} = $
                  {(item.precio * item.cantidad).toLocaleString()} CLP
                  <button style={{ marginLeft: 8 }} onClick={() => disminuirCantidad(item.id)}>-</button>
                  <button style={{ marginLeft: 8, color: '#fff', background: '#d06464', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }} onClick={() => eliminarProducto(item.id)}>Eliminar</button>
                </li>
              ))
            )}
          </ul>
          <p>
            <strong>Total: ${total.toLocaleString()} CLP</strong>
          </p>
          {carrito.length > 0 && (
            <div style={{ marginTop: 10, display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button style={{ background: '#A12345', color: '#fff', border: 'none', borderRadius: 5, padding: '8px 16px', cursor: 'pointer' }} onClick={vaciarCarrito}>
                Vaciar carrito
              </button>
              <button style={{ background: '#218838', color: '#fff', border: 'none', borderRadius: 5, padding: '8px 16px', cursor: 'pointer' }} onClick={() => alert('¡Gracias por tu compra!')}>Comprar</button>
            </div>
          )}
        </section>

        <section className="nuestro-emprendimiento">
          <h2>Nuestro Emprendimiento</h2>
          <p>
            Bienvenidos a Wanda & Molly, un espacio dedicado a los amantes de los dachshunds. Aquí encontrarás los mejores productos diseñados especialmente para ellos.
          </p>
        </section>

        <footer>
          <p>Síguenos en nuestras redes sociales:</p>
          <a href="#" aria-disabled="true">Instagram</a> | <a href="#" aria-disabled="true">Facebook</a>
        </footer>
      </main>
    </div>
  );
}


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppMain />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Routes>
    </Router>
  );
}
