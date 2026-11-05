export interface PublicUser {
  id: string;
  displayName: string;
  dormitory: string;
}

export interface IAuthUsers {
  findPublicById(id: string): PublicUser | undefined;
}

export const AUTH_USERS = Symbol('AUTH_USERS');
