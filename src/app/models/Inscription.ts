import { Course } from "./course";
import { Student } from "./student";

export class Inscription {
    constructor(
        public id: number,
        public student: Student,
        public course: Course,
        public isActive: boolean
    )
    {}
}