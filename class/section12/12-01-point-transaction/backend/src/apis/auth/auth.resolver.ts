import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/context';
import { Query, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<string> {
    return this.authService.login({ email, password, context });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  fetchUser(
    @Context()
    context: IContext,
  ): string {
    console.log(context);
    return '인가 성공';
  }
  // 1. refreshToken 인가
  // 2. accessToken 재발금

  @UseGuards(GqlAuthGuard('refresh'))
  @Mutation(() => String)
  restoreAccessToken(@Context() context: IContext) {
    return this.authService.restoreAccessToken({ user: context.req.user });
  }
}
