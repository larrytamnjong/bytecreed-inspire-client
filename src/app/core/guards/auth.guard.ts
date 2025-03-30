import { Injectable } from "@angular/core";
import { PermissionActionEnum } from "../enums/permission-action-enum";
import { Router,ActivatedRouteSnapshot,RouterStateSnapshot} from "@angular/router";
import { TokenService } from "../services/general/token.service";

@Injectable({ providedIn: "root" })
export class AuthGuard {
  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if(this.tokenService.isTokenAvailable()){
      const requiredPermission = route.data["permission"] as PermissionActionEnum;
      const userPermissions = this.tokenService.getUserPermissions();
      if (requiredPermission && !userPermissions.includes(requiredPermission)) {
        this.router.navigate(["/auth/errors/unauthorized"]); 
        return false;
      }
      return true;
    }else
    {
      this.router.navigate(["/auth/login"], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
