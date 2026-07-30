import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WrappedResponse<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  WrappedResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<WrappedResponse<T>> {
    return next.handle().pipe(
      map((responseBody) => {
        if (
          responseBody &&
          typeof responseBody === 'object' &&
          'data' in responseBody
        ) {
          return responseBody as WrappedResponse<T>;
        }

        return { data: responseBody };
      }),
    );
  }
}
