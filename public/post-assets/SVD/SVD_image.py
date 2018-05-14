import scipy
from scipy import misc
from scipy import linalg
import numpy as np
import math
import matplotlib
from matplotlib import pyplot as plt

A = scipy.misc.imread('test.png', mode='L')
# Dimesional of image (1024x768)
# print(A.shape)
U,S,V = linalg.svd(A, full_matrices = True)
plt.figure(1)
plt.imshow(A,cmap='gray')
# plt.show()
plt.figure(3)
plt.plot(S)
k = 50
S[k:] = 0

# print(U.shape)
# print(S.shape)
# print(V.shape)
n=1024
m=768
sigma = np.zeros((m, n))
for i in range(min(m, n)):
	sigma[i, i] = S[i]

A = np.dot(U, np.dot(sigma, V))

plt.figure(2)
plt.imshow(A,cmap='gray')



plt.show()
print("...............")