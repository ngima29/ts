class Base64 {
  private static instance: Base64;

  private constructor() {}

  static get(): Base64 {
    if (!Base64.instance) {
      Base64.instance = new Base64();
    }
    return Base64.instance;
  }

  encode(payload: string): string {
    return Buffer.from(payload).toString("base64");
  }

  decode(payload: string): object {
    return JSON.parse(Buffer.from(payload, "base64").toString("ascii"));
  }
}

const base64 = Base64.get();

export { base64 as Base64 };
