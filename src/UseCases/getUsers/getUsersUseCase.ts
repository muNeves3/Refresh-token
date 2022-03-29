import { client } from '../../prisma/client';

class GetUsersUseCase {
  async execute() {
    const users = await client.user.findMany();

    return users;
  }
}

export { GetUsersUseCase };
