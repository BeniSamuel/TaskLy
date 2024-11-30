import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Tasks } from './entities/tasks.entity';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'beni@ish',
      database: 'tasks',
      entities: [ User, Tasks ],
      synchronize: true,
    }),
    TaskModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
