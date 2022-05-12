import {AbstractUser, IUser} from "./abstract-user";

export class User extends AbstractUser {

  constructor() {
    super();
  }

  static Build(user: IUser | {[key: string]: any}): User {
    if (!user) {
      return new User();
    }

    const newUser = new User();
    newUser._id = user._id;
    newUser.firstName = user.firstName;
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.password = user.password;
    newUser.phone = user.phone;
    newUser.userType = user.userType;
    newUser.followers = user.followers;
    newUser.following = user.following;
    newUser.nfts = user.nfts;
    return newUser;
  }
}
