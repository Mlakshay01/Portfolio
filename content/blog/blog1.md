---
title: "Attention is All You Need: The Fundamental Breakthrough That Led to Modern AI"
excerpt: "“Attention is All You Need” is a research paper published in 2017 that introduced transformer architecture: A new deep learning model that became the foundation for modern AI, including large language models like those used in chatbots."
slug: "the-transformer-model"
date: "2025-12-09"
author: "Lakshay Malik"
tags: ["AI", "Deep Learning", "LLMs"] 
---

### Attention is all you need: The Fundamental Breakthrough That Led to Modern AI

![Transformer Diagram](/images/blog1/img1.png)


Let’s talk about the fundamental breakthrough that led to what AI is today.

“Attention is All You Need” is a research paper published in 2017 that introduced transformer architecture: A new deep learning model that became the foundation for modern AI, including large language models like those used in chatbots.

It relies entirely on a mechanism called “attention”.

💠 **Attention Mechanism:**

Let’s look at this sentence- “The architect designed a stunning building, but it had a flaw.”

When you read “it” your brain instantly knew “it” refers to the “building”, not the “architect” or the “design” or some other adjective, noun, pronoun…

You’re paying attention to the most relevant word in the past to understand the current one.

That’s exactly what the Attention Mechanism helps LLMs do. When an AI is generating text, word by word, it needs to look back at all the words it has already processed and decide which ones are most important for understanding the current word it’s working on.

🟡 It’s like giving AI the ability to focus and recall context selectively.

Before Attention, AI models struggled with long sentences because they had to cram all past information into a single and messy memory.

It was like trying to remember a 500-page book by only recalling the sentence dictating the entire summary.

🗯️ How “Attention” works and how it solves the above problem:

Here’s what it looks like when AI is focusing on a new word:-

1. Asking Questions (Query): The current word essentially “asks” a question to all the previous words: “Hey, what information do you have that’s relevant to me right now?”

2. Providing Answers (Keys): Every previous word holds a “key” i.e a summary of what kind of information it contains. They “answer” the current word’s question.

3. Sharing Details (Values): Based on how well the “key” answers the “query,” the previous words then share their “values” i.e the actual, detailed information they hold.

➡️ The AI then combines all this relevant “value” information to form a super rich understanding of the current word, allowing it to make a much smarter decision about what comes next!

🟡 What makes it even more powerful is that LLMs don’t just “pay attention” in one way. They do it multiple times simultaneously using what are called **“Attention Heads.”**

Imagine having several different perspectives on the same problem:

1. One head might focus on grammatical relationships.

2. Another might focus on semantic meaning (what words actually mean).

3. A third might look for specific entities like names or places.

This increases the model’s capacity to model complex patterns in the input sequence that require paying attention to different patterns at once.

💠 **Two steps of attention:**

1. Relevance scoring

2. Combining Information

Before any scoring happens, the model transforms the initial vector representation of each word (its embedding) into three separate vectors: **Query (Q), Key (K), and Value (V).**

1️⃣**Relevance Scoring:**

To fill in the vector of the new token i.e one token at a time thats how llm’s generate information — Simply dot product the Q and K matrix.

If a Query and a Key are mathematically pointing in a similar direction (meaning they are highly related), their dot product will be a large, positive number (a high score). If they are unrelated, the score will be small or negative.

⭐ **Scaling (Stability)**

The resulting scores are divided by the square root of the dimension of the key vectors.

The reason: Dividing by root of the dimension prevents the dot product results from becoming too large when the dimension of the vectors is high. This keeps the subsequent calculations stable and prevents the gradient from exploding during training.

**⭐ Normalization (Softmax)**

The scaled scores are then passed through a Softmax function.

The result: Softmax converts the raw, scaled scores into “Attention Weights” which are a set of probabilities between 0 and 1 that all sum up to 1.

2️⃣**Combining Information:**

Now that we have the relevance scores, we multiply the each Value vector V to its corresponding Attention Weight.

This creates a weighted sum of all the Value vectors. The resulting final output vector is a new context rich representation of the current word.

Sources- Hands on Large Language Models(Jay Alammar), google gemini.

![](/images/blog1/img2.png) *Figure: Scaled Dot Product and Multi-Head Attention Flow*
