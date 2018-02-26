import numpy as np
import matplotlib.pyplot as plt
import random
from sklearn import neighbors, datasets
from sklearn.metrics import accuracy_score
import math
import operator

#########################################################
"""
Additional funtions for KNN
"""
def euclideanDistance(vector1, vector2):
	"""
	Calculate euclideanDistance of 2 vectors (in a list format)
	"""
	if vector1.shape != vector2.shape:
		raise ValueError('Two vector not in same length')

	length = len(vector1)
	distance = 0
	for x in range(length):
		distance += pow((vector1[x] - vector2[x]), 2)

	return math.sqrt(distance)

def getKNeighbors(trainingSet, trainingSetLabel, testInstance, k):
	"""
	Return the list of k nearest neighbors label
	"""
	neighbors = []

	distances = []
	for i in range(0,len(trainingSetLabel)):
		distances.append((euclideanDistance(testInstance, trainingSet[i]), trainingSetLabel[i]))
		distances.sort(key=operator.itemgetter(0)) # sort distance based on first element of each tuples in list (euculidean distance)
	
	for i in range(0,k):
		neighbors.append(distances[i][1]) #Add k nearest neighbors to list

	return neighbors

def getHighestVote(myList):
	"""
	Return most common occurrence item in a list
	"""
	voteDict = {}
	for vote in myList:
		if voteDict.get(vote) == None:
			voteDict[vote] = 1
		else:
			voteDict[vote] += 1

	maxVote = 0
	for key, value in voteDict.items():
		if value > maxVote:
			maxVote = key

	return maxVote

def predictNearestNeighbor(trainingSet, trainingSetLabel, testInstance, k):
	"""
	Return the prediction based on KNN algorithm
	"""
	neighbors = getKNeighbors(trainingSet, trainingSetLabel, testInstance, k)
	return(getHighestVote(neighbors))

def accuracy_score(groundTruth, prediction):
	"""
	Return accuracy score of prediction
	"""
	if len(groundTruth) != len(prediction):
		raise ValueError('Prediction and groundTruth not in same length')

	accuracyCount = 0
	length = len(prediction)
	for i in range(0,length):
		if groundTruth[i] == prediction[i]:
			accuracyCount += 1

	accuracy_score = accuracyCount/length
	return round(accuracy_score,3)


def main():
	# Load iris dataset
	iris = datasets.load_iris()
	iris_X = iris.data # 150 data points, 4 features (Petal Length , Petal Width , Sepal Length , Sepal width)
	iris_y = iris.target # label/class of 150 data points (0,1,2)

	k_neigbors = 5

	# Shuffle data by shuffling the index
	randIndex = np.arange(iris_X.shape[0])
	np.random.shuffle(randIndex)

	iris_X = iris_X[randIndex]
	iris_y = iris_y[randIndex]

	# Split training set/ test set (100/50)
	X_train = iris_X[:100,:]
	X_test = iris_X[100:,:]
	y_train = iris_y[:100]
	y_test = iris_y[100:]

	#apply KNN classifier to each test data
	y_predict = []
	for i in range(0,len(y_test)):
		y_predict.append(predictNearestNeighbor(X_train, y_train, X_test[i], k_neigbors)) 
	
	print(accuracy_score(y_predict, y_test)) #output: 0.98

main()