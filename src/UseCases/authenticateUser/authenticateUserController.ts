import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from './authenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const user = await authenticateUserUseCase.execute({
      username,
      password,
    });

    return response.json(user);
  }
}

export { AuthenticateUserController };
