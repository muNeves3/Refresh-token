import { client } from '../../prisma/client';
import { hash } from 'bcryptjs';
import AppError from '../../shared/AppError';

interface IUserRequest {
  name: string;
  password: string;
  username: string;
}

class CreateUserUseCase {
  async execute({ name, password, username }: IUserRequest) {
    const userAleradyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (userAleradyExists) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await hash(password, 8);

    const newUser = await client.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
      },
    });

    return newUser;
  }
}

export { CreateUserUseCase };
