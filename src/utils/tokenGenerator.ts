import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); 

class TokenGenerator {
  private static instance: TokenGenerator;
  private secretKey?: string;

  private constructor() {
    this.secretKey = process.env.SECRET_KEY;
  }

  static get(): TokenGenerator {
    if (!TokenGenerator.instance) {
      TokenGenerator.instance = new TokenGenerator();
    }
    return TokenGenerator.instance;
  }

  generateToken(payload: object, expiresIn: number): string {
    if (!this.secretKey) {
      throw new Error('Secret key not found');
    }
    const token = jwt.sign(payload, this.secretKey, { expiresIn });
    return token;
  }

  verifyToken(token: string): any {
    if (!this.secretKey) {
      throw new Error('Secret key not found');
    }
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

const tokenGenerator = TokenGenerator.get();

export { tokenGenerator as TokenGenerator };
