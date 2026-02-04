declare module 'express' {
  interface Request {
    user: {
      name: string;
      sub: number;
    };
  }
}

export {};
