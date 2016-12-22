import argparse
import os

import tensorflow as tf
import tensorflow.examples.tutorials.mnist.input_data as input_data
import numpy as np

from utils import weight_variable, bias_variable, montage_batch
from vae import VariationalAutoencoder

#mnist = input_data.read_data_sets('MNIST_data', one_hot=True)

#n_samples = mnist.train.num_examples

import inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
app_dir = os.path.join(os.path.dirname(currentdir), 'app')
os.sys.path.insert(0, app_dir)

from analytics import *

parser = Parser()
parser.retrieve_data()

b = BagOfIngredients(parser)
b.generate_bag_of_ingredients()
b.generate_recipe_vectors()
top_ingreds, top_freqs = b.get_top_N_ingredient_frequencies(20)
X = b.recipe_vects

n_samples = X.shape[0]

network_architecture = \
    dict(n_hidden_recog_1=500, # 1st layer encoder neurons
         n_hidden_recog_2=500, # 2nd layer encoder neurons
         n_hidden_gener_1=500, # 1st layer decoder neurons
         n_hidden_gener_2=500, # 2nd layer decoder neurons
         n_input=1099, # MNIST data input (img shape: 28*28)
         n_z=2)  # dimensionality of latent space

def train(network_architecture, learning_rate=0.001,
          batch_size=50, training_epochs=10000, display_step=5):
    VAE = VariationalAutoencoder(network_architecture, 
                                 learning_rate=learning_rate, 
                                 batch_size=batch_size)
    # Training cycle
    for epoch in range(training_epochs):
        avg_cost = 0.
        total_batch = int(n_samples / batch_size)
        # Loop over all batches
        prev_start_idx = 0
        for i in range(total_batch):
            if (X.shape[0] - prev_start_idx < batch_size):
                prev_start_idx = 0
            recipe_batch = X[prev_start_idx:prev_start_idx + batch_size]
            assert recipe_batch.shape[0] == batch_size
            prev_start_idx = prev_start_idx + batch_size
            #batch_xs, _ = mnist.train.next_batch(batch_size)
            batch_xs = recipe_batch

            # Fit training using batch data
            cost = VAE.partial_fit(batch_xs)
            # Compute average loss
            avg_cost += cost / n_samples * batch_size

        # Display logs per epoch step
        if epoch % display_step == 0:
            print "Epoch:", '%04d' % (epoch+1), \
                  "cost=", "{:.9f}".format(avg_cost)
    return VAE

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Train a Variational Autoencoder given a network architecture")
    vae = train(network_architecture, training_epochs=300)
    import pdb; pdb.set_trace()


