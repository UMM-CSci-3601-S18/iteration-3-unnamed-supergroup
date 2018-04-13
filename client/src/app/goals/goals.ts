export interface Goal {
    _id: string;
    name: string;
    owner: string;
    body: string;
    category: string;
    startDate: Date;
    endDate: Date;
    frequency: string;
    status: boolean;
    email: string;
}
