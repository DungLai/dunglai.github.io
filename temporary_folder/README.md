Screen capture:
![Screen Capture](https://github.com/DungLai/dunglai.github.io/blob/master/temporary_folder/Capture.PNG)

Description:

This is a mock application designed for club admin to manage their members. 

This application is developed using MVC (model, view, controller) model where member and payment is where the business logic happens and manager is the controller, they have the ability to add members and modify the database, view is where data is displayed back in the interface. This model create the separation in design and implementation process that help improving the efficiency, it also improves security level.

The club has multiple facilities, one user can enrol in multiple facilities and one facilities can have more than one member. This is a many to many relationship. A join table call enrolment is used to link these two tables.

There are two types of payment: monthly and weekly. Payment is made as an abstract class, their inherited classes can overwrite the make payment method.

Manager can view all members of all facilities as well as all member of a specific facility. This is done through one single method, the parameter of the method determines what process will be executed, this is call polymorphism.
