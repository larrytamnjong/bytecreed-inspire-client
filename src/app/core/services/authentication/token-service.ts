import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "auth-token";
const USER_KEY = "currentUser";
const REFRESH_TOKEN_KEY = "refresh-token";
@Injectable({
  providedIn: "root",
})
export class TokenService {
  jwtToken: string = "";
  decodedToken: { [key: string]: string } = {};

  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getDecodeToken() {
    this.jwtToken = sessionStorage.getItem("auth-token") || "";
    this.decodedToken = jwtDecode(this.jwtToken);
    return this.decodedToken;
  }

  isTokenValid(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      return decodedToken.exp && decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  getUserPermissions(): number[] {
    this.decodedToken = this.getDecodeToken();
    if (this.decodedToken && this.decodedToken["Permissions"]) {
      try {
        const permissionsObj = JSON.parse(this.decodedToken["Permissions"]);
        return permissionsObj.Actions.map(
          (action: { Name: number }) => action.Name
        );
      } catch (error) {
        return [];
      }
    }
    return [];
  }

  public getToken(): string | null {
    return sessionStorage.getItem("auth-token");
  }

  public saveRefreshToken(refreshToken: string): void {
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  public getRefreshToken(): string | null {
    return sessionStorage.getItem("refresh-token");
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
