export class Guest {
  constructor(
    public readonly id: string,
    public readonly displayName: string,
  ) {}

  getDisplayName(): string {
    return this.displayName;
  }
}

export class Resident extends Guest {
  constructor(
    id: string,
    displayName: string,
    public readonly email: string,
    public readonly dormitory: string,
    public readonly contact: string,
  ) {
    super(id, displayName);
  }
}
