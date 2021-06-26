import numpy as np
import torch
import torch.nn.functional as F
from torch.utils.data import TensorDataset, DataLoader
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from tqdm.notebook import tqdm
import itertools

torch.set_default_dtype(torch.float64)


def accuracy(guess, labels):
    assert len(guess) == len(labels)
    guess = guess.squeeze()
    return np.max([
        np.sum(np.array(p)[labels] == guess)
        for p in itertools.permutations([1, 2, 3, 0])
    ]) * 100. / len(labels)


def cluster(data):
    return KMeans(n_clusters=4).fit(data.reshape((-1, 1))).labels_


with np.load('dimredux-challenge-01-data.npz') as fh:
    data_x = fh['data_x']
    validation_x = fh['validation_x']
    validation_y = fh['validation_y']

# TRAINING DATA:
print(data_x.shape, data_x.dtype)

# VALIDATION DATA:
print(validation_x.shape, validation_x.dtype)
print(validation_y.shape, validation_y.dtype)

# f = plt.figure(figsize=(16,9))
# ax = f.add_subplot(111, projection='3d')
# ax.scatter(data_x[:, 0], data_x[:, 1], data_x[:, 2], c=data_x[:, 2])
# plt.show()
