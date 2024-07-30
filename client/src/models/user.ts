export interface User {
  id: string;
  auth: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  registered: Date;
  is_activated: boolean;
}

export interface UserResponse {
  fetched: boolean;
  user: User;
}

export interface UsersResponse {
  users: User[];
}
