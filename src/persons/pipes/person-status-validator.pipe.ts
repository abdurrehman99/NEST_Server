import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { PersonStatus } from "../person.model";

export class PersonStatusValidator implements PipeTransform {
    readonly allowedStatus = [
        PersonStatus.INTERN,
        PersonStatus.PERMANENT,
        PersonStatus.PROBATION,
    ];

    transform(value :string ,metaData : ArgumentMetadata) {
        value = value.toUpperCase();
        if(!this.isValid(value)){
            throw new BadRequestException(`${value} is not valid status`)
        }
        return value;
    }

    private isValid(status :any) {
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}