'use client';

import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import { TailSpin } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export default function Visor() {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [nuevaOrders, setNuevaOrders] = useState<string[]>([]);
  const [preparacionOrders, setPreparacionOrders] = useState<string[]>([]);
  const [listaOrders, setListaOrders] = useState<string[]>([]);
  const [highlightNueva, setHighlightNueva] = useState<string | null>(null);
  const [highlightPreparacion, setHighlightPreparacion] = useState<string | null>(null);
  const [highlightLista, setHighlightLista] = useState<string | null>(null);
  
  const router = useRouter();
  const { user, token, logout, status } = useAuthStore();

  useEffect(() => {
    if (status !== 'authenticated' && status !== 'checking') {
      router.replace('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (!token) return;
    socketRef.current = io(SOCKET_URL, {
      auth: { authorization: token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current.on('connect', () => { console.log('conectado'); setConnected(true); });
    socketRef.current.on('disconnect', () => { console.log('desconectado'); setConnected(false); });

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

  if (status !== 'authenticated') {
    // Mientras redirecciona, no mostrar nada
    return null;
  }

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      backgroundColor: '#312e81',
      height: '95vh',
      padding: 20,
      paddingTop: 5,
      paddingBottom: 0,
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
      <div style={{
        display: 'flex',
        margin: '0 auto',
        paddingRight: 20,
        alignItems: 'center',
        minWidth: 400,
        justifyContent: 'center',
        gap: 0,
        backgroundColor: 'indigo'
      }}>
        <img
          src={'/logo.png'}
          alt="Logo"
          style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 10 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 22, fontWeight: 'bold' }}>
            {user ? user.client.fullName : ''}
          </span>
          <span style={{ fontSize: 16, fontWeight: 'bold' }}>
            {user ? user.client.phone + '. ' : ''} {user ? user.client.address : ''}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 20, flex: 1, paddingTop: 5, }}>
        <Column title="Nueva" orders={nuevaOrders} highlightId={highlightNueva} />
        <Column title="Preparación" orders={preparacionOrders} highlightId={highlightPreparacion} />
        <Column title="Lista" orders={listaOrders} highlightId={highlightLista} />
      </div>
    </div>
  );

  function recortarMesaNombre(mesaNombre: string): string {
    if (!mesaNombre) return '';
    if (mesaNombre.length <= 7) return mesaNombre;
    if (mesaNombre.substring(0, 7).split(' ').length > 1) {
      const palabras = mesaNombre.substring(0, 7).split(' ');
      return palabras[0] + '...';
    } else {
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
            maxHeight: 550,
            overflowY: 'auto',
            paddingRight: 6,
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
                  style={{
                    margin: 6,
                    padding: 0,
                    textAlign: 'center',
                    fontSize: 35,
                    fontWeight: 'bold',
                    borderRadius: 6,
                  }}
                >
                  <motion.span
                    animate={isHighlight ? { backgroundColor: ['#f59e0b', '#4338ca', '#f59e0b'] } : undefined}
                    transition={isHighlight ? { repeat: 10, duration: 6 } : undefined}
                    style={{
                      backgroundColor: isHighlight ? '#f59e0b' : '#4338ca',
                      color: 'white',
                      borderRadius: 4,
                      padding: '4px 8px',
                    }}
                  >
                    #{id}
                  </motion.span>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

