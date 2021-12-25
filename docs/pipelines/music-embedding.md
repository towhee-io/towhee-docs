---
id: music-embedding
title: Audio Embedding Pipelines
---

Audio describes human-hearable sound, which is normally recorded and transmitted via sound files in formats of MP3, FLAC, WAV, AIFF, etc. Audio embedding is the process of converting audio files into vector representations. Audio embeddings extracted by different models can be used for audio fingerprinting or classification.



### Popular Scenarios

- Recognize audio events or scenes
- Translate speech audio into words
- Tag music for genres, artists, emotion
- Identify music with a short clip
- Music copyright infringement
- Generate original music by machine
- ...



### Pipelines

Deep learning models using neural networks models have been introduced to the audio domain in similar ways as they work in image. Most models include preprocessing work such as data splitting, audio convention, downsampling, Fourier Transform, etc. Towhee offers the following pipelines with pretrained models to get embeddings of a given audio:



**[audio-embedding-vggish](https://hub.towhee.io/towhee/audio-embedding-vggish)**

This pipeline uses a VGGish model implemented in Tensorflow. This is a supervised model pretrained with [AudioSet](https://research.google.com/audioset/), which contains over 2 million sound clips. The pipeline output includes a set of vectors representing the given audio.

**[audio-embedding-clmr](https://hub.towhee.io/towhee/audio-embedding-clmr)**

The pipeline uses a pre-trained CLMR model built on top of pytorch. CLMR allows unsupervised learning and performs better than other CNN models on data out of domain. The pipeline implemented with the clmr operator generates vectors of clips, which composes the fingerprint of the input audio.



More on the way ...
