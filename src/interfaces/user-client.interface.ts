export interface User {
  id: string;
  email: string;
  image: string;
  fullName: string;
  emailVerified: boolean;
  role: string;
  token?: string;
  notificaciones: boolean;
  rut: string;
  isActive: boolean;
  createdAt: string;
  tokenPhone: string;
  client: Client;
  cantOrdenesDia?: number;
  cantOrdenesMes?: number;
}

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