import {IJwt, IServerAuthResponse} from "../../../core/authentication/models/auth";
import decode from "jwt-decode";
import {Router} from "@angular/router";

export abstract class LoginRouter {

    protected constructor(private router: Router) {
    }

    handleSuccessLoginRouteChange(apiResponse: IServerAuthResponse): void {
        const {data} = apiResponse;
        const {userObj} = <IJwt>decode(data.token)
        if (userObj.forcePasswordChange) {
            this.router.navigate(["/reset-password"])
        } else {
            this.router.navigate(["/dashboard"])
        }
    }
}