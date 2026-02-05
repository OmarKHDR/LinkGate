declare module 'express' {
  interface Request {
    cookies: {
      refresh_token: string;
    };
    user: {
      name?: string;
      sub: number;
    };
  }
}

export {};
