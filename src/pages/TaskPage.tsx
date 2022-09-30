import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { deleteTask, editTask, getTaskData, TaskApiType } from '../api/taskApi';
import { PageType, StoreType } from '../core/AppRoutes';
import { Button, ButtonGroup, ButtonTypeEnum, CheckBox, Col, Row, TextArea } from '../core/FormItems';
import { DeleteIcon, EditIcon } from '../core/IconComponent';
import TableWithPages, { RowType } from '../core/TableWithPages';


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
            renderer: (props) => (
              <CheckBox
                checked={store.task.tasksExam[props.id] !== undefined || false}
                onChange={(e) => handleSelected(e.target.checked, props, store, setStore)} />
            )
          },
          {
            label: '',
            renderer: (props) => <ShowTableCol
              changeCallBack={(newVal: string) =>
                editTask(
                  props.id,
                  { ...props, latexText: newVal },
                  (res) => {
                    if (res) {
                      props.forceReload();
                    }
                  })}
              {...props} />
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


type ShowTableColType = TaskApiType & RowType
function ShowTableCol(props: ShowTableColType) {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <Row>
      <Col size={10}>
        <ShowTask taskData={props} edit={showEdit} changeCallBack={props.changeCallBack} />
      </Col>
      <Col size={2}>
        <ButtonGroup>
          <Button lvl={ButtonTypeEnum.WARN} onClick={() => setShowEdit(!showEdit)}><EditIcon /></Button>
          <Button lvl={ButtonTypeEnum.DANGER} onClick={() => deleteTask(props.id, (res) => { if (res) { props.forceReload() } })}><DeleteIcon /></Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
}

type ShowTaskType = {
  taskData: TaskApiType,
  edit?: boolean,
  changeCallBack?: (data: string) => void,
}
function ShowTask({ taskData, edit = false, changeCallBack }: ShowTaskType) {
  let htmlTxt = { __html: String(taskData.htmlValue) }
  const [text, setText] = useState(taskData.latexText);
  return (
    <div>
      <div dangerouslySetInnerHTML={htmlTxt} />
      {changeCallBack && edit && <TextArea
        label='LaTeX'
        value={text}
        onChange={e => setText(e.target.value)}
        onBlur={() => {
          if (text !== taskData.latexText) {
            changeCallBack(text);
          }
        }}
      />}
    </div>
  );
}

export default TaskPage;