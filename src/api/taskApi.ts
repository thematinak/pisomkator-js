export enum TaskLevelEnum {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
    SUPER_HARD = 'SUPER_HARD'
}

const dummyData: TaskApiType[] = [
    {
        id: 1,
        level: TaskLevelEnum.EASY,
        latexText: 'test1',
        htmlValue: '<span>test1</span>'
    },
    {
        id: 2,
        level: TaskLevelEnum.EASY,
        latexText: 'test2',
        htmlValue: '<span>test2</span>'
    },
    {
        id: 3,
        level: TaskLevelEnum.EASY,
        latexText: 'test3',
        htmlValue: '<span>test3</span>'
    },
    {
        id: 4,
        level: TaskLevelEnum.EASY,
        latexText: 'test4',
        htmlValue: '<span>test4</span>'
    },
];

export type TaskApiType = {
    id: number,
    level: TaskLevelEnum,
    latexText: string,
    htmlValue: string,
}
export function getTaskData(offset: number, pageSize: number, callBack: (tastApi: TaskApiType[]) => void) {
    callBack(dummyData);
}