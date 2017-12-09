---
layout : post
title :	K Nearest Neighbors
desc : <div class="tag">Machine Learning</div><div class="tag">Regression</div><div class="tag">Classification</div><div class="tag">Supervised Learning</div></br>Analyze a non-parametric, instance-based learning algorithm called KNN and implement it from scratch in Python to solve classification and regression tasks.
img  : ../public/post-assets/KNearestNeighbors/title.png
---
<div class="tag">Machine Learning</div><div class="tag">Regression</div><div class="tag">Classification</div><div class="tag">Supervised Learning</div><div class="tag">Non Parametric</div><div class="tag">Instance-based</div>
*Objective*: This blog introduces a supervised learning algorithm called K-nearest-neighbors (KNN) followed by application on regression and classification on [iris-flower dataset](https://en.wikipedia.org/wiki/Iris_flower_data_set). All code are written in python **from scratch** with comparable result using high level scikit-learn machine learning library.

**Content:**
<!-- MarkdownTOC depth=3 -->

- [Introduction](#introduction)
- [KNN methodology](#knn-methodology)
	- [Unsupervised learning recap](#unsupervised-learning-recap)
	- [KNN characteristics: Non-parametric, instance-based, lazy learning.](#knn-characteristics-non-parametric-instance-based-lazy-learning)
	- [Flowchart and pseudo algorithm](#flowchart-and-pseudo-algorithm)
- [Application with python](#application-with-python)
	- [Regression](#regression)
	- [Classification](#classification)
- [Dicussion](#dicussion)
	- [Hyperparameter](#hyperparameter)
	- [Speed of execution](#speed-of-execution)
	- [Accuracy](#accuracy)
- [Reference](#reference)

<!-- /MarkdownTOC -->

<a name="introduction"></a>
## Introduction
The KNN algorithm is a simple, robust and versatile classifier in supervised learning algorithm toolbox. In spite of its simplicity, KNN can outperform more powerful classifiers in some specific applications. The name '```nearest neighbors```' reveals some facts about the algorithm, that is, prediction is made based on their ```neighbors``` aka vectors that are close to it in high dimensional space.

That 'close neighbors' is determined by the ```distance``` between unlabeled data to labeled data. How ```distance``` is measured and how their ```neighbors``` determines label of data will be discussed in next part.
<a name="knn-methodology"></a>
## KNN methodology
<a name="unsupervised-learning-recap"></a>
### Unsupervised learning recap
KNN is one of the supervised learning algorithm, this means that we  are given a labeled dataset containing training observations $$(\mathbf{x},y)$$ where $$\mathbf{x}$$ is a vectors, training data containing features of data and $$y$$ is label of training example $$\mathbf{x}$$, normally, y is a number representing the category where the training example belonged to. Our goal is to find the relationship between $$\mathbf{x}$$ and $$y$$ or learn a function $$h:X \rightarrow Y$$ so that given an unlabeled observation $$\mathbf{x}$$, $$h(x)$$ can predict the corresponding output $$y$$.
<a name="knn-characteristics-non-parametric-instance-based-lazy-learning"></a>
### KNN characteristics: Non-parametric, instance-based, lazy learning.
<div class="message">
KNN is non-parametric, instance-based, lazy learning algorithms and used in supervised learning.
</div>
1. **Non-parametric**: 
A learning model that summarizes data with a set of parametes of fixed size (independen of the number of training examples) is called a parametric model. No matter ho much data you throw at a parametric model, it won't change its mind about how many parameters it needs. [[1]](#ref1)
2. **Instance-based**: 
3. **Lazy learning**: 

<a name="flowchart-and-pseudo-algorithm"></a>
### Flowchart and pseudo algorithm
<a name="application-with-python"></a>
## Application with python 
<a name="regression"></a>
### Regression
<a name="classification"></a>
### Classification 
<a name="dicussion"></a>
## Dicussion
<a name="hyperparameter"></a>
### Hyperparameter
<a name="speed-of-execution"></a>
### Speed of execution
<a name="accuracy"></a>
### Accuracy
<a name="reference"></a>
## Reference

<div id='ref1'>[Artificial Intelligence: A Modern Approach](https://www.amazon.com/dp/0136042597?tag=inspiredalgor-20), page 737</div>