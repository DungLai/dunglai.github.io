import os 
import csv

# os.mkdir("1_teachers_unfilled")

students = open("students.csv", mode="r", encoding="utf-8-sig")
students_10A1_math = open("1_teachers_unfilled/10A1_math.csv", mode="w", encoding="utf-8-sig", newline="")
students_10A2_math = open("1_teachers_unfilled/10A2_math.csv", mode="w", encoding="utf-8-sig", newline="")
students_10A3_math = open("1_teachers_unfilled/10A3_math.csv", mode="w", encoding="utf-8-sig", newline="")
students_10A1_literature = open("1_teachers_unfilled/10A1_literature.csv", mode="w", encoding="utf-8-sig", newline="")
students_10A2_literature = open("1_teachers_unfilled/10A2_literature.csv", mode="w", encoding="utf-8-sig", newline="")
students_10A3_literature = open("1_teachers_unfilled/10A3_literature.csv", mode="w", encoding="utf-8-sig", newline="")

csv_students = csv.reader(students)
csv_10A1_math = csv.writer(students_10A1_math)
csv_10A2_math = csv.writer(students_10A2_math)
csv_10A3_math = csv.writer(students_10A3_math)
csv_10A1_literature = csv.writer(students_10A1_literature)
csv_10A2_literature = csv.writer(students_10A2_literature)
csv_10A3_literature = csv.writer(students_10A3_literature)

header_math = ["ID", "Name", "Class", "Toán 15p", "Toán 1 Tiết", "Toán Cuối Kì"]
header_literature = ["ID", "Name", "Class", "Văn 15p", "Văn 1 Tiết", "Văn Cuối Kì"]

for csv in [csv_10A1_math, csv_10A2_math, csv_10A3_math]:
	csv.writerow(header_math)

for csv in [csv_10A1_literature, csv_10A2_literature, csv_10A3_literature]:
	csv.writerow(header_literature)

for s in csv_students:
	if s[2] == "10A1":
		csv_10A1_math.writerow(s)
		csv_10A1_literature.writerow(s)
	if s[2] == "10A2":
		csv_10A2_math.writerow(s)
		csv_10A2_literature.writerow(s)
	if s[2] == "10A3":
		csv_10A3_math.writerow(s)
		csv_10A3_literature.writerow(s)