import {ArgumentsHost,Catch, ExceptionFilter, HttpException} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码

    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const exceptionRespones:any = exception.getResponse()
    let validatorMsg = ''
    if(typeof exceptionRespones === 'object'){
      validatorMsg = typeof exceptionRespones.message === 'string' ? exceptionRespones.message : exceptionRespones.message.toString()
    }
    const errorResponse = {
      data: {},
      message: validatorMsg || message,
      code: -1,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}