import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('this is during request');
    console.log(context);

    return next.handle().pipe(
      map((data) => {
        console.log('this is during response');
        console.log(data);
        return data;
      }),
    );
  }
}
