import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from "../controllers/UsersController";
import isAutheticated from "../../../shared/http/middlewares/isAuthenticated";
import UsersAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const userController = new UsersController();
const userAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/',isAutheticated ,userController.index);

usersRouter.post('/',
  celebrate({
    [Segments.BODY]:{
      nomeCompleto: Joi.string().required(),
      RG: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),

  userController.create,
);

usersRouter.patch('/avatar',
  isAutheticated,
  upload.single('avatar'),
  userAvatarController.update,
);


export default usersRouter;
