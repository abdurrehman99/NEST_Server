import { IsNotEmpty } from 'class-validator';
import { PersonStatus } from '../person.model';
import { PersonStatusValidator } from '../pipes/person-status-validator.pipe'

export class PersonDTO {
    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    designation : string;
    
    @IsNotEmpty()
    age : number;

    // @PersonStatusValidator()
    status : PersonStatus;
}