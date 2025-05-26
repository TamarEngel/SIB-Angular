export class Challenge{
    constructor(
        public id: number,
        public title: string, 
        public description: string, 
        public startDate: Date, 
        public endDate: Date, 
        public winnerCreationId?: number, 
        public countCreations: number = 0, 
        public isDeleted: boolean = false, 
        public createdAt: Date = new Date() 
    ){}
}
