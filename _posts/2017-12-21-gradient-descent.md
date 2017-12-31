---
layout : post
title :	Gradient Descent
desc : <div class="tag">Calculus</div><div class="tag">Regression</div><div class="tag">Optimization</div></br>An optimization algorithm which uses gradient value of cost function to recursively adjust the solution of optimization problem.
img  : ../public/post-assets/GradientDescent/title.gif
---
<div class="tag">Calculus</div><div class="tag">Regression</div><div class="tag">Optimization</div>

An optimization algorithm which uses gradient value of cost function to recursively adjust the solution of optimization problem.

<!-- MarkdownTOC depth=3 -->

- [Introduction](#introduction)
- [Gradient Descent for Linear Regression](#gradient-descent-for-linear-regression)
	- [Matrix derivatives](#matrix-derivatives)
	- [Numerical Gradient](#numerical-gradient)
	- [Python code for visualization](#python-code-for-visualization)
- [Dicussion](#dicussion)
	- [Stucking in Local Optimum](#stucking-in-local-optimum)
	- [When to stop?](#when-to-stop)
	- [Speed to convergence \(Learning rate\)](#speed-to-convergence-learning-rate)
- [Reference](#reference)

<!-- /MarkdownTOC -->

<a name="introduction"></a>
## Introduction

Adjust weight to some amount theta = theta + alpha

adjustment need to decrease the  cost function -> -derivative

<a name="gradient-descent-for-linear-regression"></a>
## Gradient Descent for Linear Regression
<a name="matrix-derivatives"></a>
### Matrix derivatives
<a name="numerical-gradient"></a>
\begin{equation}
\triangledown_A f(A) = \begin{bmatrix}
\frac{\partial f}{\partial A_{11}} & \cdots  & \frac{\partial f}{\partial A_{1n}} \newline
 \vdots & \ddots & \vdots \newline
 \frac{\partial f}{\partial A_{m1}} & \cdots & \frac{\partial f}{\partial A_{mn}}
\end{bmatrix} 
\end{equation}
<a name="numerical-gradient"></a>
### Numerical Gradient
\begin{equation}
f'(x) = \lim_{\varepsilon \rightarrow 0}\frac{f(x + \varepsilon) - f(x)}{\varepsilon}
\end{equation}

\begin{equation}
f'(x) \approx \frac{f(x + \varepsilon) - f(x - \varepsilon)}{2\varepsilon} 
\end{equation}
<a name="python-code-for-visualization"></a>
### Python code for visualization
<div class="imgcap">
	<img style="display: inline-block; float:left; width: 60%;" src ="/public/post-assets/GradientDescent/lines.gif" width = "500" align = "center">
	<img style="display: inline-block; float:left; width: 60%;" src ="/public/post-assets/GradientDescent/cost_iter.png" width = "500" align = "center">
	<div class="thecap">Code output</div>
</div>
<div style="clear:left"></div>

<a name="dicussion"></a>
## Dicussion
<a name="stucking-in-local-optimum"></a>
### Stucking in Local Optimum
<div class="imgcap">
	<img style="display: inline-block; width: 60%;" src ="/public/post-assets/GradientDescent/100parabola.gif" width = "500" align = "center">
	<div class="thecap">Code output</div>
</div>

<a name="when-to-stop"></a>
### When to stop? 
<div class="imgcap">
	<img style="display: inline-block; width: 60%;" src ="/public/post-assets/GradientDescent/10000parabola.gif" width = "500" align = "center">
	<div class="thecap">Code output</div>
</div>

<a name="speed-to-convergence-learning-rate"></a>
### Speed to convergence (Learning rate)
<div class="imgcap">
	<img style="display: inline-block; width: 60%;" src ="/public/post-assets/GradientDescent/learning_rate.jpg" width = "500" align = "center">
	<div class="thecap">Code output</div>
</div>

<a name="reference"></a>
## Reference

https://machinelearningcoban.com/2017/01/12/gradientdescent/

http://sebastianruder.com/optimizing-gradient-descent/

http://cs229.stanford.edu/notes/cs229-notes1.pdf