export class Usuario {

    constructor(
        public _id:string,
        public nombre:string,
        public edad: Number,
        public correo:string,
        public password:string,
        public imagen:string,
        public role:string
    ){}
}