import { getRepository, Repository } from "typeorm";
import { IUserRepository } from "./IUserRepository";

import User from "@modules/users/infra/typeorm/entities/User";
import ICreateUserRequestDTO from '@modules/users/dtos/ICreateUserRequestDTO';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cpf },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const userAlreadyExists = await this.ormRepository.findOne({
      where: { email }
    });

    return userAlreadyExists;
  }

  public async create(userData: ICreateUserRequestDTO): Promise<User> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export { UserRepository }
