import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/base.component";
import { Store } from "@ngrx/store";
import { RootReducerState } from "src/app/store";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-student-info",
  templateUrl: "./student-info.component.html",
  styleUrl: "./student-info.component.scss",
})
export class StudentInfoComponent extends BaseComponent {
  studentId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    protected override store: Store<{ data: RootReducerState }>) {
    super(store);
  }

ngOnInit(): void {
  this.route.queryParamMap.subscribe(params => {this.studentId = params.get('id');});
}

}
