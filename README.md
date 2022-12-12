LIVE DEMO - https://podfairtime2cash.netlify.app/

# AIRTIME-2-CASH-APP-

Technologies
Node.JS
Typescript
JWT
Sqlite,
Supertest,

Express
Prisma



### NAMING CONVENTION

- All succesful operation should return the `status code` with `message: "Success`
### API ENDPOINTS ROUTE

- *signup* **POST** `/api/users`
- *login* **POST** `/api/users/login`
- *reset password* **POST** `/api/users/forgotpassword`

### TESTING

- Use this sample user to run test
`
{
    "firstName": "test",
    "lastName": "test",
    "userName": "test",
    "email": "test@gmail.com",
    "phone": "04165593275",
    "password": "test",
    "confirmPassword": "test"
}
`

### START PRISMA COMMANDS
- yarn prisma migrate dev
- yarn prisma generate
