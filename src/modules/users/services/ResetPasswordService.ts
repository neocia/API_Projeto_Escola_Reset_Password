import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import {hash} from 'bcryptjs';
import {isAfter, addHours} from 'date-fns';
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokenRepository from "../typeorm/repositories/UsersTokenRepository";
import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";



interface IRequest{
  token: string;
  password: string;
}


class ResetPasswordService{
  create(arg0: string, arg1: RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, create: any) {
    throw new Error("Method not implemented.");
  }
  public async execute({token, password}: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UsersTokenRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if(!userToken){
      throw new AppError('User Token does not exists.');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if(!user){
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt,2);

    if(isAfter(Date.now(), compareDate)){
      throw new AppError('Token expired.');
    }

    user.password = await hash(password,8);
    await usersRepository.save(user);

}
}

export default ResetPasswordService;
