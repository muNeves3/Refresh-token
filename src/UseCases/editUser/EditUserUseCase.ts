import { client } from '../../prisma/client';
import { hash } from 'bcryptjs';
import AppError from '../../shared/AppError';

interface IEditUserRequest {
  name: string;
  username: string;
}

class EditUserUseCase {
  async execute({ name, username }: IEditUserRequest) {

    try {

      const editedUser = await client.user.update({
        where: {
          username,
        },
        data: {
          name,
        },
      });

      return editedUser;
    } catch(e) {
      throw new AppError('User could not be found', 401);
    }

  }
}

export { EditUserUseCase };
