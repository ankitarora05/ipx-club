import {UserType} from "../../core/authentication/models/auth";

export interface IUser {
  _id: string,
  firstName: string,
  lastName: string,
  createdAt: string,
  createdBy: string,
  updatedBy: string,
  email: string,
  password: string,
  phone: string,
  userType: UserType | string,
  followers: number,
  following: number,
  nfts: number
}

export abstract class AbstractUser implements IUser {
  public _id: string;
  public email: string;
  public followers: number;
  public following: number;
  public firstName: string;
  public lastName: string;
  public createdAt: string;
  public createdBy: string;
  public updatedBy: string;
  public nfts: number;
  public password: string;
  public phone: string;
  public userType: UserType | string;

  protected constructor() {
      this._id = "",
      this.firstName = "",
      this.lastName = "",
      this.createdAt = "",
      this.createdBy = "",
      this.updatedBy = "",
      this.email = "",
      this.password = "",
      this.phone = "",
      this.userType = "",
      this.followers = 0,
      this.following = 0,
      this.nfts = 0
  }
}
