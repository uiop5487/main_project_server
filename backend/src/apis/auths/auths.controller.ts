import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { IOAuthUser } from 'src/commons/type/context';
import { AuthsService } from './auths.service';

@Controller('login')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService, //
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authsService.sosialLogin({ req, res });
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKaKao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authsService.sosialLogin({ req, res });
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authsService.sosialLogin({ req, res });
  }
}
