#! /usr/bin/env python
# coding=utf-8
# ================================================================
#   Copyright (C) 2021 * Ltd. All rights reserved.
#
#   Editor      : EMACS
#   File name   : vae-cvae-challenge.py
#   Author      : YT
#   Created date: Fr Jun 25 2021 17:17:43
#   Description :
#
# ================================================================
import numpy as np
import sklearn
from sklearn import model_selection
import torch
import torch.nn.functional as F
from torch.optim import Adam
from torch.utils.data import DataLoader, TensorDataset
from tqdm import tqdm
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec


def load_data(data_name):
    with np.load(data_name) as fh:
        data_x = fh['data_x']
        data_y = fh['data_y']
    return data_x, data_y


def show_image(x, batch_size, idx):
    x = x.view(batch_size, 28, 28)
    fig = plt.figure()
    plt.imshow(x[idx].cpu().numpy())


## Model definition
## Encoder
class Encoder(torch.nn.Module):
    """Documentation for Encoder

    """
    def __init__(self, input_dim, hidden_dim, latent_dim):
        super(Encoder, self).__init__()
        self.e1 = torch.nn.Linear(input_dim, hidden_dim)
        self.e2 = torch.nn.Linear(hidden_dim, hidden_dim)
        self.e3 = torch.nn.Linear(hidden_dim, latent_dim)
        self.e4 = torch.nn.Linear(hidden_dim, latent_dim)

    def forward(self, x):
        x = F.leaky_relu(self.e1(x))
        x = F.leaky_relu(self.e2(x))
        mean = self.e3(x)
        log_variance = self.e4(x)
        return mean, log_variance

## Decoder
class Decoder(torch.nn.Module):
    """Documentation for Decoder

    """
    def __init__(self, latent_dim, hidden_dim, output_dim):
        super(Decoder, self).__init__()
        self.d1 = torch.nn.Linear(latent_dim, hidden_dim)
        self.d2 = torch.nn.Linear(hidden_dim, hidden_dim)
        self.d3 = torch.nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        x = F.leaky_relu(self.d1(x))
        x = F.leaky_relu(self.d2(x))
        # output = F.softmax(self.d3(x))
        output = torch.sigmoid(self.d3(x))
        return output


## VAE


class VAE(torch.nn.Module):
    """Documentation for VAE

    """
    def __init__(self, Encoder, Decoder):
        super(VAE, self).__init__()
        self.Encoder = Encoder
        self.Decoder = Decoder

    def reparameterization(self, mean, log_variance):
        variance = torch.exp(.5 * log_variance)
        epsilon = torch.randn_like(variance).to(DEVICE)
        z = mean + variance * epsilon
        return z

    def forward(self, x):
        mean, log_variance = self.Encoder(x)
        z = self.reparameterization(mean, log_variance)
        output = self.Decoder(z)
        return output, mean, log_variance


## Loss function


def loss_func(output, x, mean, log_variance):
    # reproduction_loss = torch.nn.functional.binary_cross_entropy(
    #     output, x, reduction='mean')
    reproduction_loss = F.mse_loss(output, x, reduction='sum')
    KLD = -0.5 * torch.sum(1 + log_variance - mean.pow(2) - log_variance.exp())
    return reproduction_loss + KLD


if __name__ == '__main__':
    data_name = 'vae-cvae-challenge.npz'
    DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    x_dim = 784
    batch_size = 1024
    hidden_dim = 256
    latent_dim = 2
    epochs = 30
    lr = 1e-3
    train = True
    # load the data
    data_x, data_y = load_data(data_name)
    print(data_x.shape, data_y.shape)
    # prepare data, load to torch
    x_train, x_test, y_train, y_test = model_selection.train_test_split(
        data_x, data_y, test_size=.33)

    data_train = torch.from_numpy(x_train)
    label_train = torch.from_numpy(y_train)
    data_test = torch.from_numpy(x_test)
    label_test = torch.from_numpy(y_test)
    dataset_test = TensorDataset(data_test, label_test)

    # data_train = torch.from_numpy(data_x)
    # label_train = torch.from_numpy(data_y)

    dataset_train = TensorDataset(data_train, label_train)

    dl_train = DataLoader(dataset_train, batch_size=batch_size, shuffle=False)

    encoder = Encoder(x_dim, hidden_dim, latent_dim)
    decoder = Decoder(latent_dim, hidden_dim, x_dim)
    vae = VAE(encoder, decoder).to(DEVICE)
    optimizer = Adam(vae.parameters(), lr=lr)

    if train:
        ## train the model
        vae.train()
        loss_list = []
        for epoch in tqdm(range(epochs)):
            loss_epoch = []
            # unsupervised.
            for idx, (x, _) in enumerate(dl_train):
                x = x.to(DEVICE)
                optimizer.zero_grad()
                output, mean, log_variance = vae(x)
                loss = loss_func(output, x, mean, log_variance)
                loss.backward()
                optimizer.step()
                # losses += loss.item()
                if x.shape[0] < batch_size:
                    loss_list += [loss.item() / x.shape[0]]
                else:
                    loss_list += [loss.item() / batch_size]
                loss_epoch += [loss.item()]
            print(f' training loss -- {np.mean(loss_epoch)}')

        # visualize losses
        f, ax = plt.subplots(figsize=(16, 5))
        ax.plot(loss_list)
        ax.title.set_text("Train loss")

        # save model
        torch.save(vae.state_dict(), "vae_model")
    else:
        vae = VAE(Encoder(x_dim, hidden_dim, latent_dim),
                  Decoder(latent_dim, hidden_dim, x_dim))
        vae.load_state_dict(torch.load("vae_model"))
        vae.to(DEVICE)

    vae.eval()
    fig, axe = plt.subplots()
    test_data_sec = data_test[:]
    label_data_sec = label_test[:]
    test_data_sec = test_data_sec.to(DEVICE)
    mu, log_variance = vae.Encoder(test_data_sec)
    mu_x = mu.cpu().detach().numpy()[:, 0]
    mu_y = mu.cpu().detach().numpy()[:, 1]
    labels = label_data_sec.cpu().detach().numpy()
    plt.scatter(mu_x,
                mu_y,
                c=labels,
                cmap=plt.cm.get_cmap('jet', 10),
                alpha=.9,
                edgecolors='black')
    #plt.xlim(np.percentile(mu_x, 0.1), np.percentile(mu_y, 99.9))
    #plt.ylim(np.percentile(mu_y, 0.1), np.percentile(mu_y, 99.9))
    plt.colorbar()
    # plt.show()

    with torch.no_grad():
        for batch_idx, (x, labels) in enumerate(tqdm(dl_train)):
            x = x.view(batch_size, x_dim)
            x = x.to(DEVICE)
            x_recons, _, _ = vae(x)
            break

    show_image(x_recons, batch_size, idx=0)

    recons, _, _ = vae(test_data_sec)
    grid_x = 4
    sample_size = grid_x**2
    ids = np.random.randint(0, recons.shape[0], sample_size)
    samples = recons[ids].cpu().detach().numpy()
    # samples = data_x[ids]

    fig_dec = plt.figure(figsize=(4, 4))
    gs = gridspec.GridSpec(grid_x, grid_x)
    gs.update(wspace=0.05, hspace=0.05)
    for i, sample in enumerate(samples):
        ax = plt.subplot(gs[i])
        plt.axis('off')
        ax.set_xticklabels([])
        ax.set_yticklabels([])
        ax.set_aspect('equal')
        plt.imshow(sample.reshape(28, 28), cmap='Greys_r')

    plt.show()
