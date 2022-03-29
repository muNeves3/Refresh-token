import { client } from '../../prisma/client';
import { hash } from 'bcryptjs';
import AppError from '../../shared/AppError';

interface IEditUserRequest {
  name: string;
  username: string;
}

class EditUserUseCase {
  async execute({ name, username }: IEditUserRequest) {
    const editedUser = await client.user.update({
      where: {
        username,
      },
      data: {
        name,
      },
    });

    if (!editedUser) {
      throw new AppError('User could not be found');
    }

    return editedUser;
  }
}

export { EditUserUseCase };
