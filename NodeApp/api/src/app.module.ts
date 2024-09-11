import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';



@Module({
  imports: [

    /** ---- DataBase Connection for Localhost */
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'api',
      entities: [User],
      synchronize: true,
    }),

    UserModule,

    /** ---- DataBase Connection for Remote DB */

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '123',
    //   database: 'api',
    //   entities: [User],
    //   synchronize: true,
    // }),
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
