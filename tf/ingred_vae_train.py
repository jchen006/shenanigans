import argparse
import os

import tensorflow as tf
import tensorflow.examples.tutorials.mnist.input_data as input_data
import numpy as np

from utils import weight_variable, bias_variable, montage_batch
from vae import VariationalAutoencoder

import inspect
currentdir = os.path.dirname(os.path.abspath(
    inspect.getfile(inspect.currentframe())))
app_dir = os.path.dirname(currentdir)  # go up one level essentially
os.sys.path.insert(0, app_dir)

from app.analytics.analytics import BagOfIngredients
from app.util.data.recipe_parser import Parser
#from analytics import *

DEFAULT_NETWORK_ARCHITECTURE = \
    dict(n_hidden_recog_1=500,  # 1st layer encoder neurons
         n_hidden_recog_2=500,  # 2nd layer encoder neurons
         n_hidden_gener_1=500,  # 1st layer decoder neurons
         n_hidden_gener_2=500,  # 2nd layer decoder neurons
         n_input=1099,  # Ingredients data input (shape: 1099 dim binary vect)
         n_z=10)  # dimensionality of latent space


def create_and_train_vae(network_architecture, recipe_vects, n_samples, learning_rate=0.0001,
                         batch_size=50, training_epochs=10000, display_step=5):

    default_save_path = "save/vae_{}_epochs.ckpt".format(training_epochs)

    if os.path.exists(default_save_path):
        print "RESTORING CKPT FROM", default_save_path
        VAE = VariationalAutoencoder(network_architecture,
                                     learning_rate=learning_rate,
                                     batch_size=1,
                                     save_path=default_save_path)
        VAE.restore_ckpt()
    else:
        VAE = VariationalAutoencoder(network_architecture,
                                     learning_rate=learning_rate,
                                     batch_size=batch_size,
                                     save_path=default_save_path)
        # Training cycle
        for epoch in range(training_epochs):
            avg_cost = 0.
            total_batch = int(n_samples / batch_size)
            # Loop over all batches
            prev_start_idx = 0
            for i in range(total_batch):
                if (n_samples - prev_start_idx < batch_size):
                    prev_start_idx = 0
                recipe_batch = recipe_vects[
                    prev_start_idx:prev_start_idx + batch_size]
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
                print "Epoch:", '%04d' % (epoch + 1), \
                      "cost=", "{:.9f}".format(avg_cost)
        VAE.save_ckpt()
    return VAE


def generate_recipe_from_vae(bag_of_ingred, vae, z_mu=None):
    recipe_vec = vae.generate(z_mu)[0]
    recipe_vec[recipe_vec < 0.5] = 0
    recipe_vec[recipe_vec >= 0.5] = 1
    recipe_string = bag_of_ingred.create_recipe_string_from_vec(recipe_vec)
    print "recipe_vec exists in recipes?:", recipe_vec in bag_of_ingred.recipe_vects
    print "generated recipe:", recipe_string
    return recipe_string

if __name__ == '__main__':
    # Unit Tests ish...
    recipe_parser = Parser()
    recipe_parser.retrieve_data()

    boi = BagOfIngredients(recipe_parser)
    boi.generate_bag_of_ingredients()
    boi.generate_recipe_vectors()
    top_ingreds, top_freqs = boi.get_top_N_ingredient_frequencies(20)
    X = boi.recipe_vects

    n_samples = X.shape[0]

    vae = create_and_train_vae(
        DEFAULT_NETWORK_ARCHITECTURE, X, n_samples, training_epochs=1000)
    generate_recipe_from_vae(boi, vae)
    generate_recipe_from_vae(boi, vae, np.ones(vae.latent_dim))
    generate_recipe_from_vae(boi, vae, range(10))
