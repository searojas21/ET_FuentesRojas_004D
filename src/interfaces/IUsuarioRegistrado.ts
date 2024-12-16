export interface IUsuarioRegistrado {
    id: number;
    nombreUsuario: string;
    email: string;
    eventos: {
      eventoId: number;
      nombreEvento: string;
      fechaEvento: string;
    }[];
  }
  