import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || 'unknown';
    const startTime = Date.now();

    this.logger.log(
      `Request: ${method} ${url} - From: ${ip} - User-Agent: ${userAgent}`,
    );

    return next.handle().pipe(
      tap({
        next: (data: any) => {
          const responseTime = Date.now() - startTime;
          this.logger.log(
            `Response: ${method} ${url} - Status: ${response.statusCode} - Time: ${responseTime}ms`,
          );
        },
        error: (err) => {
          const responseTime = Date.now() - startTime;
          this.logger.error(
            `Response: ${method} ${url} - Status: ${err.status || 500} - Time: ${responseTime}ms - Error: ${err.message}`,
          );
        },
      }),
    );
  }
} 
