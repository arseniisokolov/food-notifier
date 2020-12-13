import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';

@Injectable()
export class AppMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        if (req.path.includes('shop')) {
            return next();
        }
        res.sendFile(join(process.cwd(), 'dist/client/index.html'));
    }
}