---
id: image-deduplication
title: Image Deduplication
---

## Image deduplication

### Overview

An Image deduplication task is to find exact (sometimes near as well) duplicates in an image collection. Here is an example:

![Example](image_dedup.png)

### Key technologies

**Image processing**

Since images can be stored in a computer in various kinds of image formats and different sizes, we need to standardize the input images. The first step is to convert images into one specific format (i.e. jpeg). Also, we might need to cut or rotate images so as to avoid interference. The output of this step would be numpy arrays in a certain size.

**Embedding models**

An embedding model is used to convert images into embeddings. Normally an image embedding model is built up with deep neural networks. Once a model is pretrained on a large image dataset, its model weight can be applied directly or with finetune to extract features for music clips.

**Similarity comparison**

Once we have the embeddings, we just need to compare different embeddings. For the exact duplications, we just need to check if all the values are exactly the same. For near duplications, there are many algorithms to calculate the similarity, such as CNN, PHash, WHash, DHash, AHash, etc.
