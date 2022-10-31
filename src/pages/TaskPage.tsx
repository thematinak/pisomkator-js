import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { deleteExercise, editExercise, getExercisesData, ExerciseApiType } from '../api/taskApi';
import { ExamExercisesType, EXAM_EXERCISES_ATOM } from '../core/AppState';
import { Button, ButtonGroup, ButtonTypeEnum, CheckBox, Col, Row, TextArea } from '../core/FormItems';
import { DeleteIcon, EditIcon } from '../core/IconComponent';
import TableWithPages, { RowType } from '../core/TableWithPages';
import { useQuery } from '../api/queryApi';
import { EXAM_PRINT_PAGE_PATH } from '../core/AppRoutes';


function handleSelected(isSelected: boolean, exercises: ExerciseApiType, examExercises: ExamExercisesType, setter: (obj: ExamExercisesType) => void) {
  let newStore: ExamExercisesType = { ...examExercises };
  
  if (isSelected && examExercises[exercises.id] === undefined) {
    newStore[exercises.id] = exercises;
    setter(newStore);
  } else if (!isSelected && examExercises[exercises.id] !== undefined) {
    delete newStore[exercises.id];
    setter(newStore);
  }
}

function ExercisesPage() {
  const query = useQuery().get("themeId") || '';
  const [choosenExercises, setChoosenExercises] = useAtom(EXAM_EXERCISES_ATOM);
  
  return (
    <>
      <ChoosenExercises />
      <TableWithPages
        loadData={(offset: number, size: number, f: (tastApi: ExerciseApiType[]) => void) => getExercisesData(query, offset, size, f)}
        columnHandler={[
          {
            label: '#',
            renderer: props => <CheckBox
              checked={choosenExercises[props.id] !== undefined || false}
              onChange={(e) => handleSelected(e.target.checked, props, choosenExercises, setChoosenExercises)} />
          },
          {
            label: '',
            renderer: (props) => <ShowTableCol
              changeCallBack={(newVal: string) =>
                editExercise(
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

function ChoosenExercises() {
  const [choosenExercises] = useAtom(EXAM_EXERCISES_ATOM);
  const exercises = Object.values(choosenExercises);
  return (
    <div>
      {exercises.map(i => <ShowExercise key={i.id} exercise={i} />)}
      {exercises.length !== 0 ? <Link className='btn btn-primary' to={EXAM_PRINT_PAGE_PATH}>Print</Link> : <div />}
    </div>
  );
}


type ShowTableColType = ExerciseApiType & RowType
function ShowTableCol(props: ShowTableColType) {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <Row>
      <Col size={10}>
        <ShowExercise exercise={props} edit={showEdit} changeCallBack={props.changeCallBack} />
      </Col>
      <Col size={2}>
        <ButtonGroup>
          <Button lvl={ButtonTypeEnum.WARN} onClick={() => setShowEdit(!showEdit)}><EditIcon /></Button>
          <Button lvl={ButtonTypeEnum.DANGER} onClick={() => deleteExercise(props.id, (res) => { if (res) { props.forceReload() } })}><DeleteIcon /></Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
}

type ShowExerciseType = {
  exercise: ExerciseApiType,
  edit?: boolean,
  changeCallBack?: (data: string) => void,
}
export function ShowExercise({ exercise, edit = false, changeCallBack }: ShowExerciseType) {
  let htmlTxt = { __html: String(exercise.htmlValue) }
  const [text, setText] = useState(exercise.latexText);
  return (
    <div>
      <div dangerouslySetInnerHTML={htmlTxt} />
      {changeCallBack && edit && <TextArea
        label='LaTeX'
        value={text}
        onChange={e => setText(e.target.value)}
        onBlur={() => {
          if (text !== exercise.latexText) {
            changeCallBack(text);
          }
        }}
      />}
    </div>
  );
}

export default ExercisesPage;