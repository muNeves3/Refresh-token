import { Router } from 'express';
import { CreateUserController } from './UseCases/createUser/createUserController';
import { AuthenticateUserController } from './UseCases/authenticateUser/authenticateUserController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticaded';
import { RefreshTokenUserController } from './UseCases/refreshTokenUser/refreshTokenUserController';
import { EditUserController } from './UseCases/editUser/EditUserController';
import { GetUsersController } from './UseCases/getUsers/getUsersControllers';

const router = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();
const editUserController = new EditUserController();
const getUsersController = new GetUsersController();

router.post('/users', createUserController.handle);
router.post('/login', authenticateUserController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);

router.get('/courses', ensureAuthenticated, (request, response) => {
  return response.json([
    { id: 1, name: 'NodeJS' },
    { id: 2, name: 'ReactJS' },
    { id: 3, name: 'React Native' },
    { id: 4, name: 'Flutter' },
    { id: 5, name: 'Elixir' },
  ]);
});
router.post('/update-user/:username', ensureAuthenticated, editUserController.handle)
router.get('/users', ensureAuthenticated, getUsersController.handle);

export { router };
