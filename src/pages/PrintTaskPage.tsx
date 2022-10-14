import React, { useState } from 'react';
import { PageType } from '../core/AppRoutes';
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

function PrintTaskPage({ store, setStore }: PageType) {
    const [tasks, setTasks] = useState(Object.values(store.task.tasksExam));

    return (<>
        <ol className='list-group list-group-flush list-group-numbered'>
            {tasks.map(i => <li className='list-group-item' key={i.id}><ShowTask taskData={i} /></li>)}
        </ol>
        <div className=''>
            <ButtonGroup>
                <Button lvl={ButtonTypeEnum.PRIMARY} onClick={() => setTasks(suffle(tasks))}>Zamiesaj</Button>
                <Button lvl={ButtonTypeEnum.SUCCESS} onClick={() => setStore({...store, task: {...store.task, tasksExam: []}})}>Zmaz - skoncil som</Button>
            </ButtonGroup>
        </div>
    </>
    );
}

export default PrintTaskPage;