import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Community } from './community.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private communitiesRepository: Repository<Community>,
  ) {}

  //find all communities
  async findAll(): Promise<Community[]> {
    return await this.communitiesRepository.find();
  }

  //find community by id
  async findByID(id): Promise<Community> {
    return await this.communitiesRepository.findOne({
      where: { id: id },
      relations: {
        members: false,
      },
    });
  }

  //find community by community name
  async findByName(name: string): Promise<Community[]> {
    return await this.communitiesRepository.find({
      where: {
        name: name,
      },
      relations: {
        members: false,
      },
    });
  }

  async findByQuery(query): Promise<Community[]>{
    return await this.communitiesRepository.find({
      where:[
        {
          name: ILike(query)
        },
        {
          description: ILike(`%${query}%`)
        }
      ]
    })
  }

  //find community members
  async findUsers(id): Promise<any> {
    return await this.communitiesRepository
      .createQueryBuilder()
      .relation(Community, 'members')
      .of({ id: id })
      .loadMany();
  }

  //find a given user's communities
  async findByUser(id): Promise<any> {
    return await this.communitiesRepository
      .createQueryBuilder()
      .relation(User, 'communities')
      .of({ id: id })
      .loadMany();
  }

  async update(id, data): Promise<any> {
    return await this.communitiesRepository.update(id, data);
  }

  //create a community
  async create(body): Promise<Community | null> {
    return await this.communitiesRepository.save(body);
  }

  //delete a community
  async remove(id): Promise<void> {
    await this.communitiesRepository.delete(id);
  }

  //add user to community members
  async addUser(id, user): Promise<any> {
    return await this.communitiesRepository
      .createQueryBuilder()
      .relation(Community, 'members')
      .of({ id: id })
      .add(user);
  }

  //remove user to community members
  async removeUser(id, user): Promise<any> {
    return await this.communitiesRepository
      .createQueryBuilder()
      .relation(Community, 'members')
      .of({ id: id })
      .remove(user);
  }
}
