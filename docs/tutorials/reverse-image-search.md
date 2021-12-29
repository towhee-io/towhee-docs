---
id: reverse-image-search
title: Reverse image search
---

### Overview

**Reverse image search** helps you search for similar or related images given an input image. Reverse image search is a [content-based image retrieval](https://en.wikipedia.org/wiki/Content-based_image_retrieval) (CBIR) query technique that involves providing the CBIR system with a query image that it will then base its search upon. Unlike the traditional image search (which often relies on performing text queries across user-generated labels), reverse image search is based on the content of the image itself.

A few applications of reverse image search include finding the original source of an image, searching for similar content, and product recommendation:

**Find the source**: Search for the exact same image, often to find the original source of the image, or a low-resolution thumbnail.

**Get the similar image**: Find similar images based on a photo, helping designers and staff find similar works faster and more efficiently.

**Product recommendation**: Search for product images taken by users on the e-commerce platform to find the same or similar products, and recommend related products, improving the convenience of searching, and optimizing user experience.

All these uses cases, however, run into the same questions: "How can we better analyze our images?", "Are the searched image results satisfactory?", "Is the search efficient when scaled", and "What technology is needed to achieve these results?".

### Key components

With the speedy development within the field of AI, more and more methods of processing unstructured data are created, with many of them being applicable to the reverse image search use case. Although classified as different techniques, they all tend to follow the same outline. The outline is usually as follows: the image data is preprocessed, a model is then used to extract the embedding vectors from the images, and lastly the embeddings vectors are stored and queried for within a vector database.

##### Preprocessing

Image preprocessing is a necessary step in most ML applications. Preprocessing brings standardization in application inputs and allows for better model generalization on future inputs. In our case, this preprocessing comes in the form of data convention(convert image data into a uniform data format, such as PIL.Image,tensor), cropping, and normilization. Although it may seem optional, most models today require a certain input criteria that can only be met with preprocessing.

##### Embedding model

Models, usually in the form of neural nets, are used to extract embedding vectors and are often the most critical component of modern CBIR systems. When trained on a large datasets, such as [ImageNet](https://www.image-net.org/) and [YFCC100M](http://projects.dfki.uni-kl.de/yfcc100m/), the layer of the model that the embeddings are extracted from plays a big role in the following search. Earlier layers often catch lower level features, such as edges and corners, while deeper layers catch higher level semantics. 

The image embedding pipeline that we are going to be using is based on the Resnet50 model. Acquiring embedding vectors from Resnet50 is incredibly easy in Towhee:

```python
>>> from towhee import pipeline
>>> embedding_pipeline = pipeline('image-embedding')  # instantiate the pipeline
```

##### Vector database

In order to achieve a working reverse image search system, having fast and effective search tools is very important. When dealing with large vectors, using brute-force search methods will make the system very slow, so we need a database that can both reliably store the vectors and build indices across the vectors for fast searches.

[Milvus](http://milvus.io) is an open source vector database that can achieve millisecond-level responses over hundreds of millions of vectors. It contains a variety of options for indices and similarity metrics, which can meet the various computing needs of users.

```python
>>> from milvus import Milvus
>>> milvus = Milvus(host='localhost', port='19530')
>>> results = milvus.search(collection_name='reverse_image_search', query_records=query_embeddings, top_k=10, params={'nprobe': 16})
```

Note that this step assumes that Milvus (and its Python bindings) are already installed and that vectors have already been added into the database. For more information on the installation and insert process, please visit the [Milvus docs](https://milvus.io/docs/v1.1.1/install_milvus.md).

### Putting it all together

As mentioned in the previous section, a reverse image search system consists of three main components:

1. Image preprocessing.
2. A forward pass through a machine learning model.
3. A vector database for vector storage, indexing, and querying.

The following code snippet will allows you to implement a reverse image search system using Towhee:

```python
>>> from towhee import pipeline
>>> from milvus import Milvus
>>> embedding_pipeline = pipeline('image-embedding')
>>> query_embeddings = embedding_pipeline('/path/to/img')
>>> results = milvus.search(collection_name='reverse_image_search', query_records=query_embeddings, top_k=10, params={'nprobe': 16})
```

![img](reverse_image_search.png)

### Resources

In the reverse image search system, image feature extraction can be achieved through a Towhee pipeline such as [`image-embedding-resnet50`](https://hub.towhee.io/towhee/image-embedding-resnet50). Please visit [this page](pipelines/image-embedding) a full list of image embedding pipelines Towhee supports.
