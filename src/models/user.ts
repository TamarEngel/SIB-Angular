export class User {
    constructor(
        public id: number,
        public userId: number,
        public name: string,
        public email: string,
        public passwordHash: string,
        //public role: ERole,
        public createdAt: Date = new Date(),
        public isDeleted: boolean = false,
        public userCreationList: Creation[] = []
    ){}
}

export class Creation {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public creationDate: Date
    ){}
}

// export enum ERole {
//     Admin = 'Admin',
//     User = 'User',
// }