import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserSerice";



export default class UsersController{
  public async index(request:Request, response:Response):Promise<Response>{
    const listUser = new ListUserService();

    console.log(request.user.id);

    const users = await listUser.execute();

    return response.json(users);
  }

  public async create(request:Request, response:Response):Promise<Response>{
    const {nomeCompleto, email, password, RG,} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({nomeCompleto, email, password, RG,});

    return response.json(user);
  }
}
