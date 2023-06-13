import * as Sequelize from 'sequelize';
import { WhereOptions } from 'sequelize';
import {
  InputUserInterface,
  UserInterface,
  InputLoginInterface
} from '../interfaces';

import {UserRepository} from '../repositories';
import { Password, TokenGenerator } from '../utils';


export class UserService {
  private repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }

  async create(input: InputUserInterface): Promise<UserInterface> {
    const existingUser = await this.repository.findOne({ 
      where:{ email: input.email },
    })
   if (existingUser) throw new Error(` Email  : ${input.email} already exist!`);
  if(input.password){
    input.password =  await Password.generate(input.password)
  }
    const user = await this.repository.create(input)
    return user;
  }


  async findByPk(
    id: number,
    options = { exclude: ['deletedAt'] }
  ): Promise<UserInterface> {
    const userExists = await this.repository.findByPk(id)

    if (!userExists) throw new Error(`User ${id}  does not exit `);
    return userExists
  }

  async updateOne(
    id: Sequelize.CreationOptional<number>,
    input: InputUserInterface
  ): Promise<UserInterface> {
    if (id) {
      const userExists = await this.repository.findByPk(id)
      if (!userExists) throw new Error(`User ${id}  does not exit `);
    }

    if (input.email) {
      const emailExists = await this.repository.findOne({
        where: { email: input.email?.trim() },
      })
      if (emailExists && emailExists.id !== id)
        throw  new Error(`Email: ${input.email} is already exists!`)
    }

    await this.repository.updateOne({
      id: id,
      input: input,
    })

    return this.findByPk(id)
  }


async deleteOne(id: number): Promise<boolean> {
  const userExists = await this.repository.findByPk(id);
  if (!userExists) throw new Error(`User: ${id} does not exist`);

  const remove = await this.repository.deleteOne(id);
  if (remove === 0) throw new Error(`User: ${id} does not exist`);
  return true;
}

  async login(input: InputLoginInterface): Promise<any> {
    const user = await this.repository.findOne({
        where:  { email: input.email }
      })

    if (!user)   throw  new Error('Invalid Identifier or Password');
     const validatePassword = await Password.validatePassword(input.password, user.password)
     if (!validatePassword)   throw new Error('Invalid Identifier or Password')
     if (user && validatePassword){
       const userId = user.id
       const token = await TokenGenerator.generateToken({userId}, 86400)
       return {
        user,
        token}
     }
   
  }

  findOne({
    email,
    id
  }: {
    email?: string;
    id?: number | undefined;
  }): Promise<UserInterface> {
    let where: WhereOptions<any> = {};
    if (email) {
      where = { ...where, email: email };
    }
    if (id) {
      where = { id: id };
    }
    return this.repository.findOne({ where });
  }

}
