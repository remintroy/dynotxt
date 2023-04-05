# # AuthServer APIS

## API's for admin app

Apis used for admin dashboard are listed below

### Admin api's

- `POST /<authBaseURL>/signin/ - body: email, password`

### User data manipulation

- `PUT /<authBaseURL>/user/disable/<uid>`
- `PUT /<authBaseURL>/user/enable/<uid>`
- `GET /<authBaseURL>/user/get/<uid>?page=<pageNumber>`

