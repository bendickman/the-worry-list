export interface IWorryItem {
    id: string;
    createdDate: Date;
    modifiedDate: Date;
    isComplete: boolean;
    isDeleted: boolean;
    situation: string;
    emotions: string;
    anxietyLevel: number;
    thoughts: string;
    beliefs: string;
    thinkingStyle: string;
    positiveResponse: string;
    actions: string;
}