import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, Query } from "@nestjs/common";
import { PersonService } from "./person.services";
import { Person } from "./person.model";
import { PersonDTO } from "./dto/create-person.dto";
import { PersonStatusValidator } from "./pipes/person-status-validator.pipe";
import { StatusFilterDTO } from "./dto/status-filter.dto";

@Controller('persons')
export class PersonController {
    constructor(private personService : PersonService ) {}

    @Get()
    async getAllPersons(@Query(ValidationPipe) statusFilter :StatusFilterDTO ) {
        // console.log(q);
        if(Object.keys(statusFilter).length) {
            let result = await this.personService.getFilteredPersons(statusFilter);
            return result;

        }
        else{
            return this.personService.getAllPersons();

        }
        
    }

    @Post('add')
    @UsePipes(ValidationPipe)
    async addPerson(@Body() personDTO :PersonDTO ,@Body('status' ,PersonStatusValidator ) status :string ) {
       await this.personService.addPerson(personDTO);
       return  personDTO 
    }

    @Get(':id')
    async getPerson(@Param('id') id :string) {
        let result = await this.personService.getPersonById(id);
        return result as Person
    }

    @Delete(':id')
    async deletePerson(@Param('id') id :string) {
        let result = await this.personService.deletePerson(id);
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    async updatePerson(@Param('id') id :string, @Body() personDTO :PersonDTO) {
        await this.personService.updatePerson(id, personDTO);
    }
    
}