import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import path from 'path';
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokenRepository from "../typeorm/repositories/UsersTokenRepository";
import EtherealMail from '@config/mail/EtherealMail';


interface IRequest{
  email: string;
}

class SendForgotPasswordEmailService{
  public async execute({email}: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UsersTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('User does not exists.');
    }

    console.log(user);

    const {token} = await userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..','views','forgot_password.hbs');

    await EtherealMail.sendMail({
      to:{
        name: user.nomeCompleto,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData:{
        file: forgotPasswordTemplate,
        variables:{
          name: user.nomeCompleto,
          link:`http://localhost:3000/reset_password?token=${token}`,
        }
      },
    });
}
}

export default SendForgotPasswordEmailService;
