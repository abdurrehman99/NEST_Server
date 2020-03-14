import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, Query, UseGuards, Req } from "@nestjs/common";
import { PersonService } from "./person.services";
import { Person } from "./person.model";
import { PersonDTO } from "./dto/create-person.dto";
import { PersonStatusValidator } from "./pipes/person-status-validator.pipe";
import { StatusFilterDTO } from "./dto/status-filter.dto";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";

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
            const res =  await this.personService.getAllPersons();
            // console.log('res ==>',res)
            return res
        }
    }
    @Post('add')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async addPerson(@Req() req,@Body() personDTO :PersonDTO ,@Body('status' ,PersonStatusValidator ) status :string ) {
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

    @Post('test')
    @UseGuards(AuthGuard())
    test(@Req() req){
        console.log(req);
    }
}