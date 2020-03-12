import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.services'
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from './person.model';

@Module({
    imports: [ MongooseModule.forFeature([{ name : 'Employee', schema : PersonSchema}]) ],
    controllers: [PersonController],
    providers: [PersonService],
})
export class PersonModule {}
