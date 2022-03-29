import { sign } from 'jsonwebtoken';


class GenerateToken {

    async execute(userId: string) {
        const token = sign({}, '0493e565-0dcb-4d52-93d0-3dcf749edd5a', {
            subject: userId,
            expiresIn: '20s',
          });
      
        return token;
    }

}

export { GenerateToken }