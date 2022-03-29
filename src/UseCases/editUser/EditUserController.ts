import { Request, Response } from 'express';
import { EditUserUseCase } from './EditUserUseCase';

class EditUserController {
  async handle(request: Request, response: Response) {
    const { username } = request.params;
    const { name } = request.body;

    const editUserUseCase = new EditUserUseCase();

    const user = await editUserUseCase.execute({
      name,
      username,
    });

    return response.json(user);
  }
}

export { EditUserController };
