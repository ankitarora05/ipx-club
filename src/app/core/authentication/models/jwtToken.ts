
export interface IJwtToken {
  "userObj": {
    "_id": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "phone": string,
    "emailVerified": boolean,
    "phoneVerified": boolean,
    "userType": string
  },
  "iat": number,
  "exp": number
}