import { Component, OnInit } from "@angular/core";
import {
  ResultRequestNew,
  ResultResponseNew,
  StudentResultNew,
} from "src/app/core/Models/api/result";
import { ReportCardService } from "src/app/core/services/api/reports.service";

@Component({
  selector: "app-report-cards",
  templateUrl: "./report-cards.component.html",
  styleUrl: "./report-cards.component.scss",
})
export class ReportCardsComponent implements OnInit {
  data: any;
  breadCrumbItems!: Array<{}>;
  inputData: string = "";
  studentResult: Array<{}> | null = null;
  currentDate: number = Date.now();
  constructor(private reportCardService: ReportCardService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "ReportCards" },
      { label: "ReportCard", active: true },
    ];
  }
  generateResult(): void {
    if (!this.inputData.trim()) {
      alert("Please enter details before generating the result.");
      return;
    }

    const request: ResultRequestNew = {
      studentId: "4ab588d2-5593-44db-a76e-598eabb6777d",
      academicPeriodId: "6bace540-248c-49b3-9730-bed84a1da3a4",
      classId: "d72bbae5-cc05-4d79-b76c-f5d314d72a30",
      grades: [],
      classProfiles: [],
      disciplines: [],
      finalResults: [],
      schools: [],
      academicPeriodName: "",
      studentResults: [
        {
          admissionNumber: this.inputData,
          subjectName: "",
          coefficient: 0,
          seq1: 0,
          seq2: 0,
          term: 0,
          total: 0,
          subjectAvg: 0,
          rank: 0,
          grade: "",
          remark: "",
        },
      ],
    };

    this.reportCardService.getResult(request).subscribe({
      next: (response) => {
        debugger;
        console.log("Result generated:", response);
        this.data = response.data;
        alert("Result generated successfully!");
      },
      error: (error) => {
        console.error("Error generating result:", error);
      },
    });
  }
}
