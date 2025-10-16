'use client';

import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { TailSpin } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';


const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export default function Visor() {

  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [nuevaOrders, setNuevaOrders] = useState<string[]>([]);
  const [preparacionOrders, setPreparacionOrders] = useState<string[]>([]);
  const [listaOrders, setListaOrders] = useState<string[]>([]);
  const [newIdsHighlight, setNewIdsHighlight] = useState<{ [key: string]: number }>({});

  // Estados para almacenar la última orden de cada lista que parpadea
  const [highlightNueva, setHighlightNueva] = useState<string | null>(null);
  const [highlightPreparacion, setHighlightPreparacion] = useState<string | null>(null);
  const [highlightLista, setHighlightLista] = useState<string | null>(null);
  const router = useRouter();

    
    const { user, token, logout, status } = useAuthStore();

    const handleLogout = () => {
    logout();
   router.replace('/') 
  };

  useEffect(() => {
  if (status !== 'authenticated' && status !== 'checking') {
    router.replace('/');
  }
}, [status, router]);


  useEffect(() => {

    socketRef.current = io(SOCKET_URL, {
       auth: {
            authorization: token,
        },
      transports: ['websocket'],
          reconnection: true,        // reconexión activa
    reconnectionAttempts: Infinity,   // máximo 5 intentos, puedes ajustar
    reconnectionDelay: 1000,   // 1 segundo entre intentos
    reconnectionDelayMax: 5000 
    });

    socketRef.current.on('connect', () => { console.log('conectado'); setConnected(true)});
    socketRef.current.on('disconnect', () => { console.log('desconectado'); setConnected(false)});

    socketRef.current.on('orders-updated', (data) => {

      const { orderId, status, mesaNombre } = data;
      const dataAdd = recortarMesaNombre(mesaNombre).length > 0 ? '-' + recortarMesaNombre(mesaNombre) : '';
      const orderCompose = orderId.slice(0, 2) + dataAdd;

      const remove = (stateFn: Function) =>
        stateFn((prev: string[]) => prev.filter((id) => id !== orderCompose));
      remove(setNuevaOrders);
      remove(setPreparacionOrders);
      remove(setListaOrders);

     if (status === 'nueva') {
  setNuevaOrders((prev) => [orderCompose, ...prev]);
  setHighlightNueva(orderCompose);
  setTimeout(() => setHighlightNueva(null), 7000);
}
if (status === 'preparacion') {
  setPreparacionOrders((prev) => [orderCompose, ...prev]);
  setHighlightPreparacion(orderCompose);
  setTimeout(() => setHighlightPreparacion(null), 7000);
}
if (status === 'lista') {
  setListaOrders((prev) => [orderCompose, ...prev]);
  setHighlightLista(orderCompose);
  setTimeout(() => setHighlightLista(null), 7000);
}
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [token, SOCKET_URL]);

   if (status === 'checking') {
    return (
       <div style={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#1e357a',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    color: 'white',
    fontSize: 24,
  }}>
    <TailSpin
      height="80"
      width="80"
      color="white"
      ariaLabel="loading"
    />
  </div>
    );
  }

  else if (status === 'authenticated') {

    return (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column',    // layout vertical
    gap: 10, 
    backgroundColor: '#312e81', 
    height: '100vh', 
    padding: 20, 
    color: 'white' 
  }}>
     <button
          onClick={handleLogout}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: 28,
            cursor: 'pointer',
            zIndex: 1000,
          }}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          ←
        </button>
    <div style={{ display: 'flex',margin: '0 auto',  paddingRight: 20,  alignItems: 'center', minWidth:400 , justifyContent: 'center', gap: 5, backgroundColor: 'indigo' }}>
       {user?.client.image === '' ? (
        <img
        src={'/logo.png'}
        alt="Logo"
        style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 10 }}
      />) : (
      <img
        src={'/logo.png'}
        alt="Logo"
        style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 10 }}
      />
      )

       }

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 24, fontWeight: 'bold' }}>
          {user ? user.client.fullName: ''}
        </span>
        <span style={{ fontSize: 16, fontWeight: 'bold'  }}>
          {user ? user.client.phone: ''}
        </span>
        <span style={{ fontSize: 16, fontWeight: 'bold'  }}>
          {user ? user.client.address: ''}
        </span>
      </div>
    </div>

    {/* Row con las tres columnas */}
    <div style={{ display: 'flex', gap: 20, flex: 1 }}>
        <Column title="Nueva" orders={nuevaOrders} highlightId={highlightNueva} />
        <Column title="Preparación" orders={preparacionOrders} highlightId={highlightPreparacion} />
        <Column title="Lista" orders={listaOrders} highlightId={highlightLista} />
      </div>
  </div>
);
  }

  else{
   return null;
  }

  function recortarMesaNombre(mesaNombre: string): string {
  if (!mesaNombre) return '';
  if (mesaNombre.length <= 7) return mesaNombre;
  if(mesaNombre.substring(0, 7).split(' ').length > 1) {
    const palabras = mesaNombre.substring(0, 7).split(' ');
     return palabras[0] + '...';
  } else{
      return mesaNombre.substring(0, 7) + '...';
  }

}

  function Column({ title, orders, highlightId }: { title: string; orders: string[]; highlightId: string | null }) {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: 'white',
        color: '#312e81',
        padding: 15,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 28, color: 'indigo' }}>{title}</h2>
      <div
        style={{
          flex: 1,
           maxHeight: 650, 
          overflowY: 'auto',
          paddingRight: 6, // para dejar espacio scrollbar visual
          marginTop: 10,
        }}
      >
        {orders.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No hay órdenes</p>
        ) : (
          orders.map((id) => {
            const isHighlight = id === highlightId;

            return (
              <motion.div
                key={id}
                animate={isHighlight ? { backgroundColor: ['#f59e0b', '#4338ca', '#f59e0b'] } : undefined}
                transition={isHighlight ? { repeat: 6, duration: 1.2 } : undefined}
                style={{
                  backgroundColor: isHighlight ? '#f59e0b' : '#4338ca',
                  margin: 6,
                  padding: 15,
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 38,
                  fontWeight: 'bold',
                  borderRadius: 6,
                }}
              >
                #{id}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
}