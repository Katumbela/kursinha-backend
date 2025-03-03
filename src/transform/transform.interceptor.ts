/* eslint-disable prettier/prettier */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    // ✅ Se a resposta já foi enviada (exemplo: res.json()), não faz nada
    if (response.headersSent) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        const filteredData = JSON.parse(JSON.stringify(data, (key, value) => {
          if (key.toLowerCase().includes('password')) {
            return undefined;
          }
          return value;
        }));

        return {
          status: 'success',
          data: filteredData,
        };
      }),
    );
  }
}
