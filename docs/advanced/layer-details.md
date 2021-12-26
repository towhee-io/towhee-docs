---
id: layer-details
title: Architecture part III: Layers
---

Towhee offers an increasing group of layer blocks, which play as 'legos' for fast construction of machine learning models. Classical and newly published models are all supported.

Layer blocks, referred to as layers in towhee, are reusable and time-saving, thus need not to be reimplemented for developers, researchers, and machine learning projects. For computation concern, layers can be optimized for different platforms. See towhee's layers in [repo](https://github.com/towhee-io/towhee/tree/main/towhee/models/layers). Developers are welcome to contribute to the diversity of reusable layers.

- Example

[Swin Transformer](https://arxiv.org/pdf/2103.14030.pdf) propose a hierarchical transformer whose representation is computed with shifted windows. The shifted windowing scheme brings greater efficiency by limiting self-attention computation to non-overlapping local windows while also allowing for cross-window connection. This hierarchical architecture has the flexibility to model at various scales and has linear computational complexity with respect to image size[1], which is trained on [imagenet dataset](https://image-net.org/download.php)

Such a network takes only **71** lines using towhee's layers instead of **476** lines making wheels.

[PatchEmbed2D](https://github.com/towhee-io/towhee/blob/main/towhee/models/swin_transformer/patch_embed2d.py), [PatchMerging](https://github.com/towhee-io/towhee/blob/main/towhee/models/swin_transformer/patch_merging.py), and [SwinTransformerBlock](https://github.com/towhee-io/towhee/blob/main/towhee/models/swin_transformer/swin_transformer_block.py) are used to create a Swin Transformer modal.

**Architecture of Swin Transformer**

![img](./swin_arch.png)
