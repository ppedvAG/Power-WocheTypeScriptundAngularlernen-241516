export interface Credentials {
  username: string;
  password: string;
}

export interface User extends Credentials {
  address: Address;
  aliases: string[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}
