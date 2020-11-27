import { Injectable, NotFoundException } from '@nestjs/common';
import { Person } from './person.model';
import * as uuid from 'uuid/v1';
import { PersonDTO } from './dto/create-person.dto';
import { StatusFilterDTO } from './dto/status-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class PersonService {
  private persons: Person[] = [];

  constructor(
    @InjectModel('Employee') private readonly personModel: Model<Person>,
  ) {}

  async addPerson(personDTO: PersonDTO) {
    let { name, designation, age, status } = personDTO;
    // const person :Person = {
    //     id : uuid(),
    //     name,
    //     designation,
    //     age,
    //     status,
    // };
    const person = new this.personModel({
      id: uuid(),
      name,
      designation,
      age,
      status,
    });

    const result = await person.save();
    console.log(result);
    return result.id as string;
  }

  async getAllPersons() {
    const result = await this.personModel.find({});
    console.log(result);
    return result as Person[];
  }

  getFilteredPersons(statusFilter: StatusFilterDTO) {
    const { status, title } = statusFilter;
    let filteredperson = this.getAllPersons();
    // if (status) {
    //     filteredperson = filteredperson.filter(t => t.status === status);
    // }
    // if (title) {
    //     filteredperson = filteredperson.filter(t => t.name.includes(title));
    // }
    return filteredperson;
  }

  async getPersonById(id: string) {
    let person = await this.personModel.findById({ _id: id });
    if (!person) throw new NotFoundException(`Person with ID :${id} not found`);
    return person as Person;
  }

  async deletePerson(id: string) {
    await this.personModel.findOneAndDelete({ _id: id });
  }

  async updatePerson(id: string, personDTO: PersonDTO) {
    await this.personModel.findOneAndUpdate(
      { _id: id },
      {
        name: personDTO.name,
        age: personDTO.age,
        designation: personDTO.designation,
        status: personDTO.status,
      },
    );
  }
}
