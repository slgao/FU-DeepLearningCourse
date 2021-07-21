#! /usr/bin/env python
# coding=utf-8
# ================================================================
#   Copyright (C) 2021 * Ltd. All rights reserved.
#
#   Editor      : EMACS
#   File name   : 5.py
#   Author      : slgao
#   Created date: Mo Jul 12 2021 23:24:41
#   Description :
#
# ================================================================

import torch

torch.manual_seed(0)
ALL = 1000
N = 20
F = 10
F_prime = 3
B = 32
features = torch.rand(ALL, N, F)
r = torch.rand(ALL, N, 3)
f_batch = features[:B]
f_bar_batch = features[:B]
r_batch = r[:B]

class PointwiseConvolutionLayer(torch.nn.Module):
    def __init__(self, N, F, F_prime):
        super().__init__()
        self.f1 = torch.nn.Linear(F, 128)
        self.f2 = torch.nn.Linear(128, F_prime)
    def forward(self, f_bar_batch): # BxNxF
        output = torch.nn.functional.softplus(self.f1(f_bar_batch))
        return torch.nn.functional.softplus(self.f2(output))


class MessagePassingLayer(torch.nn.Module):
    def __init__(self, N, F):
        super().__init__()
        self.f1 = torch.nn.Linear(1, 128)
        self.f2 = torch.nn.Linear(128, F)
        
    def forward(self, r_batch, f_batch):
        d = torch.cdist(r_batch, r_batch) # BXNxN
        d_ = torch.reshape(d, (r_batch.shape[0], N, N, 1))
        hidden_out = torch.nn.functional.softplus(self.f1(d_))
        d_prime = torch.nn.functional.softplus(self.f2(hidden_out))
        d_prime = torch.transpose(d_prime, 2, 3)  # BxNxFxN
        f_batch = torch.unsqueeze(f_batch, 1)
        _f_bar = torch.matmul(d_prime, f_batch)  # BxNxFxF
        f_bar_output = torch.diagonal(_f_bar, offset=0, dim1=2, dim2=3)  # BxNxF
        return torch.nn.functional.softplus(f_bar_output)

class PropertyPredictor(torch.nn.Module):
    def __init__(self, N, F, F_prime=1):
        super().__init__()
        self.mp_layer = MessagePassingLayer(N, F)
        self.pc_layer = PointwiseConvolutionLayer(N, F, F_prime)
    def forward(self, r_batch, f_batch):
        f_bar_batch = self.mp_layer(r_batch, f_batch)
        f_output = self.pc_layer(f_bar_batch)
        return f_output
        
if __name__ == '__main__':
    model = PropertyPredictor(N, F, F_prime)
    res = model(r_batch, f_batch)
    print(res.shape)
