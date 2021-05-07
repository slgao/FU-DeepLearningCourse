#! /usr/bin/env python
# coding=utf-8
# ================================================================
#   Copyright (C) 2021 * Ltd. All rights reserved.
#
#   Editor      : EMACS
#   File name   : mnist_prediction.py
#   Author      : slgao
#   Created date: Fr Mai 07 2021 14:43:51
#   Description :
#
# ================================================================

import numpy as np
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Subset
from sklearn.model_selection import train_test_split
from torch.utils.data import TensorDataset, DataLoader
import ipdb


class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, 1)
        self.conv2 = nn.Conv2d(32, 64, 3, 1)
        self.dropout1 = nn.Dropout(0.25)
        self.dropout2 = nn.Dropout(0.5)
        self.fc1 = nn.Linear(9216, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.conv1(x)
        x = F.relu(x)
        x = self.conv2(x)
        x = F.relu(x)
        x = F.max_pool2d(x, 2)
        x = self.dropout1(x)
        x = torch.flatten(x, 1)
        x = self.fc1(x)
        x = F.relu(x)
        x = self.dropout2(x)
        x = self.fc2(x)
        output = F.log_softmax(x, dim=1)
        return output


def train(epoch):
    network.train()
    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad()
        output = network(data)
        loss = F.nll_loss(output, target)
        loss.backward()
        optimizer.step()
        if batch_idx % log_interval == 0:
            print('Train Epoch: {} [{}/{} ({:.0f}%)]\tLoss: {:.6f}'.format(
                epoch, batch_idx * len(data), len(train_loader.dataset),
                100. * batch_idx / len(train_loader), loss.item()))
            train_losses.append(loss.item())
            train_counter.append((batch_idx * 64) +
                                 ((epoch - 1) * len(train_loader.dataset)))


def test():
    network.eval()
    test_loss = 0
    correct = 0
    with torch.no_grad():
        for data, target in val_loader:
            data, target = data.to(device), target.to(device)
            output = network(data)
            test_loss += F.nll_loss(output, target, size_average=False).item()
            pred = output.data.max(1, keepdim=True)[1]
            correct += pred.eq(target.data.view_as(pred)).sum()
    test_loss /= len(val_loader.dataset)
    val_losses.append(test_loss)
    print('\nTest set: Avg. loss: {:.4f}, Accuracy: {}/{} ({:.0f}%)\n'.format(
        test_loss, correct, len(val_loader.dataset),
        100. * correct / len(val_loader.dataset)))


def train_val_dataset(dataset, val_split=0.25):
    train_idx, val_idx = train_test_split(list(range(len(dataset))),
                                          test_size=val_split)
    datasets = {}
    datasets['train'] = Subset(dataset, train_idx)
    datasets['val'] = Subset(dataset, val_idx)
    return datasets


# TRAINING DATA: INPUT (x) AND OUTPUT (y)
# 1. INDEX: IMAGE SERIAL NUMBER
# 2. INDEX: COLOR CHANNEL
# 3/4. INDEX: PIXEL VALUE
# print(data_x.shape, data_x.dtype)
# print(data_y.shape, data_y.dtype)

# TEST DATA: INPUT (x) ONLY
# print(test_x.shape, test_x.dtype)

# plt.imshow(data_x[0, 0])
# plt.title(data_y[0])
# plt.show()

if __name__ == '__main__':
    n_epochs = 15
    batch_size_train = 64
    batch_size_test = 1000
    learning_rate = 0.005
    momentum = 0.5
    log_interval = 10

    random_seed = 1
    torch.backends.cudnn.enabled = False
    torch.manual_seed(random_seed)

    train_losses = []
    train_counter = []
    val_losses = []

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    # device = torch.device("cpu")
    with np.load('prediction-challenge-01-data.npz') as fh:
        data_x = fh['data_x']
        data_y = fh['data_y']
        test_x = fh['test_x']
    train_x = torch.tensor(data_x).to(device)
    train_y = torch.tensor(data_y, dtype=torch.long)
    test_x = torch.tensor(test_x).to(device)
    datasets = TensorDataset(train_x, train_y)
    datasets_splitted = train_val_dataset(datasets)
    dataloaders = {
        x: DataLoader(datasets_splitted[x], 32, shuffle=True, num_workers=0)
        for x in ['train', 'val']
    }
    train_loader = dataloaders['train']
    val_loader = dataloaders['val']
    network = Net()
    network.to(device)
    optimizer = optim.SGD(network.parameters(),
                          lr=learning_rate,
                          momentum=momentum)
    test()
    for epoch in range(1, n_epochs + 1):
        train(epoch)
        test()

    ##############################################
    output = network(test_x)
    prediction = output.data.max(1, keepdim=True)[1]
    if torch.cuda.is_available():
        prediction = prediction[:, 0].cpu().detach().numpy()
    # MAKE SURE THAT YOU HAVE THE RIGHT FORMAT
    assert prediction.ndim == 1
    assert prediction.shape[0] == 2000

    # AND SAVE EXACTLY AS SHOWN BELOW
    np.save('prediction.npy', prediction)
    ###############################################
