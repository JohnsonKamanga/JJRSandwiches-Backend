import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { User } from './user.entity';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    findAll():Promise<User[]>{
        return this.userRepository.find();
    }

    findOne(username : string):Promise<User | null>{
        return this.userRepository.findOneBy({username});
    }

    findOneByID(id : number): Promise <User | null>{
        return this.userRepository.findOneBy({id});
    }

    async remove(id: number): Promise<void>{
        await this.userRepository.delete(id);
    }

    async create(data):Promise<User | null>{
        return this.userRepository.save(data);
    }

    async update(id: number, data): Promise<any>{
        if(data['password']){
        //generate password salt
        const salt = await genSalt(10);
    
        //use salt to generate hashed password
        const password = await hash(data['password'], salt);
        
        return this.userRepository.update(id, {...data, password});
        }
        return this.userRepository.update(id, data);
    }
}
