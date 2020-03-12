import { PersonModule } from './persons/person.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ PersonModule, MongooseModule.forRoot(
    'mongodb+srv://syedebad:IXraoFyJXbhWUlYs@cluster0-xt32z.mongodb.net/XORD?retryWrites=true&w=majority')
  ],
})
export class AppModule {}
