export interface Jwt {
  payload: {
    sub: number;
    name: string;
  };
  iat?: number;
  exp?: number;
}

export interface JwtPayload {
  sub: number;
  name: string;
}
