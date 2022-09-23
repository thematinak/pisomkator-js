import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { PageType } from '../core/AppRoutes';
import TableWithPages from '../core/TableWithPages';

enum TaskLevelEnum {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  SUPER_HARD = 'SUPER_HARD'
}

export type TaskStoreType = {
  idForExam: number[]
}

export const TASK_STORE_DEFAULT: TaskStoreType = {
  idForExam: []
}

type TaskDataType = {
  id: number,
  level: TaskLevelEnum,
  latexText: string,
  htmlValue: string,
}

const dummyData: TaskDataType[] = [
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

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function TaskPage({ store, setStore }: PageType) {
  let query = useQuery();

  console.log(query.get("themeId"));
  return (
    <>
      <ChoosenTasks ids={store.task.idForExam} />
      <TableWithPages
        loadData={(offset, pageSize) => dummyData.map(i => ({ id: i.id, data: i }))}
        columnHandler={[{
          name: 'Priklady',
          renderer: (props: TaskDataType) => (
            <ShowTask
              taskData={props}
              onChange={console.log}
              onButtonActions={[{ label: 'Delete', type: 'danger', action: (() => console.log("delete", props.id)) }]} />
          )
        }]}
        actions={[
          {
            label: 'Pridaj do pisomky', action: ((ids) => {
              setStore({ ...store, task: { idForExam: [...ids] } })
              return true;
            })
          },
          {
            label: 'Vytvor pisomku', action: ((ids) => {
              console.log(ids);
              return true;
            })
          },
        ]} />
    </>
  );

}

type ChoosenTasksType = {
  ids: number[]
}
function ChoosenTasks({ ids }: ChoosenTasksType) {
  const [tasks, setTasks] = useState<TaskDataType[]>([]);
  useEffect(() => setTasks(dummyData.filter(i => ids.includes(i.id))), [ids]);
  console.log('ChoosenTasks', ids, tasks, dummyData);

  return (
    <div>
      {tasks.map(i => <ShowTask key={i.id} taskData={i} />)}
    </div>
  );
}


type ShowTaskType = {
  taskData: TaskDataType,
  onChange?: (data: string) => void,
  onButtonActions?: {
    label: string,
    type: string,
    action: (() => void)
  }[]
}
function ShowTask({ taskData, onChange, onButtonActions }: ShowTaskType) {
  let htmlTxt = { __html: String(taskData.htmlValue) }
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div>
      {onChange && <button onClick={() => setShowEdit(!showEdit)} >Edit</button>}
      {onButtonActions && onButtonActions.map(i => <button key={i.label} onClick={() => i.action()} >{i.label}</button>)}
      <div dangerouslySetInnerHTML={htmlTxt} />
      {onChange && showEdit && <textarea value={taskData.latexText} onChange={e => onChange(e.target.value)} />}
    </div>
  );
}

export default TaskPage;