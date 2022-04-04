import { Request, Response } from 'express';
import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { username } = request.params;

    const editUserUseCase = new DeleteUserUseCase();

    const deletedUser = await editUserUseCase.execute({
      username,
    });

    return response.json(deletedUser);
  }
}

export { DeleteUserController };
