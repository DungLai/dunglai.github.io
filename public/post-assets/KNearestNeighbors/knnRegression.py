import numpy as np
import matplotlib.pyplot as plt
import copy
from bisect import bisect_left
from sklearn import neighbors

#########################################################
"""
Additional funtions for KNN
"""
def takeClosest(myList, myNumber):
	"""
	Assumes myList is sorted. Returns closest value to myNumber.
	If two numbers are equally close, return the smallest number.
	"""
	pos = bisect_left(myList, myNumber)
	if pos == 0:
		return myList[0]
	if pos == len(myList):
		return myList[-1]
	before = myList[pos - 1]
	after = myList[pos]
	if after - myNumber < myNumber - before:
		return after
	else:
		return before

def takeKClosest(myList, myNumber,k):
	"""
	Assumes myList is sorted. Returns closest value to myNumber
	Return a list of k numbers from myList that are closest to myNumber
	"""
	myListCopy = copy.deepcopy(myList) # myList will be manipulated a copy is needed
	listNum = [] # list of k numbers closest to myNumber
	for i in range(0,k):
		"""
		Algorithm: Find a closest number to k then remove that number from myListCopy
		"""
		closestNum = takeClosest(myListCopy, myNumber) 
		listNum.append(closestNum)
		del myListCopy[myListCopy.index(closestNum)]
	return listNum

def takeKClosestIdx(myList, myNumber, k):
	"""
	Get the index of k closest numbers to myNumber
	"""
	closestNums = takeKClosest(myList, myNumber, k)
	listIdx = []
	for i in closestNums:
		listIdx.append(myList.index(i)) # index() function looks up index of number in list
	return listIdx

#########################################################
# Generate sample data
np.random.seed(0) # Get one random set of number every time running the program
X = np.sort(5 * np.random.rand(40, 1), axis=0) # generate 40 values in range (0,5)
y = np.sin(X).ravel() # ravel function spread out matrix to a single row

# Add noise to targets
y[::5] += 1 * (0.5 - np.random.rand(8)) #get a random number every 5 steps

# Fit regression model
x0 = np.linspace(0,5,500) # x0 is used to visualize regression model
y0 = [] # our goal is to fill out y0 based on x0
k_neighbors = 3


# treat every data uniformly, calculate means of k nearest value to each element in x0
for i in x0:
	listIdx = takeKClosestIdx(X.ravel().tolist(), i, k_neighbors) # .ravel().tolist() transform numpy array to list
	sumY = 0
	for j in listIdx:
		sumY += y[j]
	y0.append(sumY/k_neighbors)

# Plot graph
plt.figure(1)    
plt.subplot(211) # first graph of figure 1
plt.title("KNN implemented from scratch")
plt.plot(X,y,'ro') # plot data
plt.plot(x0,y0)		 # plot regression model
plt.subplots_adjust(hspace=0.3) #adjust space between 2 graphs

# Second graph using scikit-learn
plt.subplot(212) # second graph of figure 1
plt.title("KNN using scikit-learn")
for i, weights in enumerate(['uniform']):
	knn = neighbors.KNeighborsRegressor(k_neighbors, weights=weights)
	y0 = knn.fit(X, y).predict(x0[:, np.newaxis])
	plt.plot(X, y, 'ro')
	plt.plot(x0, y0)

plt.show()