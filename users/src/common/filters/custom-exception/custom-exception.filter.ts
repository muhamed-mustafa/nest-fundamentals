import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class CustomExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const { url } = ctx.getRequest();

    const response = ctx.getResponse();

    const statusCode = exception.getStatus();

    const exceptionResponse = exception.getResponse() as
      | Record<string, unknown>
      | string
      | undefined;

    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    response.status(statusCode).json({
      ...error,
      statusCode,
      timestamp: new Date().toISOString(),
      path: url,
    });
  }
}
