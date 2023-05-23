// 拦截器控制返回给前端的格式
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    // 获取请求信息
    const request = context.switchToHttp().getRequest() as Request;
    const startTime = Date.now();
    // console.log(request);
    return next.handle().pipe(
      map((data) => {
        return data?.meta ? data : { data };
      }),
    );
  }
}
