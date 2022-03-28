import { client } from '../../prisma/client';
import { compare } from 'bcryptjs';
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';
import { GenerateToken } from '../../provider/GenerateTokenProvider';
import AppError from '../../shared/AppError';

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ password, username }: IRequest) {
    const userAleradyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (!userAleradyExists) {
      throw new AppError('User or password incorrect');
    }

    const passwordMatch = await compare(password, userAleradyExists.password);
    if (!passwordMatch) {
      throw new AppError('User or password incorrect');
    }

    const generateRefreshToken = new GenerateRefreshToken();
    const generateToken = new GenerateToken();

    await client.refreshToken.deleteMany({
      where: {
        userId: userAleradyExists.id
      }
    })

    const token = await generateToken.execute(userAleradyExists.id);
    const refreshToken = await generateRefreshToken.execute(
      userAleradyExists.id,
    );

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };
