export interface IUser {
  user: {
    email: string;
    sub: string;
  };
}

export interface IContext {
  req?: Request & IUser;
  res?: Response;
}

export interface IOAuthUser {
  user: {
    email: string;
    hashedPassword: string;
    name: string;
    phone: string;
    address: string;
    rank: string;
  };
}
