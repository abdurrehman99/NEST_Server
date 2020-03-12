import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
    id : { type :String ,required :true },
    name : { type :String ,required :true  },
    designation : { type :String ,required :true  },
    age : { type :Number ,required :true  },
    status : { type :String ,required :true  }
})

export interface Person {
    id : string,
    name : string,
    designation : string,
    age : number,
    status : PersonStatus;
}

export enum PersonStatus {
    PERMANENT = 'PERMANENT',
    INTERN = 'INTERN',
    PROBATION = 'PROBATION',
}