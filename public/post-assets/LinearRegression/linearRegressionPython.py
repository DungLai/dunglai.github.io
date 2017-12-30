import numpy as np
import matplotlib
import matplotlib.pyplot as plt
########## Using formula
# create random data 
A = np.array([[2,5,7,9,11,16,19,23,22,29,29,35,37,40,46]]).T
b = np.array([[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]]).T

#Visualize data 
plt.figure('Fit straight line')
plt.plot(A, b, 'ro')

# append column ones to matrix A
ones = np.ones((A.shape[0],1), dtype=np.int8)
A = np.concatenate((ones,A), axis=1)

# calculate coefficients to fit a straight line
A_dagger = np.linalg.inv(A.transpose().dot(A)).dot(A.transpose())
x = A_dagger.dot(b)

print('Solution found by formula: w = {}'.format(x.ravel()))

# start and end point of the straight line
x0 = np.linspace(1,46,2)
y0 = x[0][0] + x[1][0]*x0

# plot the straight line
plt.plot(x0, y0)
plt.xlabel('x coordinates ')
plt.ylabel('y coordinates ')

########## Using Scikit learn
from sklearn import linear_model

# create random data 
A = np.array([[2,5,7,9,11,16,19,23,22,29,29,35,37,40,46]]).T
b = np.array([[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]]).T

#Use Scikit Learn
lr = linear_model.LinearRegression()
lr.fit(A,b)
print('Solution found by scikit learn: w = {}{}'.format(lr.intercept_, lr.coef_))

########## Fit parabola by fomula
# create random data 
b = np.array([[2,5,7,9,11,16,19,23,22,29,29,35,37,40,46,42,39,31,30,28,20,15,10,6]]).T
A = np.array([[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]]).T

#Visualize data 
plt.figure('Fit a parabola')
plt.plot(A, b, 'ro')

# append column ones to matrix A
ones = np.ones((A.shape[0],1), dtype=np.int8)
A = np.concatenate((ones,A), axis=1)

## append x^2 to A
x_square = np.array([A[:,1]**2]).T
A = np.concatenate((A,x_square), axis=1)

# calculate coefficients to fit a straight line
A_dagger = np.linalg.inv(A.transpose().dot(A)).dot(A.transpose())
x = A_dagger.dot(b)

# start and end point of the straight line
x0 = np.linspace(1,25,10000)
y0 = x[0][0] + x[1][0]*x0 +x[2][0]*x0*x0
# plot the straight line
plt.plot(x0, y0)
plt.xlabel('x coordinates ')
plt.ylabel('y coordinates ')
plt.show()