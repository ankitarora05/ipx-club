import {Router} from "@angular/router";

export class SignupRouter {

    constructor(private router: Router) {
    }

    handleSuccessSignupRouteChange() {
        this.router.navigateByUrl("/dashboard")
    }
}
