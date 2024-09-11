import {Body, CanActivate,ExecutionContext,Injectable,UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: "privateKey"
                }
            );
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            // console.log(request.method);
            // if(request.method === 'GET'){
            //     request['user'] = payload.username;
            // }else{
            //     request.body['createdBy'] = payload.username;
            // }
            // console.log(Body);
            //request['user'] = payload;
            //console.log(request.user);
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}