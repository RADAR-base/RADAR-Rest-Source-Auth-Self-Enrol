import { ActivatedRoute, Params, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  NgbDateAdapter,
  NgbDateNativeAdapter
} from "@ng-bootstrap/ng-bootstrap";

import { HttpErrorResponse } from "@angular/common/http";
import { RestSourceUser } from "src/app/models/rest-source-user.model";
import { RestSourceUserService } from "src/app/services/rest-source-user.service";
import { SourceClientAuthorizationService } from "../../../../services/source-client-authorization.service";

@Component({
  selector: "update-rest-source-user",
  templateUrl: "./update-rest-source-user.component.html",
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class UpdateRestSourceUserComponent implements OnInit {
  errorMessage?: string;
  restSourceUser: RestSourceUser;
  startDate: Date;
  endDate: Date;
  isEditing = false;

  constructor(
    private restSourceUserService: RestSourceUserService,
    private sourceClientAuthorizationService: SourceClientAuthorizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.hasOwnProperty("id")) {
        this.restSourceUserService.getUserById(params["id"]).subscribe(
          user => {
            this.restSourceUser = user;
            this.isEditing = true;
            this.startDate = new Date(this.restSourceUser.startDate);
            this.endDate = new Date(this.restSourceUser.endDate);
          },
          (err: Response) => {
            this.errorMessage = "Cannot retrieve current user details";
            window.setTimeout(() => this.router.navigate([""]), 5000);
          }
        );
      } else {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
          if (params.hasOwnProperty("error")) {
            this.errorMessage = params["error_description"];
          } else {
            this.errorMessage = null;
            this.addRestSourceUser(params["code"], params["state"]);
          }
        });
      }
    });
  }

  private updateRestSourceUser() {
    this.restSourceUser.startDate = this.startDate.toISOString();
    this.restSourceUser.endDate = this.endDate.toISOString();
    this.restSourceUserService.updateUser(this.restSourceUser).subscribe(
      () => {
        return this.router.navigate(["/success"]);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          this.errorMessage =
            "Something went wrong. Please check your connection.";
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.errorMessage = `Backend Error: Status=${err.status},
            Body: ${err.error.error}, ${err.error.message}`;
          if (err.status == 417) {
            this.errorMessage +=
              " Please check the details are correct and try again.";
          }
        }
      }
    );
  }

  private addRestSourceUser(code: string, state: string) {
    this.restSourceUserService.addAuthorizedUser(code, state).subscribe(
      data => {
        this.restSourceUser = data;

        this.restSourceUser.userId = localStorage.getItem("email");
        this.restSourceUser.sourceId = localStorage.getItem("uuid");
        this.restSourceUser.projectId = localStorage.getItem("project");
        this.startDate = new Date(localStorage.getItem("startDate"));
        this.endDate = new Date(localStorage.getItem("endDate"));
      },
      (err: Response) => {
        this.errorMessage = "Cannot retrieve current user details";
        window.setTimeout(() => this.router.navigate([""]), 5000);
      }
    );
  }
}
