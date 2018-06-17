### Club administration system
Screen capture:

https://github.com/DungLai/dunglai.github.io/blob/master/Club_Admin/Capture.PNG

Description:

This is a mock application designed for club admin to manage their members. 

This application is developed using MVC (model, view, controller) model where member and payment are where the business logic happens and the manager is the controller, they have the ability to add members and modify the database, the view is where data is displayed back in the interface. This model creates the separation in design and implementation process that helps to increase the efficiency, it also improves security level.

The club has multiple facilities, one user can enrol in multiple facilities and one facility can have multiple members. This is a many to many relationship. A joint table call enrolment is used to link these two tables.

There are two types of payment: monthly and weekly. Payment is made as an abstract class, their inherited classes can overwrite the make payment method.

The manager can view all members of all facilities as well as all member of a specific facility. This is done using polymorphism technique: using one single method, the parameter of the method determines what process will be executed.
