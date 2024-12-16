export interface Users {
    id: number;
    username: string;
    email: string;
    password: string;
    profileImage?: string;
    isactive: boolean;  
  }
  
  export interface UserNuevo {
    username: string;
    email: string;
    password: string;
    isactive: boolean;  
    profileImage?: string; 
  }
  