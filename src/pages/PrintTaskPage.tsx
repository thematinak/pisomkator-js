import React from 'react';
import { PageType, StoreType } from '../core/AppRoutes';
import { Button, ButtonGroup, ButtonTypeEnum } from '../core/FormItems';
import { ShowTask, TasksExamType } from './TaskPage';

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

function setTasksExam(storeState: StoreType, newTasksExam: TasksExamType) : StoreType {
    return {...storeState, task: {...storeState.task, tasksExam: {...newTasksExam}}};
}

function PrintTaskPage({ store, setStore }: PageType) {
    const tasks = suffle(Object.values(store.task.tasksExam));
    return (<>
        <ol className='list-group list-group-flush list-group-numbered'>
            {tasks.map(i => <li className='list-group-item' key={i.id}><ShowTask taskData={i} /></li>)}
        </ol>
        <div className='print-hide'>
            <ButtonGroup>
                <Button lvl={ButtonTypeEnum.PRIMARY} onClick={() => setStore(setTasksExam(store, store.task.tasksExam))}>Zamiesaj</Button>
                <Button lvl={ButtonTypeEnum.SUCCESS} onClick={() => setStore(setTasksExam(store, {}))}>Zmaz - skoncil som</Button>
            </ButtonGroup>
        </div>
    </>
    );
}

export default PrintTaskPage;