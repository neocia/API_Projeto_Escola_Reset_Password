    import { EntityRepository, Repository } from 'typeorm';
    import User from '../entities/User';

    @EntityRepository(User)
    class UsersRepository extends Repository<User> {
      public async findByName(nomeCompleto: string): Promise<User | undefined> {
        const user = await this.findOne({
          where: { nomeCompleto },
        });
        return user;
      }

      public async findById(id: string): Promise<User | undefined> {
        const user = await this.findOne({
          where: { id },
        });
        return user;
      }

      public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({
          where: { email },
        });
        return user;
      }

      public async findByRG(RG: string): Promise<User | undefined> {
        const user = await this.findOne({
          where: { RG },
        });
        return user;
      }


    }

    export default UsersRepository;
