declare module 'express' {
  interface Request {
    user: {
      name: string;
      id: number;
    };
  }
}

export {};
