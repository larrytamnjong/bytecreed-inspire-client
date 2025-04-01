import { Component, OnInit } from "@angular/core";
import { PaginationService } from "src/app/core/services/general/pagination.service";

@Component({
  selector: "app-report-cards",
  templateUrl: "./report-cards.component.html",
  styleUrl: "./report-cards.component.scss",
})
export class ReportCardsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  // constructor(public paginationService: PaginationService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'ReportCards' },
      { label: "ReportCard", active: true },
    ];
  }
}
