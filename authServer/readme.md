# Auth Server for DynoTxt

Dynotxt uses micro service arkitecture, this server is responsible for managing user and admin authentication.

### Features

- Handles all authentication
- Firebase authentication
- User's are authenticated with firebase authentication
- Admin is authenticated with email and password seprately

### Env File

```BASH
    MONGODB_URL = <MongoDB connection string> 
    GOOGLE_APPLICATION_CREDENTIALS =  path/to/firebase/admin/credentials.json
    ACCESS_TOKEN_SECRET  =  <UserAccessToken secret>
    REFRESH_TOKEN_SECRET =  <UserRefreshToken secret>
    ADMIN_ACCESS_TOKEN_SECRET  = <AdminAccessToken Secret>
    ADMIN_REFRESH_TOKEN_SECRET =  <adminRefreshToken Secret>
```