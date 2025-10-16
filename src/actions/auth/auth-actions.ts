'use server';

import { User } from "@/interfaces/user-client.interface";

export interface Client {
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
export interface AuthResponse {
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


export const authLogin = async (email: string, password: string, idClient: string, expoPushToken: string) => {
  email = email.toLowerCase();

  try {
    const method = 'POST';
    const dataSend = { "email": email, "password": password, "idClient": idClient, "expoPushToken": expoPushToken };

    const  data  =  await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/auth/login`,{
        method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( dataSend ),
      // cache: 'force-cache',
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then( resp => resp.json() );

    return returnUserToken(data);

  } catch (error) {
    return null;
  }
};

