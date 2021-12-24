---
id: music-recognition-system
title: Music Recognition
---

# Music recognition system

## Overview

A music recognition system automatically identifies the unknown sound. It matches input audios with songs in the database. Compared to the traditional methodology using Wavelets, the use of deep learning saves resources and speeds up querying.

![image1](music_intro.png)

## Key Technologies

**Audio Preprocessing**

Sometimes the system needs to transform input audio into specified type and format. The main transformation may include converting file types, splitting into clips of fixed lengths, changing sample rates, and denoising audios. Then the system applies tools and packages to read data and sample rate of audio files after transformations. The data is usually a representation of an audio in a numpy array.

**Embedding Models**

An embedding model is used to convert audios into embeddings. Normally an audio embedding model is built up with deep neural networks. Once a model is pretrained on a large audio dataset, its model weight can be applied directly or with finetune to extract features for music clips.

**Vector Database**

The system requires a proper database to store and retrieve vectors. Especially when dealing with a large scale of vectors, flat search is very slow. It is necessary to have a vector database that can build indexes to reduce search latency. Meanwhile, a database can deal with data storage and persistence.

## Solution

A music recognition system generally transforms audio data to embeddings and compares similarity based on distances between embeddings. Therefore, an encoder converting audio to embedding and a database for vector storage and retrieval are main components.

![image2](music_system.png)

**Towhee**

Towhee[1] is an open-source machine learning platform that enables embedding of unstructured data with simplest codes. A towhee pipeline can easily get embeddings of audio. The pipeline class of audio embedding offers multiple options with different models for various applications.

**Milvus**

Milvus[2] is an open-source vector database which has high performance when conducting vector search on massive datasets. It also allows users to build indexes in order to speed up the querying process.

**System**

The above picture is a brief system architecture of a music recognition system based on Towhee and Milvus. It transforms audio dataset to vectors with a Towhee audio embedding pipeline and then insert all vectors into Milvus. Since Milvus has not supported string type of data, the correspondence between vectors and audio files can be saved in a relational database (eg. A table with fields of Milvus ids and audio file paths in Mysql). The querying steps include the same audio preprocessing and embedding for each search target. Then similarity search of vectors in Milvus passes vector ids into Mysql, finally the system gets most possible music in database.

## Resources

In the music recognition system, audio fringerprints can be extracted through a Towhee pipeline. Towhee hub provides different options of pipelines, such as [audio-embedding-vggish](https://hub.towhee.io/towhee/audio-embedding-vggish) or [audio-embedding-clmr](https://hub.towhee.io/towhee/audio-embedding-clmr), with respect to models.

## References

1. https://github.com/towhee-io/towhee
2. https://github.com/milvus-io/milvus
