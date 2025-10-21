"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';


// No need to register modules globally with Swiper v8+


const indigoDark = '#2E0854';
const blueDeep = '#001F3F';
const black = '#181A1B';
const blue = '#001631';

const plans = [
  { duration: '3 meses', price: '$29.990', description: 'Ideal para iniciar tu transformación digital.' },
  { duration: '6 meses', price: '$48.990', description: 'Optimización continua y ahorro en tu operación.' },
  { duration: '12 meses', price: '$89.990', description: 'Solución completa y soporte premium para todo el año.' }
];


const images = [
  '/IMG_0237.PNG',
  '/IMG_0241.PNG',
  '/IMG_0238.PNG',
  '/IMG_0233.PNG'
];

export default function LandingPage() {

  const [modalImg, setModalImg] = useState<string | null>(null);

  
  return (
    <main style={{ background: `linear-gradient(180deg, ${indigoDark} 0%, ${blueDeep} 100%)`, color: 'white', minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: black, padding: '10px 40px 0px 40px', boxShadow: '0 2px 12px rgba(30,0,70,0.35)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img  src={'/logo.png'} alt="Logo OrdenesYa" width={86} height={86} style={{ borderRadius: 14, boxShadow: '0 0 12px #0003' }} />
          <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, color: 'white',
                         padding: '4px 8px', borderRadius: '6px', transition: 'background .2s',
           }}>OrdenesYa App</span>
        </div>
        <div style={{ display: 'flex', gap: 30 }}>
          <a href="#descripcion" style={menuLinkStyle}>Descripción</a>
          <a href="#suscripcion" style={menuLinkStyle}>Suscripción</a>
            <a href="/visor" style={menuLinkStyle}>Visor</a>
          <a href="#contacto" style={menuLinkStyle}>Contáctanos</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '60px 0 32px 0', background: `linear-gradient(90deg, ${indigoDark}, ${blueDeep})`, boxShadow: '0 4px 40px #0005' }}>
     
        <h1 style={{ fontSize: 35, fontWeight: 800, marginBottom: 24, background: 'linear-gradient(90deg,#3F0071,#2E0854,#001F3F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'white' }}>
          Revoluciona tu restaurante con OrdenesYa App
        </h1>
        <p style={{ fontSize: 20, maxWidth: 650, margin: '0 auto', color: '#f6f6f6', fontWeight: 400 }}>
          App pensada para la realización y gestión eficiente de órdenes internas de un local de comida. Un carrito intuitivo, alternancia dinámica de estados clave (<b>Nueva</b>, <b>Preparación</b>, <b>Lista</b>, <b>Entregada</b>, <b>Cancelada</b>), visibilidad total y control en tiempo real. Diseño fluido para equipos modernos que buscan precisión, velocidad y confiabilidad.
        </p>
      </section>

{/* Beneficios / Imágenes con slider horizontal */}
<section
  id="descripcion"
  style={{
    background: '#1e357a', //indigoDark,
    padding: '40px 10vw 40px 10vw',
  }}
>
<div style={{
    display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: 1200,
  margin: '0px auto',
  padding: '20px 20px',
  background: `linear-gradient(90deg, ${blue}, ${blueDeep})`,          // Indigo oscuro profundo
  borderRadius: 16,
  boxShadow: '0 8px 20px rgba(46, 8, 84, 0.6)', // sombra atmósferica índigo
  color: '#e0e0e0'
}}>
  <h2 style={{
    fontWeight: 700,
    fontSize: 32,
    marginTop: 0,
    color: '#e0e0e0',
    flexBasis: '50%',
    textAlign: 'center',
  }}>
    ¿ Por qué OrdenesYa App ?  
  </h2>

  <ul style={{
    fontSize: 18,
    lineHeight: '2.1',
     fontWeight: 'bold',
    color: '#e0e0e0',
    paddingLeft: 0,
    maxWidth: 700,
    listStyleType: 'disc',

    margin: 0,
  }}>
    <li>Carrito de ítems intuitivo y veloz.</li>
    <li>Organización dinámica por estado de orden.</li>
    <li>Control y visibilidad de pedidos en tiempo real.</li>
    <li>Optimización del trabajo en equipo y comunicación interna.</li>
    <li>Flujo de trabajo visual, ágil y confiable.</li>
  </ul>
</div>


     {/* Swiper horizontal */}
     <div style={{
  background: `linear-gradient(90deg, ${blue}, ${blueDeep})`,   
  borderRadius: 24,
  padding: 20,
  maxWidth: 1200,
  margin: '20px auto',
  boxShadow: '0 12px 28px rgba(46, 8, 84, 0.6)',
}}>
  <Swiper
    navigation={true}
    pagination={{ clickable: true }}
    spaceBetween={24}
    slidesPerView={1}
    breakpoints={{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    style={{ maxWidth: '100%', paddingBottom: 20, paddingTop: 20 }}
  >
    {images.map((src, index) => (
      <SwiperSlide key={index}>
        <img
          src={src}
          alt={`Ejemplo ${index + 1}`}
          style={{
            width: '100%',
            borderRadius: 16,
            border: '3px solid #3F0071',
            boxShadow: '0 2px 12px #181A1B77',
            objectFit: 'cover',
            height: 380,
            cursor: 'pointer',
          }}
          onClick={() => setModalImg(src)} // Asegúrate de manejar setModalImg en el contexto
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

</section>
 {/* Modal para imagen grande */}
      {modalImg && (
        <div onClick={() => setModalImg(null)} style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          cursor: 'pointer',
        }}>
          <img
            src={modalImg}
            alt="Imagen ampliada"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: 24,
              boxShadow: '0 0 30px #fff',
            }}
            onClick={(e) => e.stopPropagation()} // Evitar cierre modal si clic en imagen
          />
        </div>
      )}

      {/* Suscripción */}
      <section id="suscripcion" style={{
        background: `linear-gradient(90deg, ${blueDeep} 60%, ${indigoDark})`,
        color: 'white',
        padding: '56px 10vw 60px 10vw',
        borderRadius: '0 0 60px 60px',
        boxShadow: '0 2px 24px #0006',
        marginBottom: 48,
      }}>
        <h2 style={{ fontWeight: 700, fontSize: 32, marginBottom: 30 }}>Planes de suscripción</h2>
        <div style={{ display: 'flex', gap: 38, flexWrap: 'wrap', justifyContent: 'center' }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{
              background: `linear-gradient(180deg, #3F0071 0%, ${indigoDark} 100%)`,
              boxShadow: '0 4px 22px #0002',
              borderRadius: 18,
              padding: '32px 36px',
              minWidth: 240,
              maxWidth: 320,
              marginBottom: 20,
              textAlign: 'center',
              border: '2px solid #232344'
            }}>
              <h3 style={{ fontWeight: 700, fontSize: 24, marginBottom: 16 }}>{plan.duration}</h3>
              <div style={{
                fontWeight: 800, fontSize: 32, marginBottom: 18,
                background: 'linear-gradient(90deg,#fff,#ffd700,#3F0071)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>{plan.price}</div>
              <div style={{ fontSize: 17, color: '#cfcff3', marginBottom: 14 }}>{plan.description}</div>
              <button style={{
                background: '#1f0954',
                color: '#fff',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 18,
                padding: '9px 28px',
                border: 'none',
                marginTop: 8,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0002'
              }}>Suscribirme</button>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" style={{
        background: black,
        padding: '56px 10vw',
        borderTop: `2px solid ${indigoDark}`,
        color: '#e0e8ff',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 18 }}>¿Tienes dudas o quieres saber más?</h2>
        <p style={{ fontSize: 18, color: '#f2f2ff', marginBottom: 46 }}>
          Escríbenos y transforma la gestión de tu local hoy.<br/>
          <b>Email:</b> appordenaya@gmail.com<br/>
          <b>WhatsApp:</b> +56 9 8710 4600
        </p>
        <a href="mailto:appordenaya@gmail.com" style={{
          background: '#2E0854',
          color: 'white',
          padding: '10px 36px',
          borderRadius: 10,
          textDecoration: 'none',
          fontWeight: 600,
          boxShadow: '0 2px 10px #3F0071',
          fontSize: 20,
        }}>Contactar ahora</a>
      </section>

      {/* Footer */}
      <footer style={{
        background: indigoDark,
        textAlign: 'center',
        padding: 26,
        fontSize: 16,
        color: '#e0e0e0',
        boxShadow: '0 -2px 8px #001F3F77'
      }}>
        © {new Date().getFullYear()} OrdenesYa App. Todos los derechos reservados.
      </footer>
    </main>
  );
}


// Estilos extra
const menuLinkStyle = {
  color: '#e0e8ff',
  fontWeight: 600,
  fontSize: 18,
  textDecoration: 'none',
  letterSpacing: 1,
  padding: '4px 8px',
  borderRadius: '6px',
  transition: 'background .2s',
};

const imgStyle = {
  boxShadow: '0 2px 12px #181A1B77',
  borderRadius: 16,
  border: '3px solid #3F0071',
  width: '100%',
  maxWidth: 270,
  height: 180,
  objectFit: 'cover'
};

