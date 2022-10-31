import { atom } from "jotai";
import { TaskApiType } from "../api/taskApi";

export type ExamTasksType = {
    [key: number]: TaskApiType
}
  
export const EXAM_TASKS_DEFAULT: ExamTasksType = {}

export const EXAM_TASKS_ATOM = atom(EXAM_TASKS_DEFAULT);