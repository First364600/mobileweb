import { Student } from "../models/Student.js";

export class StudentManager {
    private students: Student[] = [];

    addStudent(student: Student): void {
        this.students.push(student);
        this.saveToLocalStorage();
    }

    getAllStudents(): Student[] {
        return this.students;
    }

    findStudentById(id: string): Student | undefined {
        return this.students.find(s => s.id === id);
    }

    findStudentsByTitleName(title_name: string): Student[] {
        return this.students.filter(s => 
            s.title_name.toLowerCase().includes(title_name.toLowerCase())
        );
    }

    findStudentsByFirstName(first_name: string): Student[] {
        return this.students.filter(s => 
            s.first_name.toLowerCase().includes(first_name.toLowerCase())
        );
    }

    findStudentsByLastName(last_name: string): Student[] {
        return this.students.filter(s => 
            s.last_name.toLowerCase().includes(last_name.toLowerCase())
        );
    }

    findStduentsByMajor(major: string): Student[] {
        return this.students.filter(s => 
            s.major.toLowerCase().includes(major.toLowerCase())
        );
    }

    findStudentsByEmail(email: string): Student[] {
        return this.students.filter(s => 
            s.email.toLowerCase().includes(email.toLowerCase())
        );
    }

    saveToLocalStorage(): void {
        localStorage.setItem("students", JSON.stringify(this.students));
    }

    loadFromLocalStorage(): void {
        const data = localStorage.getItem("students");
        if (data) {
            this.students = JSON.parse(data);
        }
    }
}