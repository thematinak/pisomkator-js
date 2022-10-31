import React from 'react';
import { useAtom } from 'jotai';
import { EXAM_TASKS_ATOM } from '../core/AppState';
import { Button, ButtonGroup, ButtonTypeEnum } from '../core/FormItems';
import { ShowTask } from './TaskPage';

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

function PrintTaskPage() {
    const [choosenTasks, setChoosenTasks] = useAtom(EXAM_TASKS_ATOM);
    const tasks = suffle(Object.values(choosenTasks));
    return (<>
        <ol className='list-group list-group-flush list-group-numbered'>
            {tasks.map(i => <li className='list-group-item' key={i.id}><ShowTask taskData={i} /></li>)}
        </ol>
        <div className='print-hide'>
            <ButtonGroup>
                <Button lvl={ButtonTypeEnum.PRIMARY} onClick={() => setChoosenTasks({...choosenTasks})}>Zamiesaj</Button>
                <Button lvl={ButtonTypeEnum.SUCCESS} onClick={() => setChoosenTasks({})}>Zmaz - skoncil som</Button>
            </ButtonGroup>
        </div>
    </>
    );
}

export default PrintTaskPage;