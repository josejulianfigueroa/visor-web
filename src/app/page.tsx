'use client';

import React, { useState } from 'react';
import { NativeButton } from '../../components/ui/NativeButton';
import { ThemedText } from '../../components/ui/ThemeText';
import ThemedTextInput from '../../components/ui/ThemedTextInput';
import { useAuthStore } from '../store/useAuthStore';
import { TailSpin } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';



const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export default function LoginPage() {

  const { login } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({ email: '',idClient:'', password: '' });
  const [errors, setErrors] = useState({ email: '',idClient:'', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [loadingRedirect, setLoadingRedirect] = useState(false); 

  const router = useRouter();


  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', idClient:'', password: '' };

    if (!form.email) {
      newErrors.email = 'El correo es obligatorio';
      valid = false;
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = 'Correo electrónico no válido';
      valid = false;
    }
    if (!form.idClient) {
      newErrors.idClient = 'El key_client es obligatorio';
      valid = false;
    } 

    if (!form.password) {
      newErrors.password = 'La contraseña es obligatoria';
      valid = false;
    } else if (!PASSWORD_REGEX.test(form.password)) {
      newErrors.password = 'El password debe tener una mayúscula, una minúscula y un número';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const onLogin = async () => {
    if (!validateForm()) return;

    setIsPosting(true);

   const wasSuccessful = await login(form.email, form.password, form.idClient, '');
console.log('wasSuccessful', wasSuccessful);
    setIsPosting(false);

     if (!wasSuccessful) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000); // Esconde la alerta después de 4 segundos
     } else {
      setLoadingRedirect(true);
      setTimeout(() => {
     router.replace('/visor') 
    }, 1000); // 3 segundos delay antes de redirigir
  }
};

  return (
    <>  {!loadingRedirect && (
      <div
        style={{
          height: '100vh',
          backgroundColor: '#1e357a', // tono más oscuro de indigo
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >

             {showAlert && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            width: '90%',
            maxWidth: 400,
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: 20,
            borderRadius: 8,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <strong>¡Error!</strong> Usuario o contraseña incorrectos.
        </div>
      )}
        <div
          style={{
            maxWidth: 400,
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'indigo',
            borderRadius: 15,
            padding: 20,
            boxSizing: 'border-box',
          }}
        >
          {/* Logo centrado */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
            <img
              src="/logo.png" // coloca tu logo en /public/logo.png
              alt="Logo"
              style={{ width: 150, height: 150, objectFit: 'contain' }}
            />
          </div>

          <div>
            <ThemedText type="titleBlack">OrdenaYa App</ThemedText>
          </div>
          <div style={{ paddingTop: '1vh' }}>
            <ThemedText style={{ color: '#ccc' }}>Por favor ingrese para continuar</ThemedText>
          </div>
    
          <div style={{ marginTop: 20, textAlign: 'left' }}>
            <ThemedTextInput
              placeholder="Correo electrónico"
              type="email"
              autoComplete="email"
              value={form.email}
              colorFont="white"
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setErrors({ ...errors, email: '' });
              }}
              style={errors.email ? { borderColor: '#e53935', borderWidth: 2 } : {}}
            />
            {errors.email && (
              <ThemedText style={{ color: '#e53935', marginBottom: 6, marginLeft: 4, fontSize: 13 }}>
                {errors.email}
              </ThemedText>
            )}

            <ThemedTextInput
              placeholder="Contraseña"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setErrors({ ...errors, password: '' });
              }}
              colorFont="white"
              style={errors.password ? { borderColor: '#e53935', borderWidth: 2 } : {}}
            />
            {errors.password && (
              <ThemedText style={{ color: '#e53935', marginBottom: 6, marginLeft: 4, fontSize: 13 }}>
                {errors.password}
              </ThemedText>
            )}

             <ThemedTextInput
              placeholder="key_client"
              type="text"
              autoComplete="text"
              value={form.idClient}
              colorFont="white"
              onChange={(e) => {
                setForm({ ...form, idClient: e.target.value });
                setErrors({ ...errors, idClient: '' });
              }}
              style={errors.idClient ? { borderColor: '#e53935', borderWidth: 2 } : {}}
            />
            {errors.idClient && (
              <ThemedText style={{ color: '#e53935', marginBottom: 6, marginLeft: 4, fontSize: 13 }}>
                {errors.idClient}
              </ThemedText>
            )}

          </div>

          <div style={{ marginTop: 20 }}>
            <NativeButton
              disabled={isPosting}
              loading={isPosting}
              loadingText="Ingresando..."
              onClick={onLogin}
              backgroundColor="green"
              textColor="#ffffff"
            >
              Ingresar
            </NativeButton>
          </div>
        </div>
      </div>)}
      {loadingRedirect && (
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
)}
    </>
  );
}