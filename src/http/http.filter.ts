/* eslint-disable prettier/prettier */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // ✅ Verifica se os headers já foram enviados
    if (response.headersSent) {
      console.warn('Tentativa de enviar resposta duplicada ignorada.');
      return;
    }

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      status: 'error',
      message: exception.message || 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
}
