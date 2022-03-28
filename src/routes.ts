import { Router } from 'express';
import { CreateUserController } from './UseCases/createUser/createUserController';
import { AuthenticateUserController } from './UseCases/authenticateUser/authenticateUserController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticaded';
import { RefreshTokenUserController } from './UseCases/refreshTokenUser/refreshTokenUserController';

const router = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

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

export { router };
