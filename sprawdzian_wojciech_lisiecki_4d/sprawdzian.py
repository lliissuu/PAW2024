__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Lisiecki Wojciech 4D"

import datetime
import json
from typing import List, Dict
from models.Teacher import Teacher
from models.Subject import Subject
from models.Student import Student
from models.Grades import Grades
from year_grade import year_grade

teachers: List[Teacher] = []
subjects: List[Subject] = []
students: List[Student] = []
grades: List[Grades] = []


with open("teachers.txt", encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) >= 3:
            _id, name, surname = int(parts[0]), parts[1], parts[2]
            teachers.append(Teacher(_id, name, surname))


teachers_dict: Dict[int, Teacher] = {t._id: t for t in teachers}


with open("subjects.txt", encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) >= 3:
            _id, name, teacher_id = int(parts[0]), parts[1], int(parts[2])
            teacher = teachers_dict.get(teacher_id)
            if teacher:
                subjects.append(Subject(_id, name, teacher))


subjects_dict: Dict[int, Subject] = {s._id: s for s in subjects}


with open("students.txt", encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) >= 4:
            _id, first_name, last_name, birth_str = int(parts[0]), parts[1], parts[2], parts[3]
            birth_date = datetime.datetime.strptime(birth_str, '%Y-%m-%d').date()
            students.append(Student(_id, first_name, last_name, birth_date))


students_dict: Dict[int, Student] = {s._id: s for s in students}


with open("grades.txt", encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) >= 3:
            student_id, subject_id = int(parts[0]), int(parts[1])
            grades_list = list(map(int, parts[2].split(',')))
            student = students_dict.get(student_id)
            subject = subjects_dict.get(subject_id)
            if student and subject:
                g = Grades(student, subject)
                for grade in grades_list:
                    try:
                        g.add_grade(grade)
                    except ValueError:
                        pass
                grades.append(g)


grades_by_student: Dict[int, List[Grades]] = {}
for g in grades:
    grades_by_student.setdefault(g.student._id, []).append(g)


grades_by_subject: Dict[int, List[int]] = {}
for g in grades:
    grades_by_subject.setdefault(g.subject._id, []).extend(g.get_grades())


students_json_output = []
print("Oceny i średnie poszczególnych uczniów:\n")

for student in students:
    print(str(student) + ":")
    student_data = {}
    for g in grades_by_student.get(student._id, []):
        grades_str = ", ".join(map(str, g.get_grades()))
        avg = round(g.get_average(),2)
        final = year_grade(avg)
        print(f"\t{g.subject.name}:")
        print(f"\t\tOceny: {grades_str}")
        print(f"\t\tŚrednia: {avg}")
        print(f"\t\tOcena końcowa: {final}")
        print()

        student_data[g.subject.name] = {
            "Oceny": grades_str,
            "Srednia": avg,
            "Ocena roczna": final
        }

    students_json_output.append({
        str(student): student_data
    })


with open("students.json", "w", encoding="utf-8") as f:
    json.dump(students_json_output, f, ensure_ascii=False, indent=4)


print("=" * 50 + "\n")

subjects_json_output = []

for subject in subjects:
    subject_grades = grades_by_subject.get(subject._id, [])
    if not subject_grades:
        continue
    grades_str = ", ".join(map(str, subject_grades))
    avg = round(sum(subject_grades) / len(subject_grades), 2)
    print(f"{subject.name}:")
    print(f"Nauczyciel: {subject.teacher}")
    print(f"Oceny: {grades_str}")
    print(f"Średnia: {avg}\n")

    subjects_json_output.append({
        subject.name: {
            "Nauczyciel": str(subject.teacher),
            "Oceny": subject_grades,
            "Srednia": avg
        }
    })


with open("subjects.json", "w", encoding="utf-8") as f:
    json.dump(subjects_json_output, f, ensure_ascii=False, indent=4)

