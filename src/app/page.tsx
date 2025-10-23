"use client";


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';


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
 '/IMG_0233.PNG',
 '/IMG_0235.PNG',
 '/IMG_0239.PNG',
 '/IMG_0240.PNG',
 '/IMG_0241.PNG',
 '/IMG_0242.PNG',
 '/IMG_0244.PNG',  
 '/IMG_0246.PNG',
 '/IMG_0247.PNG',
 '/IMG_0248.jpg',
 '/IMG_0249.PNG',
 '/IMG_0250.PNG',
 '/img1.png',

];


export default function LandingPage() {


 const [modalImg, setModalImg] = useState<string | null>(null);
 const [isOpen, setIsOpen] = useState(false); 
  return (
   <main style={{ background: `linear-gradient(180deg, ${indigoDark} 0%, ${blueDeep} 100%)`, color: 'white', minHeight: '100vh', fontFamily: 'Inter, Arial, sans-serif' }}>
     {/* Navbar */}
     <nav
     style={{
       display: 'flex',
       flexWrap: 'wrap',
       justifyContent: 'space-between',
       alignItems: 'center',
       background: '#1e357a',
       padding: '10px 24px',
       boxShadow: '0 2px 12px rgba(30,0,70,0.35)',
       position: 'relative',
     }}
   >
     {/* Logo y nombre */}
     <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
       <img
         src={'/logo.png'}
         alt="Logo OrdenaYa"
         width={56}
         height={56}
         style={{ borderRadius: 12, boxShadow: '0 0 10px #0003' }}
       />
       <span
         style={{
           fontSize: 22,
           fontWeight: 700,
           letterSpacing: 1,
           color: 'white',
         }}
       >
         OrdenaYa App
       </span>
     </div>


     {/* Botón menú móvil */}
     <button
       onClick={() => setIsOpen(!isOpen)}


 className="menu-btn"
 aria-label="Abrir menú"
     >
       ☰ <style jsx>{`
   .menu-btn {
     background: none;
     border: none;
     color: white;
     font-size: 28px;
     cursor: pointer;
     display: none; /* Oculto por defecto */
     align-items: center;
     justify-content: center;
     margin-right: 10px;
   }


   /* Mostrar solo en pantallas pequeñas */
   @media (max-width: 768px) {
     .menu-btn {
       display: flex;
     }
   }
 `}</style>
     </button>


     {/* Contenedor enlaces moobile*/}
     <div
       style={{
         display: isOpen ? 'flex' : 'none',
         flexDirection: 'column',
         gap: 16,
         width: '100%',
         textAlign: 'center',
         padding: '8px 0',
         background: '#2E0854',
         borderRadius: 12,
         marginTop: 10,
       }}
     >
       <a href="#descripcion" style={menuLinkStyle}>
         Descripción
       </a>
       <a href="#suscripcion" style={menuLinkStyle}>
         Suscripción
       </a>
       <a href="/visor" style={menuLinkStyle}>
         Visor
       </a>
       <a href="#descarga" style={menuLinkStyle}>
         Descargar APK
       </a>
       <a href="#contacto" style={menuLinkStyle}>
         Contáctanos
       </a>
     </div>


     {/* Menú visible solo en escritorio */}
     <div
       className="desktop-menu"
     >
       <style jsx>{`
   .desktop-menu {
     display: flex;
     gap: 30px;
     align-items: center;
   }


   @media (max-width: 768px) {
     .desktop-menu {
       display: none;
     }
   }
 `}</style>
       <a href="#descripcion" style={menuLinkStyle}>
         Descripción
       </a>
       <a href="#suscripcion" style={menuLinkStyle}>
         Suscripción
       </a>
       <a href="/visor" style={menuLinkStyle}>
         Visor
       </a>
        <a href="#descarga" style={menuLinkStyle}>
         Descargar APK
       </a>
       <a href="#contacto" style={menuLinkStyle}>
         Contáctanos
       </a>
     </div>
   </nav>


     {/* Hero */}
     <section style={{ textAlign: 'center', padding: '60px 30px 32px 30px', background: `linear-gradient(90deg, ${indigoDark}, ${blueDeep})`, boxShadow: '0 4px 40px #0005' }}>
   
       <h1 style={{ fontSize: 35, fontWeight: 800, marginBottom: 24, background: 'linear-gradient(90deg,#3F0071,#2E0854,#001F3F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'white' }}>
         Revoluciona tu restaurante con OrdenaYa App
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
           height: 430,
           cursor: 'pointer',
         }}
         onClick={() => setModalImg(src)} // Asegúrate de manejar setModalImg en el contexto
       />
     </SwiperSlide>
   ))}
 </Swiper>
</div>


<div className="info-card">
 <h2 className="info-title">
   ¿ Por qué OrdenaYa App ?
 </h2>


 <ul className="info-list">
   <li>Carrito de ítems intuitivo y veloz</li>
   <li>Control y visibilidad de pedidos en tiempo real</li>
   <li>Optimización del trabajo en equipo y comunicación interna</li>
   <li>Visor de estado de órdenes - Flujo de trabajo visual, ágil y confiable</li>
   <li>Integración con Mercadopago - Pago con QR en modo punto de venta</li>
   <li>Monitoreo del flujo de órdenes a distancia con reportes y gráficos</li>
   <li>Control de stock y precios</li>
   <li>Notificaciones Push en tiempo real</li>
   <li>Carga rápida de productos y categorías por archivo excel</li>
   <li>No más papel, tickets o recibos - Soporte 24/7</li>
 </ul>


 <style jsx>{`
   .info-card {
     display: flex;
     justify-content: space-between;
     align-items: center;
     max-width: 1200px;
     margin: 0 auto;
     padding: 20px 20px;
     background: linear-gradient(90deg, ${blue}, ${blueDeep});
     border-radius: 16px;
     box-shadow: 0 8px 20px rgba(46, 8, 84, 0.6);
     color: #e0e0e0;
     flex-wrap: wrap;
   }


   .info-title {
     font-weight: 700;
     font-size: 32px;
     color: #e0e0e0;
     flex-basis: 45%;
     text-align: center;
     margin: 0;
     padding-right: 30;
   }


   .info-list {
     font-size: 18px;
     line-height: 2.1;
     font-weight: bold;
     color: #e0e0e0;
     padding-left: 0;
     list-style-type: disc;
     max-width: 700px;
     flex-basis: 55%;
     margin: 0;
   }


   /* RESPONSIVO: apila en dos filas */
   @media (max-width: 768px) {
     .info-card {
       flex-direction: column;
       text-align: center;
     }


     .info-title {
       flex-basis: 100%;
       margin-bottom: 20px;
     }


     .info-list {
       flex-basis: 100%;
       list-style-position: inside;
       text-align: left;
     }
   }
 `}</style>
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
       <h2 style={{ fontWeight: 700, fontSize: 32, marginBottom: 30 }}>Planes de Suscripción</h2>
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


    {/* Descarga */}
<section
  id="descarga"
  style={{
    background: `linear-gradient(90deg, ${blueDeep}, ${indigoDark})`,
    color: 'white',
    padding: '38px 10vw',
    borderRadius: 20,
    maxWidth: 1200,
    margin: '40px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 30,
    boxShadow: '0 12px 28px rgba(30,0,70,0.6)',
  }}
>
  {/* Imagen tipo "descarga la App aquí" */}
  <img
    src="/download-app.png"
    alt="Descarga la App aquí"
    style={{
      width: 180,
      height: 180,
      borderRadius: 20,
      boxShadow: '0 0 24px #3F0071AA',
      objectFit: 'contain',
    }}
    className="descarga-img"
  />

  {/* Texto y botón de descarga */}
  <div style={{ maxWidth: 600 }} className="descarga-texto">
    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
      Descarga la App OrdenaYa
    </h2>
    <p style={{ fontSize: 18, lineHeight: 1.5, marginBottom: 24 }}>
      Lleva la gestión eficiente de órdenes siempre contigo. ¡Descarga la aplicación móvil para instalar el sistema directamente desde tu dispositivo Android!
    </p>
    <a
      href="https://expo.dev/artifacts/eas/sz3cLNcCY85jtV77y65snA.apk"
      download
      target="_blank"
      style={{
        display: 'inline-block',
        backgroundColor: '#cc5500',
        color: 'white',
        padding: '14px 32px',
        borderRadius: 12,
        fontWeight: 700,
        fontSize: 20,
        boxShadow: '0 4px 16px #992f00',
        textDecoration: 'none',
        transition: 'background-color 0.3s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a03e00')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#cc5500')}
    >
      Descargar APK
    </a>
  </div>

  <style jsx>{`
    @media (max-width: 768px) {
      #descarga {
        flex-direction: column;
        text-align: center;
      }
      .descarga-img {
        margin-bottom: 24px;
      }
      .descarga-texto {
        max-width: 100% !important;
      }
    }
  `}</style>
</section>



     {/* Contacto */}
     <section id="contacto" style={{
       background: '#1e357a',
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
       © {new Date().getFullYear()} OrdenaYa App. Todos los derechos reservados.
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







