---
id: image-deduplication
title: Image Deduplication
---

# Image Deduplication

## Overview

An Image deduplication task is to find exact(sometimes near as well) duplicates in an image collection. Here is an example:

![Example](image_dedup.png)

## Key Technologies

### Image Preprocessing

Since images can be stored in a computer in various kinds of image formats and different sizes, we need to standardize the input images. The first step is to convert images into one specific format(i.e. jpeg). Also, we might need to cut or rotate images so as to avoid interference. The output of this stepwould be numpy arraies in a certain size.

### Embedding Models

An embedding model is used to convert images into embeddings. Normally an image embedding model is built up with deep neural networks. Once a model is pretrained on a large image dataset, its model weight can be applied directly or with finetune to extract features for music clips.

### Similarity Comparison

Once we have the embeddings, we just need to compare different embeddings. For the exact duplications, we just need to check if all the values are exactly the same. For near duplications, there are many algorithms to calculate the similarity, such as CNN, PHash, WHash, DHash, AHash, etc.

## Towhee

Towhee is an open-source machine learning platform that enables embedding of unstructured data with simplest codes. A Towhee pipeline can easily find duplications by applying the above operators. Towhee provides various image embedding operators and similarity comparison operators. To play with different combinations of embedding models and deduplication models, all users need to do is simply change the operator to use in pipelines' YAML.

With a few lines to call such pipeline, no more difficulty to deduplications anymore.
