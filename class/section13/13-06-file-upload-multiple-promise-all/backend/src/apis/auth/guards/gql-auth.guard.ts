import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export const GqlAuthGuard = (name) => {
  return class GqlAuthGuard extends AuthGuard(name) {
    getRequest(context: ExecutionContext) {
      const gqlContext = GqlExecutionContext.create(context);
      return gqlContext.getContext().req;
    }
  };
};

// export class GqlAuthAccessGuard extends AuthGuard('access') {
//   //오버로딩
//   getRequest(context: ExecutionContext) {
//     const gqlContext = GqlExecutionContext.create(context);
//     return gqlContext.getContext().req;
//   }
// }

// export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
//   //오버로딩
//   getRequest(context: ExecutionContext) {
//     const gqlContext = GqlExecutionContext.create(context);
//     return gqlContext.getContext().req;
//   }
// }
