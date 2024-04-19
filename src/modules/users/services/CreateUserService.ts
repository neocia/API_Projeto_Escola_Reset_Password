import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { hash } from "bcryptjs";


interface IRequest{
  nomeCompleto:string;
  RG: string;
  email: string;
  password: string;

}


class CreateUserService{
  public async execute({nomeCompleto, email, password,RG,}: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if(emailExists){
      throw new AppError('E-mail address already used.');
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      nomeCompleto,
      RG,
      password: hashPassword,
      email,
    });

    await usersRepository.save(user);
    return user;

  };
}

export default CreateUserService;

