import { Request, Response } from 'express';
import { CreateUserUseCase } from './createUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, username, password } = request.body;

    const authenticateUserUseCase = new CreateUserUseCase();

    const user = await authenticateUserUseCase.execute({
      name,
      username,
      password,
    });

    return response.json(user);
  }
}

export { CreateUserController };
