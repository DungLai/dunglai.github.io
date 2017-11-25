---
layout : post
title : AI for FlappyBird Game
desc : <div class="tag">Python</div><div class="tag">Neural Network</div><div class="tag">Genetic Algorithm</div><div class="tag">Machine Learning</div></br> Using Neural Network model and Genetic algorithm to build AI for Flappy Bird Game.
img  : ../public/post_img/FlappyBirdAI/title.png
---
**Content:**
<!-- MarkdownTOC depth=4 -->

- [1. Introduction](#1-introduction)
- [2. Genetic Algorithm Methodology](#2-genetic-algorithm-methodology)
	- [Optmization Problem](#optmization-problem)
	- [Terminology](#terminology)
		- [Population, chromosome and genome](#population-chromosome-and-genome)
		- [Selection, mutation and crossover](#selection-mutation-and-crossover)
- [3. Genetic Operators](#3-genetic-operators)
	- [Encoding and Decoding](#encoding-and-decoding)
	- [Selection](#selection)
	- [Mutation](#mutation)
	- [Crossover](#crossover)
- [4. Implementation](#4-implementation)
	- [Implementation Overview](#implementation-overview)
	- [Flowchart](#flowchart)
	- [Pseudo Algorithm](#pseudo-algorithm)
- [5. Application in building AI for Flappy Bird Game](#5-application-in-building-ai-for-flappy-bird-game)
	- [Gameplay overview](#gameplay-overview)
	- [Training model](#training-model)
		- [Neural Network Overiew](#neural-network-overiew)
		- [Neural Network for Flappy Bird AI](#neural-network-for-flappy-bird-ai)
	- [Input of training model](#input-of-training-model)
	- [Implementation of GA](#implementation-of-ga)
		- [Encode](#encode)
		- [Applying genetic operator](#applying-genetic-operator)
		- [Fitness function](#fitness-function)
- [6. Experiment Statistical Result](#6-experiment-statistical-result)
- [7. Further Research](#7-further-research)
- [8. Discussion](#8-discussion)
- [9. Reference](#9-reference)
- [Source Code and Report](#source-code-and-report)

<!-- /MarkdownTOC -->
*Objective*
1. Have some ideas of Multilayer perceptron (Neural Network model)
2. Understand Genetic Algorithm
3. Implementation of building AI for simple game.

**Source Code** in Python for the implementation of AI for Flappy Bird game will be provided, the external package I use in my implementation is only [Numpy](http://www.numpy.org/) to make use of matrix form.

After reading this blog, you will be able to build AI for a lot of simple games, not just FlappyBird. [MarI/O](https://www.youtube.com/watch?v=qv6UVOQ0F44) is a great example of unbeatable AI for game achieved by Neural Network model and Evolutionary Algorithm [(Neat)](http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf). 
<embed class="video" width="1550" height="400" style="width: 100%" src="/public/post_img/FlappyBirdAI/demo.mp4" scale="aspect" controller="true">
<div class="thecap">Demo video</div>
*Abstract*

In today’s world, an intelligent and optimal problem solving approaches are required in every field. Machine are becoming more and more efficient, many applications have been made recently to solve complex problem. Genetic algorithm is a heuristic search technique in artificial intelligent to find the most optimized solution for a given problem based on crossover, mutation, selection and some other techniques inspired by Darwin's theory of evolution. This report demonstrate how GA approaches to a optimization problem in general. An implementation of GA on building an AI for a famous arcade game namely Flappy Bird is provided.
<a name="1-introduction"></a>
## 1. Introduction
GA (Genetic Algorithm) has been successful in complex engineering applications that involved multiple objective, non well-defined optimization function. For example, the design of analog circuits [$$^[1]$$](#ref1) and optimization of space-born antennae [$$^[2]$$](#ref2) are developed using GA.

Optimization algorithms can roughly be divided into three classes: mathematical programming algorithms, heuristics, and metaheuristics. Mathematical programming algorithms have the most rigorous foundations, and it may be possible to prove that the algorithm actually converges, check that the proposed solution is close to at least a local optimum, and to estimate the rate of convergence. Metaheuristics algorithm use metaphors, usually come from unrelated field to define selection algorithm. Simulated annealing, ant colony, bee swarm, harmony search are examples of algorithm that are derived from different fields rather than computer science.

GA is an artificial intelligence metaheuristic search technique that is derived from the Darwin's theory of biological organism evolution. As for many other metaheuristic methods, controversial reviews have been made around GA due to the lack of core and concrete mathematical foundation. In other words, many people consider it as a complete black box.

In the next part, a brief introduction to GA will be demonstrated as well as its application in training a neural network that can play Flappy Bird game.
<div class="imgcap">
<img style="display: inline-block; width: 55%;" src ="/public/post_img/FlappyBirdAI/fig1.PNG" width = "500" align = "center">
<div class="thecap">Fig. 1: Experiment result</div>
</div>
<a name="2-genetic-algorithm-methodology"></a>
## 2. Genetic Algorithm Methodology
<a name="optmization-problem"></a>
### Optmization Problem
Most problem in real life don't have formula and technique to calculate the exact result because of the vast generic complexity. GA works on a population of possible solutions and evolve them using method inspired by Darwin's theory in biology. The rest of the report will discuss the different between GA and other method and also perform some experiment to estimate the effectiveness of GA.

Each problem using GA requires a **fitness function** which measures the quality of the solution toward an optimization problem.
<a name="terminology"></a>
### Terminology
In GA, a **population** of candidate solutions (also called phenotypes) is evolved toward better solutions of an optimization problem. Each candidate solution is represented by a **chromosome** which is a set of **genes** which can be alter **mutate** and **crossover**. A new set of chromosome, also known as **generation** is formed using **selection**.
<a name="population-chromosome-and-genome"></a>
#### Population, chromosome and genome
**Population**: The number of individuals present with same length of chromosome. In other words, they are a set of possible solution to a optimization problem.

**Genome**: A part of a chromosome. The value of each gene has an effect on the quality of solution.

**Chromosome**: A set of genomes. Chromosome is the solution in form of genes.
<div class="imgcap">
<img style="display: inline-block; width: 55%;" src ="/public/post_img/FlappyBirdAI/gene_definition.PNG" width = "500" align = "center">
<div class="thecap">Fig. 2: Population, Chromosomes and Genes</div>
</div>
<a name="selection-mutation-and-crossover"></a>
#### Selection, mutation and crossover
**Selection**: Next generation's population will keep some of the best solution in the previous generation so that best traits is retained.

**Mutation**: Alter genome in chromosome.

**Crossover**: Mixing two individual to produce a new pair of offspring that have the trait of both 
<a name="3-genetic-operators"></a>
## 3. Genetic Operators
<a name="encoding-and-decoding"></a>
### Encoding and Decoding
Encoding technique depends heavily on the problem. Generally, encoding is the order of every genes that have an effects on the solution. Decoding is translate chromosome to solution of optimization problem. Encoding is a method to clean data before putting it in genetic operators.
<div class="imgcap">
<img style="display: inline-block; width: 55%;" src ="/public/post_img/FlappyBirdAI/def_table.PNG" width = "500" align = "center">
</div>
<a name="selection"></a>
### Selection
Selection process is mainly responsible for assuring survival of the best-fit
individuals. Best solution will be retained in the next generation.

**Roulette wheel selection method**

Fitness proportionate selection, also known as roulette wheel selection, is a genetic operator used in GA for selecting potentially useful solutions for recombination.

In this method, each gene have a probability of being selected for next generation. This probability is defined by:

\begin{equation} \label{eq:1}
p_i = \frac{f_i}{\sum_{j=1}^{N}f_j}
\end{equation}
$$p_i$$: Probability of individual with index $$i$$ being selected.

$$f$$: Fitness function

$$f_i$$: Fitness value of individual with index $$i$$

**Best fitness selection method**
In this selection method, best individuals with highest fitness is being selected. This method is a trade off between diversity of population and average fitness of population where diversity decreases and average fitness increases in comparison with Roulette wheel selection method.
<a name="mutation"></a>
### Mutation
Mutation is used to maintain genetic diversity from one generation of a population of
chromosomes to the next. It is analogous to biological mutation. 

The purpose of mutation in GA is preserving and introducing diversity. Mutation should
allow the algorithm to escape local minima by preventing the population of chromosomes
from becoming too similar to each other, thus slowing or even stopping evolution. Mutation can be done with a formula or randomly.
<div class="imgcap">
<img style="display: inline-block; width: 40%;" src ="/public/post_img/FlappyBirdAI/mutation.PNG" width = "500" align = "center">
<div class="thecap">Example of mutation on binary encoding and value encoding</div>
</div>
<a name="crossover"></a>
### Crossover
The crossover splits up the parent individuals and recombines them. Crossover point can be chosen randomly to increase diversity of new population.
<div class="imgcap">
<img style="display: inline-block; width: 40%;" src ="/public/post_img/FlappyBirdAI/mutation.PNG" width = "500" align = "center">
<div class="thecap">Fig. 4: Genetic Code of the parents and offspring before and after the crossover</div>
</div>
Multi-point crossovers are simply crossovers with more than one position where crossover will occur.
<a name="4-implementation"></a>
## 4. Implementation
<a name="implementation-overview"></a>
The algorithm can be done by continuously create new set of possible solution using GA to evolve every generation overtime until an acceptable solution is found.
<a name="implementation-overview"></a>
### Implementation Overview
<a name="flowchart"></a>
### Flowchart
<div class="imgcap">
<img style="display: inline-block; width: 55%;" src ="/public/post_img/FlappyBirdAI/flowchart.PNG" width = "500" align = "center">
<div class="thecap">Fig. 5: GA Flowchart</div>
</div>
<a name="pseudo-algorithm"></a>
### Pseudo Algorithm
```
START 

Initializing population.
Calculate fitness of each individual. 

DO UNTIL BEST SOLUTION IS FOUND 
	Encoding each individual to produce chromosome
	Perform GA operators on exist population
	Decode new population and kill old population

LOOP 

END 
```
<a name="5-application-in-building-ai-for-flappy-bird-game"></a>
## 5. Application in building AI for Flappy Bird Game
<a name="gameplay-overview"></a>
### Gameplay overview
Flappy Bird is a mobile game developed by a Vietnamese developer Dong Nguyen. The objective was to direct a flying bird, named "Faby", who moves continuously to the right, between sets of Mario-like pipes. If the player touches the pipes, they lose. Faby briefly flaps upward each time that the player taps the screen; if the screen is not tapped, Faby falls because of gravity; each pair of pipes that he navigates between earns the player a single point.
<a name="training-model"></a>
### Training model
In this section, multilayer perceptron model will be discussed and an implementation on Flappy Bird game will also be provided.
<a name="neural-network-overiew"></a>
#### Neural Network Overiew
1. **Layer**: They are a set of neuron (a circle that contain a number). Beside input layers and output layers, one Multilayer Perceptron can have one or more hidden layer.
<div class="imgcap">
<img style="display: inline-block; width: 40%;" src ="/public/post_img/FlappyBirdAI/nnmodel.PNG" width = "500" align = "center">
<div class="thecap">Fig. 6: Example of multilayer perceptron network with 2 hidden layers</div>
</div>
2. **Unit**: One node (the circle in Fig $$6$$) is called one unit. Input of each unit is symbolised as $$z$$ and output of each unit is symbolised as $$a$$ ($$a$$ stands for activation, input unit  in next layer)
3. **Weights** and **Biases**: In fig $$7$$, the number that in the line which connects 2 nodes in 2 layer is called Weights, they determine how much affect a node could have on the next input unit in the next layer, biases is the node $$x_0$$ in fig 7, the value is normally constant at 1. They add the flexibility to the network.
<div class="imgcap">
<img style="display: inline-block; width: 40%;" src ="/public/post_img/FlappyBirdAI/feedforward.PNG" width = "500" align = "center">
<div class="thecap">Fig. 7: Feed Forward Process with Sigmoid activator</div>
</div>
4. **Activator**, **activation function**: When talking about activator, they mean the function that apply on a nodes to produce the output unit. The purpose of activation function is to squeeze the value after multiplying nodes value and weights to produce a number within a defined range.
<div class="imgcap">
<img style="display: inline-block; width: 30%;" src ="/public/post_img/FlappyBirdAI/sigmoid.PNG" width = "500" align = "center">
<div class="thecap">Fig. 8: Sigmoid function squeeze number to value of 0 when s goes to -infinity and 1 when x goes to infinity</div>
</div>
<div class="imgcap">
<img style="display: inline-block; width: 30%;" src ="/public/post_img/FlappyBirdAI/activator.PNG" width = "500" align = "center">
<div class="thecap">Fig. 9: Different activation functions</div>
</div>

<a name="neural-network-for-flappy-bird-ai"></a>
#### Neural Network for Flappy Bird AI
In this experiment, a simple multilayer perceptron model [$$^5$$](#ref5) is chosen. The network includes one hidden layer with 6 nodes, one output layer and one input layer. One bias node is added in input layer and hidden layer. These bias nodes ensure constant variable can have an effect on the solution. Hidden layer and output layer use sigmoid function as activator.

Output of neural network is a number in range 0 and 1. ```Threshold``` is set to $$0.5$$. If $$output>0.5$$ then the bird will flap. 
<div class="imgcap">
<img style="display: inline-block; width: 55%;" src ="/public/post_img/FlappyBirdAI/neural.PNG" width = "500" align = "center">
<div class="thecap">Fig. 10: Neural Network Architecture</div>
</div>
<a name="input-of-training-model"></a>
### Input of training model
In neural network, every input should be related to the solution. There are 5 inputs as described in figure 6.
<div class="imgcap">
<img style="display: inline-block; width: 55%;" src ="/public/post_img/FlappyBirdAI/fig11.PNG" width = "500" align = "center">
<div class="thecap">Fig. 11: Experiment result</div>
</div>
**Input 1**: Horizontal distance between bird and Tube (Horizontal line in figure 7)

**Input 2**: Vertical distance between bird and the middle of two tubes (Vertical line in figure 7)

**Input 3**: Width of bird

**Input 4**: Height of bird

**Input 5**: Width of tube
<a name="implementation-of-ga"></a>
### Implementation of GA
<a name="encode"></a>
#### Encode
There are 49 weights in neural network in figure 6. All of these weights are added into an float array of size 49. This array will carry all the information of the whole network. As a result, each array is considered as an chromosome with value encoding method as described in previous section on encoding. Each weight is now a gene in a chromosome.
<a name="applying-genetic-operator"></a>
#### Applying genetic operator
Selection, mutation and crossover is used in this experiment.

Selection: Best fitness selection method 

Mutation: Modify a weight by randomly assign a new number to it. 

Crossover: Exchange two weight by a fixed possibility 
<div class="imgcap">
<img style="display: inline-block; width: 40%;" src ="/public/post_img/FlappyBirdAI/para_table.PNG" width = "500" align = "center">
</div>
<a name="fitness-function"></a>
#### Fitness function
In this experiment, fitness function is simply the survival time of a bird, the unit is the number of frames being refreshed after the bird dies.
<a name="6-experiment-statistical-result"></a>
## 6. Experiment Statistical Result
<div class="imgcap">
<img style="float:left; display: inline-block; width: 50%;" src ="/public/post_img/FlappyBirdAI/plot.PNG" width = "500" align = "center">
<img id="fig1" style="float:left; display: inline-block; width: 50%;" src ="/public/post_img/FlappyBirdAI/plot2.PNG" width = "500" align = "center">
<div class="thecap">Fig. 12: Experiment 1 and 2<br></div>
</div>
<div style="clear:left;"></div>
The two above graphs describe the correlation between number of generation and best fitness score to figure out if GA actually helps the population evolve over time or not. In both experiment, an impressive solution is found. However, the first experiment took 230 generations while the second experiment took over 1000 generations in order to find the best solution. A correlation coefficient (Pearson) is performed to test whether there is a correlation between number of generation and best fitness score.
<div class="imgcap">
<img style="display: inline-block; width: 40%;" src ="/public/post_img/FlappyBirdAI/ex_result.PNG" width = "500" align = "center">
<div class="thecap">Statistical Result</div>
</div>
The code to produce the 2 statistical graphs
```python
import numpy as np
import matplotlib.pyplot as plt
import scipy
from scipy import stats

x = np.asarray(#insert array)

y = np.asarray(#insert array)
# fit with np.polyfit
print(scipy.stats.pearsonr(x, y))
m, b = np.polyfit(x, y, 1)

plt.plot(x, y, '.')
plt.plot(x, m*x + b, '-')
plt.xlabel('Generation')
plt.ylabel('Best Fitness Score')
plt.show()
```
Both experiment share the same result, there is a strong, positive linear relationship between number of generation and best fitness score and Pearson's correlation shows that this relationship is significant, $$r=.5$$, $$p<.001$$.

We can conclude that GA do improve the optimization overtime. However, time complexity cannot be measured exactly due to the high arbitrary aspect.
<a name="7-further-research"></a>
## 7. Further Research
As there are many randomness in GA, the experiment result could be biased. Further research can be done by controlling the arbitrary factors. 
<a name="8-discussion"></a>
## 8. Discussion
It can clearly be seen that there is not much concrete mathematical foundation to GA. The algorithm itself is heavily derived from biology. The performance of GA is also not being calculated or estimated, this is the reason why many people tend to have negative opinions on it. However, I strongly believe that one day, researcher will find a solid foundation and make improvement GA. Neural network is an example, the idea is derived from an unrelated field, namely neuroscience, nodes describe the connection between millions of neurons in the brain of human. Overtime, researchers and developers improve the performance of neural network, some fantastic training technique such as backpropagation are introduced and ensure the convergence of the optimization problem, many variations have been made to neural network too, such as convolutional neural network (CNN), recurrent neural network (RNN) and long short-term memory (LSTM) architecture. Again, I strongly believe that the same boom in research will happen to GA one day.
<a name="9-reference"></a>
## 9. Reference
1. Ali Jafari, Maryam Zekri, Saeed Sadri, Alireza Mallahzade **"Design of Analog Integrated Circuits by Using Genetic Algorithm"**. [Online] Available at:
http://ieeexplore.ieee.org/document/5445763/

2. Haihong Tao, Guisheng Liao, Ling Wang **Space-borne antenna adaptive side-lobe nulling algorithm based on gradient-genetic algorithm.** [Online] Available at: http://ieeexplore.ieee.org/document/1321992/

3. E. Eiben (1994). "Genetic algorithms with multi-parent recombination". PPSN III:
Proceedings of the International Conference on
Evolutionary Computation. The Third
Conference on Parallel Problem Solving from
Nature: 78–87. ISBN 3-540-58484-6

4. E. Schultz, J. Mellander, C. Endorf (2008), "Intrusion Detection and Prevention - A basic genetic algorithm", [image online], http://my.opera.com/blu3c4t/blog/show.dml/2636486. 

5. Andrew, Ng. , 'Machine learning', Standford University Online, lecture notes week 4, [online]: https://www.coursera.org/learn/machine-learning

<a name="source-code-and-report"></a>
## Source Code and Report
The way I implement the AI is:

First, build a normal Flappy Bird game, use space to trigeer Flap() method of the bird.

Second, build ANN class and assign it to each bird. The following code is the whole ANN class in my program, you could read it and hopefully you understand the idea.

```python
import numpy as np
import Bird as Bird_Class
from settings import *
import sys
import random

class ANN:
  def __init__(self, genome = None):
    self.fitness = 0
    self.weight1 = np.random.uniform(-1,1,(HIDDEN_LAYER, INPUT_LAYER + 1))#add bias node by adding 1 to input layer
    self.weight2 = np.random.uniform(-1,1,(OUTPUT_LAYER, HIDDEN_LAYER + 1))

    if genome is not None: #if constructor have genome then use that genome for weight
      self.decode(genome)

  def __sigmoid(self,np_array): #private method in ANN class, apply sigmoid function to numpy array
    return 1.0 / (1.0 + np.exp(-1.0 * np_array))

  def __regularize_input(self, list_input): #regularize input, make it between 0 and 1
    if np.shape(list_input) != (INPUT_LAYER,1): #check dimension of input
      sys.exit('INPUT to Neural Nets doesnt match')

    sum = np.sum(abs(list_input))

    for array in list_input:
      if sum == 0:
        array[0] = 0
      else:
        array[0] = array[0]/sum

  #This function return a number x, if x > threshold then bird.flap()
  def feed_forward(self, list_input): #list_input muse be numpy array dim(2,1)
    if np.shape(list_input) != (INPUT_LAYER,1): #check dimension of input
      sys.exit('INPUT to Neural Nets doesnt match')

    self.__regularize_input(list_input)#regularize input, make it between 0 and 1

    nodes_hidden_layer = np.dot(self.weight1, np.concatenate((np.array([[1]]), list_input),axis = 0)) #concatenate vertically, using matrix multiplication on weight and nodes

    activation_hidden_layer = self.__sigmoid(nodes_hidden_layer) #apply sigmoid activation on hidden layer

    node_output_layer = np.dot(self.weight2, np.concatenate((np.array([[1]]), activation_hidden_layer),axis = 0)) #matrix multiplication of weight and activation to create final output

    return self.__sigmoid(node_output_layer) #apply sigmoid function on final output

  def encode(self): #put all weight into a list double

    genome = [] #write each row from left to right

    for row in range(self.weight1.shape[0]): #read each row first
      for row_element in range(self.weight1.shape[1]): #read element of row from left to right
        genome.append(self.weight1[row][row_element])

    for row in range(self.weight2.shape[0]):
      for row_element in range(self.weight2.shape[1]):
        genome.append(self.weight2[row][row_element])

    return genome

  def decode(self, genome): #read weight from genome
    for i in range(HIDDEN_LAYER): #read genome from left to right
      for j in range(INPUT_LAYER+1):
        self.weight1[i][j] = genome[i*(INPUT_LAYER+1)+j]

    for i in range(OUTPUT_LAYER):
      for j in range(HIDDEN_LAYER+1):
        self.weight2[i][j] = genome[(i*(OUTPUT_LAYER)) + j + HIDDEN_LAYER*(INPUT_LAYER+1)]

  @classmethod #class method is some method that must be call with class, like ANN.selection but the only thing they care about is the parameter
  def selection(cls, bird_list):
    elite_birds_copy = [] #create a copy of list to put all elite bird in to avoid inconsistency problem
    elite_birds =  bird_list[0:round(SELECTION_PERCENTAGE*POPULATION)]

    for bird in elite_birds:
      gen = bird.ANN.encode() #encode to gen
      elite_birds_copy.append(Bird_Class.Bird(gen)) #decode gen to read weight

    return elite_birds_copy

  @classmethod
  def mutation(cls, bird): #change some weights randomly
    gen = bird.ANN.encode()

    for i in range(TOTAL_WEIGHT):
      if (np.random.rand(0,100) < MUTATION_RATE*100):
        gen[i] = np.random.uniform(-1,1) #random float from -1 to 1

    new_bird = Bird_Class.Bird(gen)

    return new_bird

  @classmethod #swap weight with certain chance (MUTATION RATE)
  def crossover(cls, bird1, bird2): #swap weight
    gen_bird1 = bird1.ANN.encode() #mutation on a gene so that the actual bird.ANN will not be change
    gen_bird2 = bird2.ANN.encode()

    for i in gen_bird1:
      if (np.random.rand(0,100) < CROSSOVER_RATE*100): #Create a random number from 0 and 100 and check with possibility of CROSSOVER_RATE
        gen_bird1[i], gen_bird2[i] = gen_bird2[i], gen_bird1[1]

    return [Bird_Class.Bird(gen_bird1), Bird_Class.Bird(gen_bird2)]

  @classmethod
  def save_weight(cls):
    pass

  @classmethod
  def create_new_generation(cls, bird_list):
    new_generation = []

    #selection
    elite_birds = ANN.selection(bird_list)
    new_generation.extend(elite_birds)

    #mutation
    for i in range(0, round(MUTATION_PERCENTAGE*100/POPULATION)):
       new_generation.append(ANN.mutation(bird_list[i]))

    # crossover with the elite birds
    for i in range(round((MUTATION_PERCENTAGE*100/POPULATION)), round(((MUTATION_PERCENTAGE*100/POPULATION) + (CROSSOVER_PERCENTAGE*100/POPULATION)))):
      new_generation.append(ANN.crossover(bird_list[i], elite_birds[random.randint(0,len(elite_birds)-1)])[0])

    #random bird to increase diversity
    for i in range(POPULATION-len(new_generation)):
      new_generation.append(Bird_Class.Bird())

    return new_generation

```
Continue Reading... Please download source code!

[Download PDF Report](/public/post_img/FlappyBirdAI/report.pdf)

<button onclick="myFunction()"><strong>Download Source Code</strong></button>
<div id="myDIV" style="display: none;">
Put your Email address in the comment section below to receive full well-documented code of the whole program.
</div>