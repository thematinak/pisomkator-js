import React from 'react';
import { useAtom } from 'jotai';
import { EXAM_EXERCISES_ATOM } from '../core/AppState';
import { Button, ButtonGroup, ButtonTypeEnum } from '../core/FormItems';
import { ShowExercise } from './ExercisesPage';

function suffle(arr: any[]) {
    let i = arr.length;
    let j, temp;
    let newArr = [...arr];
    if (i === 0) return newArr;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
    }
    return newArr;
}

function PrintExamePage() {
    const [choosenExercises, setChoosenExercises] = useAtom(EXAM_EXERCISES_ATOM);
    const exercises = suffle(Object.values(choosenExercises));
    return (<>
        <ol className='list-group list-group-flush list-group-numbered'>
            {exercises.map(i => <li className='list-group-item' key={i.id}><ShowExercise exercise={i} /></li>)}
        </ol>
        <div className='print-hide'>
            <ButtonGroup>
                <Button lvl={ButtonTypeEnum.PRIMARY} onClick={() => setChoosenExercises({...choosenExercises})}>Zamiesaj</Button>
                <Button lvl={ButtonTypeEnum.SUCCESS} onClick={() => setChoosenExercises({})}>Zmaz - skoncil som</Button>
            </ButtonGroup>
        </div>
    </>
    );
}

export default PrintExamePage;