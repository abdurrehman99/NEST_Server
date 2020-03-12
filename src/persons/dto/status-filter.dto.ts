import { IsOptional, IsIn } from 'class-validator';
import { PersonStatus } from '../person.model';

export class StatusFilterDTO {
    @IsOptional()
    title :string

    @IsOptional()
    @IsIn([ PersonStatus.INTERN,PersonStatus.PERMANENT,PersonStatus.PROBATION ])
    status : PersonStatus
}