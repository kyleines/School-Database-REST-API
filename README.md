# School Database REST API

### Welcome to my School Database REST API for the Team Treehouse: FSJS Techdegree - Unit 9 Project.

In this project, I created a REST API using Express. This API provides a way to administer a school database containing information about users and courses. \
Users can interact with the database to create new courses, retrieve information on existing courses, and update or delete existing courses. \
To make changes to the database, users are required to log in so the API also allows users to create a new account or retrieve information on an existing account.

This API's features include: \
:heavy_check_mark: Secured stored credentials through password hashing \
:heavy_check_mark: Reliable user authentication \
:heavy_check_mark: Thorough validations for consistent database data \
:heavy_check_mark: Prevention of duplicate user accounts under the same email address

Thanks for visiting! \
Feedback, follows, and stars are all appreciated!

-Kyle

<br>

### Developer's Notes:
- Added validation to the `emailAddress` attribute in the `User` model to ensure that the provided email address is properly formatted.
- Added the `unique` constraint to the `User` model to ensure that the provided email address isn't already associated with an existing user.
- Updated the `/api/users` `GET` route so that the `password`, `createdAt`, and `updatedAt` properties are filtered out of the response.
- Updated the `/api/users` `POST` route to check for and handle `SequelizeUniqueConstraintError` errors.
- Updated the `/api/courses` and `/api/courses/:id` `GET` routes so that the `createdAt` and `updatedAt` properties are filtered out of the response.
- Updated the `/api/courses/:id` `PUT` and `/api/courses/:id` `DELETE` routes to ensure that the currently authenticated user is the owner of the requested course.

<br>
<br>

p.s. Follow me on [Twitter](https://twitter.com/kyleines) & [Instagram](https://instagram.com/kyleines)! @kyleines