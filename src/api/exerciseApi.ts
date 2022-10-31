export enum ExerciseLevelEnum {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
    SUPER_HARD = 'SUPER_HARD'
}

let dummyData: ExerciseApiType[] = [
    {
        id: 1,
        level: ExerciseLevelEnum.EASY,
        latexText: 'test1',
        htmlValue: '<span>test1</span>'
    },
    {
        id: 2,
        level: ExerciseLevelEnum.EASY,
        latexText: 'test2',
        htmlValue: '<span>test2</span>'
    },
    {
        id: 3,
        level: ExerciseLevelEnum.EASY,
        latexText: 'test3',
        htmlValue: '<span>test3</span>'
    },
    {
        id: 4,
        level: ExerciseLevelEnum.EASY,
        latexText: 'test4',
        htmlValue: '<span>test4</span>'
    },
];

export type ExerciseApiType = {
    id: number,
    level: ExerciseLevelEnum,
    latexText: string,
    htmlValue: string,
}
export function getExercisesData(themeId: string, offset: number, pageSize: number, callBack: (ExerciseApi: ExerciseApiType[]) => void) {
    callBack(dummyData);
}

export function editExercise(ExerciseId: number, newData: ExerciseApiType, callBack: (result: boolean) => void) {
    dummyData = dummyData.map(i => { 
        if (i.id !== ExerciseId) { 
            return i;
        } else {
            return {...newData, htmlValue: `<span>${newData.latexText}</span>` };
        } 
    });
    
    callBack(true);
}

export function deleteExercise(ExerciseId: number, callBack: (result: boolean) => void) {
    dummyData = dummyData.filter(t => t.id !== ExerciseId);
    callBack(true);
}