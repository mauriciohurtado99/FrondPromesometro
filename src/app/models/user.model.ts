export class User{
    constructor(
        public _id: string,
        public  nombre: string,
        public apellido: string,
        public nick: string,
        public email: string,
        public password: string,
        public rol: string,
        public image: string 
    ){}
}