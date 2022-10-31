import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { deleteTask, editTask, getTaskData, TaskApiType } from '../api/taskApi';
import { ExamTasksType, EXAM_TASKS_ATOM } from '../core/AppState';
import { Button, ButtonGroup, ButtonTypeEnum, CheckBox, Col, Row, TextArea } from '../core/FormItems';
import { DeleteIcon, EditIcon } from '../core/IconComponent';
import TableWithPages, { RowType } from '../core/TableWithPages';
import { useQuery } from '../api/queryApi';


function handleSelected(isSelected: boolean, taskData: TaskApiType, examTasks: ExamTasksType, setter: (obj: ExamTasksType) => void) {
  let newStore: ExamTasksType = { ...examTasks };
  
  if (isSelected && examTasks[taskData.id] === undefined) {
    newStore[taskData.id] = taskData;
    setter(newStore);
  } else if (!isSelected && examTasks[taskData.id] !== undefined) {
    delete newStore[taskData.id];
    setter(newStore);
  }
}

function TaskPage() {
  const query = useQuery().get("themeId") || '';
  const [choosenTasks, setChoosenTasks] = useAtom(EXAM_TASKS_ATOM);
  
  return (
    <>
      <ChoosenTasks />
      <TableWithPages
        loadData={(offset: number, size: number, f: (tastApi: TaskApiType[]) => void) => getTaskData(query, offset, size, f)}
        columnHandler={[
          {
            label: '#',
            renderer: props => <CheckBox
              checked={choosenTasks[props.id] !== undefined || false}
              onChange={(e) => handleSelected(e.target.checked, props, choosenTasks, setChoosenTasks)} />
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
          }
        ]} />
    </>
  );
}

function ChoosenTasks() {
  const [choosenTasks] = useAtom(EXAM_TASKS_ATOM);
  const taskArr = Object.values(choosenTasks);
  return (
    <div>
      {taskArr.map(i => <ShowTask key={i.id} taskData={i} />)}
      {taskArr.length !== 0 ? <Link className='btn btn-primary' to={'/tasksprint'}>Print</Link> : <div />}
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
export function ShowTask({ taskData, edit = false, changeCallBack }: ShowTaskType) {
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