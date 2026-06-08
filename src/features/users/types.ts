export type Geo = {
  lat: string;
  lng: string;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Login = {
  uuid: string;
  username: string;
  password: string;
  md5: string;
  sha1: string;
  registered: string; // ISO 8601: "2023-01-10T10:03:20.022Z"
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  birthDate: string; // formato: "YYYY-MM-DD"
  login: Login;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export type UsersResponse = User[];