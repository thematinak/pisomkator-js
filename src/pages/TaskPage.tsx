import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { getTaskData, TaskApiType } from '../api/taskApi';
import { PageType, StoreType } from '../core/AppRoutes';
import { Button, ButtonGroup, ButtonTypeEnum, CheckBox, Col, Row, TextArea } from '../core/FormItems';
import { DeleteIcon, EditIcon } from '../core/IconComponent';
import TableWithPages from '../core/TableWithPages';


export type TaskStoreType = {
  tasksExam: {
    [key: number]: TaskApiType
  }
}

export const TASK_STORE_DEFAULT: TaskStoreType = {
  tasksExam: {}
}

function handleSelected(isSelected: boolean, taskData: TaskApiType, store: StoreType, disp: (obj: any) => void) {
  let newStore: StoreType = { ...store, task: { ...store.task, tasksExam: { ...store.task.tasksExam } } };

  if (isSelected && newStore.task.tasksExam[taskData.id] === undefined) {
    newStore.task.tasksExam[taskData.id] = taskData;
    disp(newStore);
  } else if (!isSelected && newStore.task.tasksExam[taskData.id] !== undefined) {
    delete newStore.task.tasksExam[taskData.id];
    disp(newStore);
  }
}

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function TaskPage({ store, setStore }: PageType) {
  let query = useQuery();

  console.log(query.get("themeId"));
  return (
    <>
      <ChoosenTasks tasks={store.task.tasksExam} />
      <TableWithPages
        loadData={getTaskData}
        columnHandler={[
          {
            label: '#',
            renderer: (props: TaskApiType) => (
              <CheckBox
                checked={store.task.tasksExam[props.id] !== undefined || false}
                onChange={(e) => handleSelected(e.target.checked, props, store, setStore)} />
            )
          },
          {
            label: '',
            renderer: (props: TaskApiType) => <ShowRow {...props} />
          }]} />
    </>
  );
}

type ChoosenTasksType = {
  tasks: {
    [key: number]: TaskApiType
  }
}
function ChoosenTasks({ tasks }: ChoosenTasksType) {
  return (
    <div>
      {Object.values(tasks).map(i => <ShowTask key={i.id} taskData={i} />)}
    </div>
  );
}

function ShowRow(props: TaskApiType) {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <Row>
      <Col size={10}>
        <ShowTask taskData={props} edit={showEdit} onChange={console.log} />
      </Col>
      <Col size={2}>
        <ButtonGroup>
          <Button lvl={ButtonTypeEnum.WARN} onClick={() => setShowEdit(!showEdit)}><EditIcon /></Button>
          <Button lvl={ButtonTypeEnum.DANGER}><DeleteIcon /></Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
}

type ShowTaskType = {
  taskData: TaskApiType,
  edit?: boolean,
  onChange?: (data: string) => void,
}
function ShowTask({ taskData, edit=false, onChange }: ShowTaskType) {
  let htmlTxt = { __html: String(taskData.htmlValue) }

  return (
    <div>
      <div dangerouslySetInnerHTML={htmlTxt} />
      { onChange && edit && <TextArea label='LaTeX' value={taskData.latexText} onChange={e => onChange(e.target.value)} />}
    </div>
  );
}

export default TaskPage;