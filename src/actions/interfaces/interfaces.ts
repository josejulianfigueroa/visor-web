 export interface Plan  {
  id:                 string;
  title:              string;
  descripcion:        string;
  isActive:           boolean;
  usuariosPermitidos: number;
  historial:          number;
  price:              number;
  soporte:            string;
  duracion:           string;
  createdAt:          Date;
 };