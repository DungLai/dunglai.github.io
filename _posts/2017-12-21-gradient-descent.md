---
layout : post
title :	Gradient Descent
desc : <div class="tag">Calculus</div><div class="tag">Regression</div><div class="tag">Optimization</div></br>An optimization algorithm which uses gradient value of cost function to recursively adjust the solution of optimization problem.
img  : ../public/post-assets/GradientDescent/title.gif
---
<div class="tag">Calculus</div><div class="tag">Regression</div><div class="tag">Optimization</div>

An optimization algorithm which uses gradient value of cost function to recursively adjust the solution of optimization problem.

**Content:**
<!-- MarkdownTOC depth=3 -->

- [1. Introduction](#1-introduction)
	- [1.1. Why gradient descent?](#11-why-gradient-descent)
	- [1.2. Methodology](#12-methodology)
- [2. Gradient Descent for Linear Regression](#2-gradient-descent-for-linear-regression)
	- [2.1. Matrix derivatives](#21-matrix-derivatives)
	- [2.2. Numerical Differentiation](#22-numerical-differentiation)
	- [2.3. Python code for visualization](#23-python-code-for-visualization)
- [3. Discussion](#3-discussion)
	- [3.1. When to stop?](#31-when-to-stop)
	- [3.2. Stucking in Local Optimum](#32-stucking-in-local-optimum)
	- [3.3. Speed to convergence \(Learning rate\)](#33-speed-to-convergence-learning-rate)
	- [3.4. Disadvantage compared to using formula](#34-disadvantage-compared-to-using-formula)
	- [3.5. Speedup GD](#35-speedup-gd)
- [4. Reference](#4-reference)

<!-- /MarkdownTOC -->

<a name="1-introduction"></a>
## 1. Introduction
<a name="11-why-gradient-descent"></a>
### 1.1. Why gradient descent?
Given an optimization problem: Find $$x$$ so that $$f(x)=x^4-5x^2-x+3$$ as in [figure 1](#fig1) reaches minumum value, an approach is to solve $$f'(x)=0$$ to find all local minima then compare them to get global minimum. In our example, solving $$f'(x)=0$$ gives us 2 local minima at $$x=x_1$$ and $$x=x_2$$, because $$f(x_1)>f(x_2)$$ hence $$f(x)$$ reaches minimum at $$x=x_2$$.

The problem with the approach above is that sometimes, **the equation $$f'(x)=0$$ cannot be solved easily**. In this case, we can use an algorithm call **gradient descent** to find the *approximate* solution.
<a name="12-methodology"></a>
### 1.2. Methodology
<div class="message">Gradient descent (GD) is an iterative optimization problem algorithm for finding the minimum of a function. To find a local minimum of a function using GD, one takes steps proportional to the negative of the gradient (or of the approximate gradient) of the function at the current point.</div>

To be more specific, GD will iteratively change the value of $$x$$ $$(x:=x+\beta)$$ so that in each iteration, hopefully, $$f(x)$$ is getting smaller and moving closer to the minimum.

One way to ensure that the adjustment $$\beta$$ to $$x$$ will cause $$f(x)$$ smaller is to make $$\beta$$ equal a **portion of the negative of the gradient**: $$\beta=-\alpha f'(x)$$ where $$\alpha$$ is a positive number and it's called **learning rate**. In conclusion, the adjustment to $$x$$ will be:

\begin{equation} \tag{1} \label{eq:1}
x := x - \alpha f'(x)
\end{equation}

Considering the point $$x_0$$ in [figure 1](#fig1), because $$f'(x0)<0$$ so $$\alpha f'(x) <0$$ which means the update to $$x$$ as in equation (\ref{eq:1})	 will move $$x$$ to the right hand side, making $$f(x)$$ descending. 
<div class="imgcap" id='fig1'>
	<img style="display: inline-block; width: 60%" src ="/public/post-assets/GradientDescent/fig1.png" width = "500" align = "center">
	<div class="thecap">Figure 1</div>
</div>
<div style="clear:right;"></div>

<a name="2-gradient-descent-for-linear-regression"></a>
## 2. Gradient Descent for Linear Regression
Before we move on to the implementation and visualization, let's quickly go through the concept of matrix derivative (to work with multi-dimensional data) and numerical differentiation (to calculate approximate gradient at a specific value of $$x$$)
<a name="21-matrix-derivatives"></a>
### 2.1. Matrix derivatives
In our previous example, $$x$$ is one-dimensional vector, but it's not likely the case in most problem, $$x$$ could a vector in n-dimensional space. In this case, we need to update all element in $$x$$ **simutaneously**. If we don't update them simutaneously then $$f'(x)$$ will change everytime an element in $$x$$ is updated. Matrix derivatives could help us archieve that.

The following equation is the formula for derivatives of $$f(A)$$ with respect to $$m$$x$$n$$ matrix $$A$$.

\begin{equation}
\triangledown_A f(A) = \begin{bmatrix}
\frac{\partial f}{\partial A_{11}} & \cdots  & \frac{\partial f}{\partial A_{1n}} \newline
 \vdots & \ddots & \vdots \newline
 \frac{\partial f}{\partial A_{m1}} & \cdots & \frac{\partial f}{\partial A_{mn}}
\end{bmatrix} 
\end{equation}

In linear regression, $$x$$ is a vector. Formula for derivatives with repsect to a vector:


\begin{equation}
\triangledown_x f(x) = \begin{bmatrix}
\frac{\partial f}{\partial x_{1}}\newline
 \vdots \newline
 \frac{\partial f}{\partial x_{m}} 
\end{bmatrix} 
\end{equation}

<a name="22-numerical-differentiation"></a>
### 2.2. Numerical Differentiation
Numerical Differentiation can be used to check whether our gradient function (in code) is correct or not. When testing, give some value $$x$$ then check whether or not $$f'(x)$$ calculated by equation \eqref{eq:2} is closed enough to $$f'(x)$$ calculated by equation \eqref{eq:3}.
\begin{equation} \tag{2} \label{eq:2}
f'(x) = \lim_{\varepsilon \rightarrow 0}\frac{f(x + \varepsilon) - f(x)}{\varepsilon}
\end{equation}

\begin{equation} \tag{3} \label{eq:3}
f'(x) \approx \frac{f(x + \varepsilon) - f(x - \varepsilon)}{2\varepsilon} 
\end{equation}

The proof of numerical differentiation can be found at [Wikipedia](https://en.wikipedia.org/wiki/Numerical_differentiation)
<a name="23-python-code-for-visualization"></a>
### 2.3. Python code for visualization
```python
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

fig1 = plt.figure('GD for Linear Regression')
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

print('Checking gradient...', check_grad(np.random.rand(2, 1), cost, grad)) #Output: Checking gradient... True

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
# # Save mp4 file for animation, require ffmpeg and set path to environment variable.
# line_ani.save('lines.mp4', writer='ffmpeg')

# # Convert mp4 to gif
# # https://stackoverflow.com/questions/11269575/how-to-hide-output-of-subprocess-in-python-2-7
# FNULL = open(os.devnull, 'w')
# subprocess.call(['ffmpeg', '-i', 'lines.mp4', 'lines.gif'], stdout=FNULL, stderr=subprocess.STDOUT) # Execute command line to convert .mp4 to .gif using ffmpeg and hide output of command line to terminal
plt.show()

plt.figure('Iter and cost function')

cost_list = []
iter_list = []

for i in range(itr):
	iter_list.append(i+1)

for i in range(itr):
	cost_list.append(cost(myGD[0][i]))

plt.plot(iter_list, cost_list)
plt.xlabel('Iteration')
plt.ylabel('Cost value')

plt.show() 
```
<div class="imgcap">
	<img style="display: inline-block; width: 60%;" src ="/public/post-assets/GradientDescent/lines.gif" width = "500" align = "center">
<div class="thecap">Code output</div>
</div>

<a name="3-discussion"></a>
## 3. Discussion
<a name="31-when-to-stop"></a>
### 3.1. When to stop?
The relationship between cost value in each iteration is shown in [figure 2.a](#2a), clearly, the cost value tends to bottoms out and remains stable after iteration 40. The rest iteration doesn't seem to reduces the cost value as much and could be unnecessary. When the calculation is expensive, we might not want to continued the iteration while the solution is already good enough. So plotting cost value after each iteration or even calculating the slope of that function could be a way to decide when to stop GD.

[Figure 2.b](#2a) shows that setting $$1e-3$$ as the threshold is not good enough to stop GD because in that example, the optimal solution occurs when $$\mid {grad} \mid \approx 5.94$$.
<div class="imgcap">
	<img id='2a' style="display: inline-block; float:left; width: 50%;" src ="/public/post-assets/GradientDescent/cost_iter.png" width = "500" align = "center">
	<div class="imgcap">
	<img style="display: inline-block; float:left; width: 50%;" src ="/public/post-assets/GradientDescent/10000parabola.gif" width = "500" align = "center">
	<div class="thecap">Figure 2.a: Relationship between cost value and iteration number</div>
<div class="thecap">Figure 2.b: GD stuck in local optimum</div>
</div>
<div class="thecap"></div>
</div>
<div style="clear:left"></div>

<a name="32-stucking-in-local-optimum"></a>
### 3.2. Stucking in Local Optimum

In figure [(3)](#fig3), when trying to fit data by a parabola, GD get stuck in a local optimum, we know that because the green line is the solution found by formula (which is global optimum as I have explain in [this blog](https://dunglai.github.io/2017/10/10/linear-regression/)). When trying to fit a parabola, another vector is added to the collumn space. When working with high dimensional space, it's likely to have multiple local mimima. It means GD is very sensitive to initial value and it's hard to get out of a local minimum. There are serveral variant of GD that can deal with this problem such as Stochastic Gradient Descent.

<div class="imgcap">
	<img id='fig3' style="display: inline-block; width: 60%;" src ="/public/post-assets/GradientDescent/100parabola.gif" width = "500" align = "center">
	<div class="thecap">Figure 3: GD stucked in a local optimum</div>
</div>
[Source Code for figure 3](dunglai.github.io/public/post-assets/GradientDescent/gd_parabola_100iter.py)

<a name="33-speed-to-convergence-learning-rate"></a>
### 3.3. Speed to convergence (Learning rate)
Learning rate ($$\alpha$$) is an important parameter, small learning rate as in figure 4.a can slow down GD and maybe makes it very slow to converge. On the other hand, large learning rate as in figure 4.b can make GD impossible to converge.
<div class="imgcap">
	<img style="display: inline-block; width: 60%;" src ="/public/post-assets/GradientDescent/learning_rate.jpg" width = "500" align = "center">
	<div class="thecap">Figure 4.a: Small learning rates.</div>
	<div class="thecap">Figure 4.b: Large learning rates.</div>
</div>

<a name="34-disadvantage-compared-to-using-formula"></a>
### 3.4. Disadvantage compared to using formula

| Gradient Descent                          | Normal Equation                         |
|-------------------------------------------|-----------------------------------------|
| Need to chose learning rate               | No need to choose learning rate         |
| Needs many iteration                      | Don't need to iterate                   |
| Work well even when n (features) is large | Need to compute projection matrix 0(n3) |
| O(kn2)                                    | Slow if n (features) is very large      |

<a name="35-speedup-gd"></a>
### 3.5. Speedup GD
**Feature Scaling** is commonly be used when working with GD, we want features are in similar scale (range) and it can be archieved by:

* **Rescaling**: The simplest method is rescaling the range of features to scale the range in [0, 1] or [−1, 1]. Selecting the target range depends on the nature of the data.

\begin{equation}
x'=\frac{x-min(x)}{max(x)-min(x)}
\end{equation}

$$x$$ is original value and $$x'$$ is the normalized value.

* **Mean normalisation**

\begin{equation}
x'=\frac{x-mean(x)}{s_i}
\end{equation}

$$s_i$$ can be standard deviation or $$s_i$$ is the range of value (max-min).
<a name="4-reference"></a>
## 4. Reference

1. [Blog by Tiepvu](https://machinelearningcoban.com/2017/01/12/gradientdescent/)
2. [Blog by sebastianruder](http://sebastianruder.com/optimizing-gradient-descent/)
3. [Lecture note from Andrew Ng in machine learning course CS229](http://cs229.stanford.edu/notes/cs229-notes1.pdf)
4. [Feature Scaling](https://en.wikipedia.org/wiki/Feature_scaling)
5. [Machine Learning course by Andrew Ng in Coursera](https://www.coursera.org/learn/machine-learning)