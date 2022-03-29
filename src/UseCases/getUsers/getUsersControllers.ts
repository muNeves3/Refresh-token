import { Request, Response } from 'express';
import { GetUsersUseCase } from './getUsersUseCase';

class GetUsersController {
  async handle(request: Request, response: Response) {
    const getUsersUseCase = new GetUsersUseCase();

    const users = await getUsersUseCase.execute();

    return response.json(users);
  }
}

export { GetUsersController };
