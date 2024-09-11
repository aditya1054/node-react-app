import { Body, Controller, Delete, Request, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserModel } from './user.model';
import { ApiResponse } from './response.model';
import { UserService } from './user.service';
import { AuthGuard } from './authguard.guard';
import { QueryFailedError } from 'typeorm';

@ApiTags('User')
@Controller('user')
export class UserController {
  private response: ApiResponse<UserModel> = new ApiResponse<UserModel>();

  constructor(private readonly usersService: UserService, private readonly authService: AuthService) {

  }

  /**
   * 
   * @param user 
   * @returns 
   */
  //@UseGuards(AuthGuard)
  //@ApiBearerAuth('JWT')
  @Post('create')
  async create(@Body() user: UserModel) {
    await this.usersService.create(user).then(x => {
      this.response.Status = true;
      this.response.Data = x;
    }).catch((e: QueryFailedError) => {
      this.response.Status = false;
      this.response.Message = e.message;
      this.response.Data = [];
    });
    return this.response;
  }

  /**
   * 
   * @param user 
   * @returns User Auth Token
   */

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() user: UserModel) {
    await this.authService.signIn(user.username, user.password).then(x => {
      this.response.Status = true;
      this.response.Data = x;
      this.response.Message = "";
    }).catch((e: QueryFailedError) => {
      this.response.Status = false;
      this.response.Message = e.message;
      this.response.Data = [];
    });
    return this.response;
  }



  /**
   * 
   * @param req 
   * @returns 
   */
  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT')
  getProfile(@Request() req) {
    this.usersService.findUser(req.user.username).then(x => {
      this.response.Status = true;
      this.response.Data = x;
      this.response.Message = "";
    }).catch((e: QueryFailedError) => {
      this.response.Status = false;
      this.response.Message = e.message;
      this.response.Data = [];
    });
    return this.response;
  }



  /**
   * 
   * @returns 
   */
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  @Get('/getAllUser')
  async findAll(@Request() req) {
    await this.usersService.findAll().then(x => {
      this.response.Status = true;
      this.response.Data = x;
    }).catch((e: QueryFailedError) => {
      this.response.Status = false;
      this.response.Message = e.message;
      this.response.Data = [];
    });
    return this.response;
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  @Get('find/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /**
   * 
   * @param id 
   * @param user 
   * @returns 
   */
  @Patch('update/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  update(@Param('id') id: string, @Body() user: UserModel) {
    this.usersService.update(+id, user).then(x => {
      this.response.Status = true;
      this.response.Data = x;
    }).catch((e: QueryFailedError) => {
      this.response.Status = false;
      this.response.Message = e.message;
      this.response.Data = [];
    });
    return this.response;
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT')
  remove(@Param('id') id: string) {
    this.usersService.remove(+id).then(x => {
      this.response.Status = true;
      this.response.Data = x;
    }).catch((e: QueryFailedError) => {
      this.response.Status = false;
      this.response.Message = e.message;
      this.response.Data = [];
    });
    return this.response;
  }
}
