import {Component, OnInit} from "@angular/core";
import {RestSourceUserService} from "../../services/rest-source-user.service";
import {PlatformLocation} from "@angular/common";
import {SourceClientAuthorizationService} from "../../services/source-client-authorization.service";
import {FormBuilder} from "@angular/forms";
import {RestSourceClientDetails} from "../../models/source-client-details.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {RestSourceUser} from "../../models/rest-source-user.model";

@Component({
  selector: 'rest-source-user-registration-form',
  templateUrl: './rest-source-user-registration-form.component.html',
  styleUrls: ['./rest-source-user-registration-form.component.css']
})
export class RestSourceUserRegistrationFormComponent implements OnInit {

  sourceTypeForm: any;
  callbackUrl: String;

  sourceTypes: string[];
  sourceClientDetail: RestSourceClientDetails;

  queryResult: string = null;
  email: string = null;


  constructor(private restSourceUserService: RestSourceUserService,
              private sourceClientAuthorizationService: SourceClientAuthorizationService,
              private fb: FormBuilder,
              private platformLocation: PlatformLocation,
              private route: ActivatedRoute
  ) {
    this.createForm();

  }

  ngOnInit(): void {
    this.sourceClientAuthorizationService.getDeviceTypes().subscribe(
      data => {
        this.sourceTypes = data;
      }
    );

    this.initStorageValues();
  }

  initStorageValues() {

    let emailId: string = this.route.snapshot.queryParamMap.get("email");
    let uuid: string = this.route.snapshot.queryParamMap.get("uuid");
    let project: string = this.route.snapshot.queryParamMap.get("project");
    let startDate: string = this.route.snapshot.queryParamMap.get("startDate");
    let endDate: string = this.route.snapshot.queryParamMap.get("endDate");

    if (emailId && emailId != "") {
      localStorage.setItem("email", emailId);
      this.email = emailId;
    }

    if (uuid && uuid != "") {
      localStorage.setItem("uuid", uuid);
    }

    if (project && project != "") {
      localStorage.setItem("project", project);
    }

    if (startDate && startDate != "") {
      localStorage.setItem("startDate", startDate)
    }

    if (endDate && endDate != "") {
      localStorage.setItem("endDate", endDate);
    }
  }

  createForm() {
    this.sourceTypeForm = this.fb.group({
      selectedDeviceType: '',
    });
  }

  onChange(sourceType: any) {
    this.sourceClientAuthorizationService.getSourceClientAuthDetails(sourceType).subscribe(
      data => {
        this.sourceClientDetail = data;
        this.callbackUrl = window.location.origin
          + this.platformLocation.getBaseHrefFromDOM()
          + 'users:new';
      }
    )
  }

  checkIfUserExists(emailId: string) {
    this.restSourceUserService.getUserBySubjectId(emailId).subscribe((user: RestSourceUser) => {
        this.queryResult = "The User is registered. " + user.userId;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          this.queryResult = "Something went wrong. Please check your connection."
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.queryResult = `Backend Error: Status=${err.status},
            Body: ${err.error.error}, ${err.error.message}`;
          if (err.status == 404) {
            this.queryResult = "The User is not Registered. " +
              "Please select the device from above and use the request to authorize button to add a new user.";
          }
        }
      });
  }

}
