import { client } from "../prisma/client"
import dayjs from "dayjs";

class GenerateRefreshToken {

    async execute(userId: string) {
        const expiresIn = dayjs().add(15, "minutes").unix();

        const generateRefreshToken = await client.refreshToken.create({
            data: {
                userId,
                expiresIn
            }
        });

        return generateRefreshToken
    }

}

export { GenerateRefreshToken }