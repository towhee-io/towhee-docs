---
id: philosophy
title: Our Mission
---

# Towhee Introduction

## What is Towhee?

Towhee is a flexible, application-oriented framework for computing embedding vectors over unstructured data. It aims to make democratize `anything2vec`, allowing everyone - from beginner developers to large organizations - to train and deploy complex machine learning pipelines with just a few lines of code.

To accomplish this, we built Towhee atop Pytorch, Tensorflow, and scikit-learn. Machine learning models can be mixed and matched, i.e. a single pipeline can include models from all three libraries in addition to some user-defined scripts. To ensure user-friendliness, pipelines can be called in just a single line of code, without needing to understand the underlying models or modules used to build it. For more information, take a look at our quick start page.

## Problems Towhee solves

1) Embeddings require model knowledge: Many models are purpose-built to have a fixed output, with less regard for the intermediate layers. A standard `.forward()` or `.predict()` call on a model trained on the ImageNet dataset, for example, is designed to output probabilities for a thousand different classes as opposed to a normalized embedding vector.

Towhee solves this by treating embedding vectors as first class citizens - embedding vector computation is accessible in a single line of code. Model prototyping and cloud deployment\* is also possible within Towhee.

2) Too many model implementations exist: Machine learning models (NN-based and traditional) are ubiquitous. Different implementations of machine learning models requires different auxiliary code to support testing and fine-tuning, making model evaluation and productionization a tedious task.

Towhee solves this by providing a universal `Operator` wrapper for all models. Operators have a pre-defined API and glue logic to make Towhee work with both Pytorch and Tensorflow.

3) MLOps is easier said than done: Due to the continuous inflow of new training data, many DevOps teams now have a dedicated MLOps subteam to enable automated testing and productionization of machine learning models. The constant architectural updates to SotA deep learning models also creates significant overhead when deploying new said models in production environments.

Towhee solves this by packaging model training, testing, and deployments in a single package. Any of our embedding generation pipelines can be deployed either on a laptop, across a multi-GPU server\*, or in a cluster of machines in just a couple lines of code\*.

\*These features are coming in a future version of Towhee.

## Design philosophy

Towhee was created with a few key design concepts in mind. We differentiate ourselves from other frameworks by making machine learning accessible to a variety of users. To do this, we base Towhee's architecture and design around these key features.

- __Convenient__: Towhee pipelines can be created to implement a variety of practical embedding tasks. We provide a number of pre-built pipelines on our [hub](https://hub.towhee.io).

- __Extensible__: Individual operators within each pipeline can be reconfigured and reused in different pipelines. Pipelines can be deployed anywhere you want - on your local machine, on a server with 4 GPUs, or even in the cloud.

- __Application-oriented__: Instead of being "just another model hub", we provide full end-to-end machine learning pipelines. Each pipeline can make use of any number of machine learning models or Python functions in a variety of configurations - ensembles, flows, or any combination thereof.

Towhee is _not_ a library for building neural nets (a-la Pytorch and Tensorflow) or doing automatic differentiation. We will be providing a training API soon, but it is intended to use either Pytorch, Tensorflow, or scikit-learn as the underlying engine.

## How do I get started?

The best way to get started with Towhee is to install and use it. Our next section covers the steps needed to run your first Towhee pipeline.

<!--
We have plenty of other resources as well:
- []
-->
