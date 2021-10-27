import csv
import os

# os.mkdir("4_students_average")
students_report = open('4_students_average/students_report.csv', mode="w", encoding="utf-8-sig", newline="")
students_summary = open('3_students_grades/students_summary.csv', mode="r", encoding="utf-8-sig")

csv_students_report = csv.writer(students_report)
csv_students_summary = csv.reader(students_summary)

header = ["ID", "Name", "Class", "Toán 15p", "Toán 1 Tiết", "Toán Cuối Kì", "Văn 15p", "Văn 1 Tiết", "Văn Cuối Kì", "Trung Bình Toán", "Trung Bình Văn", "Điểm Tổng", "Học Lực"]
csv_students_report.writerow(header)

report_lists = []
next(csv_students_summary)

for s in csv_students_summary:
	s_new = ["","","","","","","","","","","","",""]
	for i in range(9):
		s_new[i] = s[i]

	average_math = (float(s[3])+float(s[4])+float(s[5]))/3
	average_math = round(average_math,1)
	s_new[9] = average_math

	average_literature = (float(s[6])+float(s[7])+float(s[8]))/3
	average_literature = round(average_literature,1)
	s_new[10] = average_literature

	average = (average_math + average_literature)/2
	average = round(average,1)
	s_new[11] = average

	rank = ""
	if average >= 8.0:
		rank = "Giỏi"
	elif average >= 6.5:
		rank = "Tiên Tiến"
	else:
		rank = "Trung Bình"
	s_new[12] = rank

	report_lists.append(s_new)

csv_students_report.writerows(report_lists)