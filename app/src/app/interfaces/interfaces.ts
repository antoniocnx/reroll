export interface RespuestaPost {
  ok: boolean;
  pagina: number;
  posts: Post[];
}

export interface RespuestaCrearPost {
  ok: boolean;
  post: Post;
}

export interface RespuestaLogin {
  ok: boolean;
  token: string;
}

export interface RespuestaSignUp {
  status: string;
  message?: string;
}

export interface RespuestaUsuario {
  ok: boolean;
  usuario: Usuario;
}

export interface Post {
  _id?: string;
  mensaje?: string;
  imgs?: string[];
  coords?: string;
  usuario?: Usuario;
  created?: string;
}

export interface Usuario {
  _id?: string;
  nombre?: string;
  apellidos?: string;
  email?: string;
  password?: string;
  nacimiento?: Date;
  sexo?: string;
  direccion?: string;
  ciudad?: string;
  localidad?: string;
  pais?: string;
  cp?: string;
  avatar?: string;
}

// export interface Juego {
  // _id?: string;
  // titulo?: string;
  // precio?: number;
  // mensaje?: string;
  // imgs?: string[];
  // coords?: string;
  // usuario?: Usuario;
  // created?: string;
// }