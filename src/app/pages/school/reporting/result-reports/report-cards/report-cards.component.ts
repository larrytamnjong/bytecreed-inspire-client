import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { ResultReportService } from 'src/app/core/services/api/result-report.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ClassSectionService } from 'src/app/core/services/api/class-section.service';
import { ClassService } from 'src/app/core/services/api/class.service';
import { AcademicService } from 'src/app/core/services/api/academics.service';
import  { finalize } from 'rxjs';
import { jsPDF } from 'jspdf';
import { SimpleAlerts } from 'src/app/core/services/notifications/sweet-alerts';
import { getErrorMessage } from 'src/app/core/helpers/error-filter';

@Component({
  selector: 'app-report-cards',
  templateUrl: './report-cards.component.html',
  styleUrl: './report-cards.component.scss'
})
export class ReportCardsComponent extends BaseComponent {
  breadCrumbItems!: Array<{}>;

  classes: any = [];
  classSections: any = [];
  academicPeriods: any = [];
  academicYears: any = [];

  getReportCardForm!: UntypedFormGroup;

  isFormValid: boolean = false;
  constructor(
    private resultReportService: ResultReportService,
    private classSectionService: ClassSectionService,
    private classService: ClassService,
    private academicService: AcademicService,
    private getReportCardFormBuilder: UntypedFormBuilder,
    protected override store: Store<{ data: RootReducerState }>) {
    super(store);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Reporting' }, { label: 'Report Cards', active: true }];

    this.getReportCardForm = this.getReportCardFormBuilder.group({
      academicYearId: [null, [Validators.required]],
      classId: [null, [Validators.required]],
      classSectionId: [null ],
      academicPeriodId: [null, [Validators.required]]
    });

    this.getReportCardForm.statusChanges.subscribe(status => {
      this.isFormValid = status === 'VALID';
    });

    this.getReportCardForm.get("academicYearId")?.valueChanges.subscribe((value) => {
      if (value) {
        this.clearChildFormProperties();
        this.getClasses(value);
        this.getClassSections(value);
        this.getAcademicPeriods(value);
      } 
    });

    this.getAcademicYears();
  }

  getReportCards(){
    if(this.getReportCardForm.invalid){
      return;
    }

    this.toggleLoading();

    this.resultReportService.getReportCards(this.getReportCardForm.value.academicPeriodId, this.getReportCardForm.value.classId, this.getReportCardForm.value.classSectionId).pipe(
      finalize(() => {
        this.toggleLoading()
      })).subscribe({
      next: (response) => {
        if(response.success){
          console.log(response.data);
          this.generateReportCardPdf(response.data!.report);
        }
      },
      error: (error) => {
        SimpleAlerts.showError(getErrorMessage(error));
      }
    })
  }

  getClassSections(academicYearId?: any){
    this.classSectionService.getClassSections(academicYearId).subscribe({
      next: (response) => {
        if(response.success){
          this.classSections = response.data;
        }
      },
      error: (error) => {
      }
    })
  }

  getClasses(academicYearId?: any) {
    this.classService.getClasses(academicYearId).subscribe({
      next: (response) => {
        if(response.success){
          this.classes = response.data;
        }
      },
      error: (error) => {
      }
    })
  }

  getAcademicPeriods(academicYearId?: any) {
    this.academicService.getAcademicPeriods(academicYearId).subscribe({
      next: (response) => {
        if(response.success){
          this.academicPeriods = response.data;
        }
      },
      error: (error) => {
      }
    })
  }

  getAcademicYears(){
    this.academicService.getAcademicYears().subscribe({
      next: (response) => {
        if(response.success){
          this.academicYears = response.data;
        }
      },
      error: (error) => {
      }
    })
  }

  clearChildFormProperties() {
    this.classes = [];
    this.classSections = [];
    this.getReportCardForm.patchValue({classId: null, classSectionId: null, academicPeriodId: null});
  }


private generateReportCardPdf(reportData: any[]) {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Set initial position and styling
  let yPos = 20;
  const leftMargin = 20;
  const rightMargin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - leftMargin - rightMargin;

  // Add school logo and header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('BCHS SCHOOL REPORT', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;

  // Process each student's report
  reportData.forEach((studentReport, index) => {
    if (index > 0) {
      doc.addPage(); // Add new page for each student after the first
      yPos = 20;
    }

    // Student information section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('STUDENT INFORMATION', leftMargin, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${studentReport.student.givenNames} ${studentReport.student.familyName}`, leftMargin, yPos);
    doc.text(`Admission Number: ${studentReport.student.admissionNumber}`, leftMargin + 80, yPos);
    yPos += 7;

    doc.text(`Academic Period: ${studentReport.academicPeriod.name}`, leftMargin, yPos);
    yPos += 10;

    // Summary section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('ACADEMIC SUMMARY', leftMargin, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Average: ${studentReport.average.toFixed(2)}/${studentReport.scale}`, leftMargin, yPos);
    doc.text(`Class Average: ${studentReport.classAverage.toFixed(2)}/${studentReport.scale}`, leftMargin + 80, yPos);
    yPos += 7;

    doc.text(`Rank: ${studentReport.rank}`, leftMargin, yPos);
    yPos += 10;

    // Process each exam type
    studentReport.examTypeReports.forEach((examType : any) => {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(examType.examType.name.toUpperCase(), leftMargin, yPos);
      yPos += 10;

      // Create table header
      doc.setFillColor(200, 200, 200);
      doc.rect(leftMargin, yPos, contentWidth, 10, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      
      doc.text('Subject', leftMargin + 5, yPos + 7);
      doc.text('Score', leftMargin + 70, yPos + 7);
      doc.text('Grade', leftMargin + 90, yPos + 7);
      doc.text('Rank', leftMargin + 110, yPos + 7);
      yPos += 10;

      // Add subject rows
      doc.setFont('helvetica', 'normal');
      examType.studentSubjectReports.forEach((subject : any) => {
        doc.text(subject.subject.name, leftMargin + 5, yPos + 7);
        doc.text(`${subject.score}/${subject.gradingScale}`, leftMargin + 70, yPos + 7);
        doc.text(subject.grade, leftMargin + 90, yPos + 7);
        doc.text(subject.rank.toString(), leftMargin + 110, yPos + 7);
        yPos += 10;
      });

      // Add total score
      doc.setFont('helvetica', 'bold');
      doc.text('Total Weighted Score:', leftMargin + 5, yPos + 7);
      doc.text(examType.totalWeightedScore.toString(), leftMargin + 70, yPos + 7);
      yPos += 15;
    });

    // Add footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Generated on: ' + new Date().toLocaleDateString(), leftMargin, doc.internal.pageSize.getHeight() - 20);
  });

  // Save the PDF
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
}

}
