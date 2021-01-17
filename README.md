# Turku Forge – Playground

This repository is for testing frameworks and libraries in the form of POCs to see if they are usable in a real project. Also, this is a great place for comparing the usefulness of technologies with respect to our use cases.

## Getting started

1. Create a new directory for your POC.
   - If the POC focuses on frontend, put it in `frontend/<language>/<your-poc-name>`
   - If the POC focuses on backend, put it in `backend/<language>/<your-poc-name>` 
1. Add a `README.md` where you explain the purpose of the POC and what you're trying to achieve.

**NOTE: Please remember to write a `README.md`! This helps to explain what you are doing and why.**

## Commits

When you create a commit, try following [these conventions](https://chris.beams.io/posts/git-commit/#seven-rules):

1. Separate subject from body with a blank line
1. Limit the subject line to 50 characters
1. Capitalize the subject line
1. Do not end the subject line with a period
1. Use the imperative mood in the subject line
   - A properly formed Git commit subject line should always be able to complete the following sentence:
   > If applied, this commit will *your subject line here*
1. Wrap the body at 72 characters
1. Use the body to explain what and why vs. how

**Also**, to better keep track of which commit belongs to what POC, **start the commit message with** `(<poc-name>)`.

### Example

```shell
(<poc-name>) Change the stuff I've been working on

I did this thing because I wanted to!
```

 The body, i.e. the description, is optional but highly encouraged!
