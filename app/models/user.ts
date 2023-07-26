export type User = {
    firstName? : string; 
    lastName? : string;
    gender? : string;
    age? : number;
    email? : string;
    phone? : string;
    address? : {
        address? : string;
        street? :string;
        city? :string;
        state? :string;
        zipCode? :string;
    };
}