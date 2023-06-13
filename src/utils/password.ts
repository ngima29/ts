import bcrypt from "bcrypt";

class Password {
  private static instance: Password;

  private constructor() {}

  static get(): Password {
    if (!Password.instance) {
      Password.instance = new Password();
    }
    return Password.instance;
  }

  async generate(password: string):Promise<string>  {
    const saltRounds = 10; //password hash
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
     return hash;
  }

 async validatePassword(password: string, hashPassword :string ):Promise<boolean> {
  const isValid = await bcrypt.compare(password, hashPassword);
  return isValid;
 }

}


const password = Password.get();

export { password as Password };
