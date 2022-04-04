import { client } from '../../prisma/client';
import AppError from '../../shared/AppError';

interface IDeleteUserRequest {
  username: string;
}

class DeleteUserUseCase {
  async execute({ username }: IDeleteUserRequest) {
    try {
      const deletedUser = await client.user.delete({
        where: {
          username,
        },
      });

      return deletedUser;

    } catch (e) {
      throw new AppError('User could not be found', 401);
    }
  }
}

export { DeleteUserUseCase };
