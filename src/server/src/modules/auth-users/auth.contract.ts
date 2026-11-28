export interface PublicUser {
  id: string;
  displayName: string;
  dormitory: string;
}

export interface IAuthUsers {
  findPublicById(id: string): Promise<PublicUser | undefined>;
  findPublicByIds(ids: readonly string[]): Promise<PublicUser[]>;
}

export const AUTH_USERS = Symbol('AUTH_USERS');
