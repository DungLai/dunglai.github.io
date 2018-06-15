import scipy
from scipy import misc
from scipy import linalg
import numpy as np
import math
import matplotlib
from matplotlib import pyplot as plt

# load image test.png and store pixel values in matrix A
# Dimesional of image (1024x768)
A = scipy.misc.imread('test.png', mode='L')

U,S,V = linalg.svd(A, full_matrices = True)
plt.figure(1)
plt.imshow(A,cmap='gray')

# Plot the values of entries in diagonal matrix S
plt.figure(3)
fig, ax = plt.subplots()
plt.plot(S)
ax.set(xlabel='entries index of S', ylabel='actual values of entries')

# k is the number of largest entries on diagonal matrix that will be retained
k = 20
S[k:] = 0

n=1024
m=768
sigma = np.zeros((m, n))
for i in range(min(m, n)):
	sigma[i, i] = S[i]

A = np.dot(U, np.dot(sigma, V))

plt.figure(2)

# Plot image after choosing k biggest entries of S
plt.imshow(A,cmap='gray')

plt.show()