export class APIError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "APIError";
  }
}

export class LocalBoxError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "LocalBoxError";
  }
}
