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
A = np.array([[2,9,7,9,11,16,25,23,22,29,29,35,37,40,46]]).T
b = np.array([[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]]).T

fig1 = plt.figure(1)
ax = plt.axes(xlim=(-10, 60), ylim=(-1, 20)) #restrict the figure showing only values in specified range
plt.plot(A,b,'ro', label='_nolegend_') # plot data points
line, = ax.plot([], [], color = 'blue') # plot function used in animation

# plot solution found by scikit learn
lr = linear_model.LinearRegression()
lr.fit(A,b)
x0_gd = np.linspace(1,46,2)
y0_sklearn = lr.intercept_[0] + lr.coef_[0][0]*x0_gd
plt.plot(x0_gd, y0_sklearn, color='green')

# apply gradient descent
itr = 90
learning_rate = .0001 #.0001
x_init = np.array([[1], [2]])

ones = np.ones((A.shape[0],1), dtype=np.int8) #Append bias to A
A = np.concatenate((ones,A), axis=1)

print('Checking gradient...', check_grad(np.random.rand(2, 1), cost, grad))

x_init = np.array([[1], [2]])

# running gradient descent
myGD = gradient_descent(x_init, grad, learning_rate)

# plot x_init (black line)
x0_gd = np.linspace(1,46,2)
y0_init = x_init[0][0] + x_init[1][0]*x0_gd
plt.plot(x0_gd, y0_init, color = 'black')

# plot lines in each iteration
def update(i):
	x_gd = myGD[0][i]
	y0_gd = x_gd[0][0] + x_gd[1][0]*x0_gd
	line.set_data(x0_gd,y0_gd)
	plt.xlabel('Iteration: {}/{}, learning rate: {}'.format(i+1, myGD[1], learning_rate))
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
line_ani.save('lines.mp4', writer='ffmpeg')

# https://stackoverflow.com/questions/11269575/how-to-hide-output-of-subprocess-in-python-2-7
FNULL = open(os.devnull, 'w')
subprocess.call(['ffmpeg', '-i', 'lines.mp4', 'lines.gif'], stdout=FNULL, stderr=subprocess.STDOUT) # Execute command line to convert .mp4 to .gif using ffmpeg and hide output of command line to terminal

plt.show()
