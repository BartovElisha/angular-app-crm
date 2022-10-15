// our new Type
// this type can be 0 or 1 or 2 only
export type UserStatus = 0 | 1 | 2;

// Interface
// Our New Type
// export interface User {
//     name: string,
//     email: string
// }

// Interface Usage
// user: User = {name: 'Bob', email: 'bobEexample.com'}

export class Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    notes: string;
    createdDate: number;
    status: UserStatus;    

    constructor(
        id: number = new Date().getTime(),
        firstName:string = '',
        lastName:string = '',
        email:string = '',
        phoneNumber:string = '',
        address:string = '',
        notes:string = '',
        createdDate:number = new Date().getTime(),
        // 0-Disabled, 1-Enabled, 2-Freeze
        status: UserStatus = 1) 
        {
            this.id = id;
            this.firstName = firstName ;
            this.lastName = lastName;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.address = address;
            this.notes = notes;
            this.createdDate = createdDate;
            this.status = status;    
    }
}

