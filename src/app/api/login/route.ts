import { NextResponse } from 'next/server';

import { User } from "@/interfaces/user-client.interface";

export async function POST(request: Request) {
  const body = await request.json();
  
  interface Client {
    id:            string;
    fullName:      string;
    rut:           string;
    email:         string;
    image:         string;
    phone:         string;
    isActive:      boolean;
    emailVerified: boolean;
    address:       string;
    web:           string;
    isOpen:        boolean;
    activity:      string;
    horario:       string;
    createdAt:     Date;
    habilitarMercadoPago: boolean;
    habilitarPdv: boolean;
    tokenMercadoPago: string;
}
interface AuthResponse {
  id: string;
  email: string;
  rut: string;
  isActive: boolean;
  image: string;
  emailVerified: boolean;
  fullName: string;
  createdAt: string;
  role: string;
  token: string;
  tokenPhone: string;
  notificaciones: boolean;
  client: Client;
}

const returnUserToken = (
  data: AuthResponse
): {
  user: User;
  token: string;
} => {
  // const { id, email, fullName, isActive, roles, token } = data;
  const { token, ...user } = data;

  // const user: User = {
  //   id,
  //   email,
  //   fullName,
  //   isActive,
  //   roles,
  // };

  return {
    user,
    token,
  };
};


  // Ejemplo: llamar a backend real, o validar aquí directamente
  const data = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
       next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );

  if (data) {

    return NextResponse.json(returnUserToken(data));
  } else {
    return NextResponse.error();
  }
}
