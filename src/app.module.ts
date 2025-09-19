import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './crud/model/entity';
import { UserModule } from './crud/crud.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',   
      password: 'ardaa4gg',       
      database: 'testdb',     
      entities: [User],
      synchronize: true,      
    }),
    UserModule,
  ],
})
export class AppModule {}
