import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) { }
    
    
      async create(user: UserModel): Promise<UserModel | null> {
        return await this.usersRepository.save(user);
      }
    
      async update(id: number, user: UserModel): Promise<UpdateResult> {
        return await this.usersRepository.update(id, user);
      }
    
      async findAll(): Promise<UserModel[]> {
        return await this.usersRepository.find({
          order: {
            firstName: "ASC",
            id: "DESC",
          },
        });
      }
    
      async findOne(id: number): Promise<UserModel | null> {
        return await this.usersRepository.findOneBy({ id });
      }
    
      async remove(id: number): Promise<DeleteResult> {
        return await this.usersRepository.delete(id);
      }
    
      async findUser(username: string): Promise<UserModel> {
        return await this.usersRepository.findOne({
          where: {
            username: username,
          }
        });
      }
}
