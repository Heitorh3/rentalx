import { v4 as uuidV4 } from 'uuid';

import User from "@modules/users/infra/typeorm/entities/User";

import { IUserRepository } from "../IUserRepository";
import ICreateUserRequestDTO from '@modules/users/dtos/ICreateUserRequestDTO';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(user_id: string): Promise<User> {
    const findUser = this.users.find(user => user.id === user_id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findByCpf(cpf: string): Promise<User> {
    const findUser = this.users.find(user => user.cpf === cpf);

    return findUser;
  }

  public async create(userData: ICreateUserRequestDTO): Promise<User> {
    const user = Object(null);

    Object.assign(user, { id: uuidV4() }, userData);
    this.users.push(user);

    return user;

  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

}

export default FakeUserRepository;
