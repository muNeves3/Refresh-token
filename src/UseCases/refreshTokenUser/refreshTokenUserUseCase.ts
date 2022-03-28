import dayjs from 'dayjs';
import { client } from '../../prisma/client';
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';
import { GenerateToken } from '../../provider/GenerateTokenProvider';
import AppError from '../../shared/AppError';

class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      throw new AppError('Refresh token invalid');
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn),
    );

    const generateTokenProvider = new GenerateToken();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    if (refreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId
        }
      });

      const generateRefreshTokenProvider = new GenerateRefreshToken();
      const newRefreshTokenExpired = await generateRefreshTokenProvider.execute(
        refreshToken.userId,
      );

      return { token, refreshToken: newRefreshTokenExpired }
    }

    return { token };
  }
}

export { RefreshTokenUserUseCase };
