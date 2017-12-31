import numpy as np
import matplotlib
import matplotlib.pyplot as plt
from sklearn import linear_model
import matplotlib.animation as animation
import os
import subprocess

# apply gradient descent algorithm to optimiza cost function of several variables

def cost(x):
	"""Cost function of linear regression (LR) model with coefficient x"""
	m = A.shape[0] 
	return .5/m *np.linalg.norm(A.dot(x)-b,2)**2

def grad(x):
	"""Gradient function of cost function"""
	m = A.shape[0]
	return 1/m *A.T.dot(A.dot(x)-b)

def numerical_grad(x, cost):
	"""Calculating numerical gradient with coefficient x to check whether our grad function is correct or not"""
	eps = 1e-4
	g = np.zeros_like(x)
	for i in range(len(x)):
		x_p = x.copy()
		x_n = x.copy()
		x_p[i] += eps 
		x_n[i] -= eps
		g[i] = (cost(x_p) - cost(x_n))/(2*eps)
	return g 

def check_grad(x, cost, grad):
	"""Check grad function by comparing actual gradient value and numerical gradient (estimation)"""
	x = np.random.rand(x.shape[0], x.shape[1])
	grad1 = grad(x)
	grad2 = numerical_grad(x, cost)
	return True if np.linalg.norm(grad1 - grad2) < 1e-6 else False 

def gradient_descent(x_init, grad, alpha):
	"""
	Running gradient descent with initial value x_init, grad function, learning rate alpha 
	This function return x: list of solution after each iteration and iteration: last iteration it has gone through
	"""
	m = len(x_init)
	x = [x_init]
	for iteration in range(itr):
		x_new = x[-1] - alpha*grad(x[-1]) 
		if np.linalg.norm(grad(x_new))/m < 1e-3: #Stop gradient descent when grad value is too small.
			break
		x.append(x_new)
	return (x, iteration)

############### Main ####################

# create random data 
b = np.array([[2,5,7,9,11,16,19,23,22,29,29,35,37,40,46,42,39,31,30,28,20,15,10,6]]).T
A = np.array([[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]]).T

ax = plt.axes(xlim=(-10, 50), ylim=(-10, 50)) #restrict the figure showing only values in specified range

#Visualize data 
plt.plot(A,b,'ro', label='_nolegend_') # plot data points
fig1 = plt.figure(1)
# append column ones to matrix A
ones = np.ones((A.shape[0],1), dtype=np.int8)
A = np.concatenate((ones,A), axis=1)

## append x^2 to A
x_square = np.array([A[:,1]**2]).T
A = np.concatenate((A,x_square), axis=1)

line, = ax.plot([], [], color = 'blue') # plot function used in animation

# plot solution found by scikit learn
A_dagger = np.linalg.inv(A.transpose().dot(A)).dot(A.transpose())
x_formula = A_dagger.dot(b)

x0_gd = np.linspace(1,46,10000)
y0_sklearn = x_formula[0][0] + x_formula[1][0]*x0_gd + x_formula[2][0]*x0_gd*x0_gd
plt.plot(x0_gd, y0_sklearn, color='green')

# apply gradient descent
itr = 101
learning_rate = .000001 #.0001
x_init = np.array([[1], [1], [-1]])
x_init = np.array([[ 1.05455731],
       [ 3],
       [-0.01216413]])

print('Checking gradient...', check_grad(np.random.rand(3, 1), cost, grad))

# running gradient descent
myGD = gradient_descent(x_init, grad, learning_rate)

# plot x_init (black line)
x0_gd = np.linspace(1,46,10000)
y0_init = x_init[0][0] + x_init[1][0]*x0_gd + x_init[2][0]*x0_gd*x0_gd 

plt.plot(x0_gd, y0_init, color = 'black')

# plot lines in each iteration
def update(i):
	x_gd = myGD[0][i]
	y0_gd = x_gd[0][0] + x_gd[1][0]*x0_gd + x_gd[2][0]*x0_gd*x0_gd
	line.set_data(x0_gd,y0_gd)
	# print(i)
	# print(round(np.linalg.norm(grad(myGD[0][i]))/3, 3))
	plt.xlabel('Iteration: {}/{}, |grad|={}'.format(i, myGD[1],round(np.linalg.norm(grad(myGD[0][i]))/3, 3)))
	return line,

# legend for graph
plt.legend(('Value in each GD iteration', 'Solution by formular', 'Inital value for GD'), loc=(0.52, 0.01))
ltext = plt.gca().get_legend().get_texts()
plt.setp(ltext[0], fontsize=10)
plt.setp(ltext[1], fontsize=10)
plt.setp(ltext[2], fontsize=10)

# save animation to mp4 file using ffmpeg
Writer = animation.writers['ffmpeg']
writer = Writer(fps=15, metadata=dict(artist='Me'), bitrate=1800)

line_ani = animation.FuncAnimation(fig1, update, myGD[1]+1, interval=50, blit=True)
line_ani.save('100iteration.mp4', writer='ffmpeg')

# https://stackoverflow.com/questions/11269575/how-to-hide-output-of-subprocess-in-python-2-7
# FNULL = open(os.devnull, 'w')
# subprocess.call(['ffmpeg', '-i', '50iter.mp4', '50iter.gif'], stdout=FNULL, stderr=subprocess.STDOUT) # Execute command line to convert .mp4 to .gif using ffmpeg and hide output of command line to terminal

plt.show()
