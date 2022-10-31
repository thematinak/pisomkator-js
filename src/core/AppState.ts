import { atom } from "jotai";
import { ExerciseApiType } from "../api/exerciseApi";

export type ExamExercisesType = {
    [key: number]: ExerciseApiType
}
  
export const EXAM_EXERCISES_DEFAULT: ExamExercisesType = {}

export const EXAM_EXERCISES_ATOM = atom(EXAM_EXERCISES_DEFAULT);