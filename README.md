# SpaceAPI - Mission Service

This is a GraphQL service that is apart of the [federated SpaceAPI](https://graph.spaceapi.dev) graph.

This focuses on providing data about NASA's Apollo space program that includes flight and astronaut information.

## Requirements

- [Vercel](https://vercel.com) Account

## Running Locally

```shell
vercel dev
```

When you run the above command for the first time, you'll be prompted to configure a Vercel project for this repository. From there you'll be able to run `vercel dev` to start the project and other associated `vercel` commands for deploying your own instance.

## Updating Data

This project uses a _baked data_ design pattern using SQLite3 DB. For now, changes to the database must be committed to the repository. Data can be updated through the `*.csv` files under the `seeds/` root-level directory.

## Deployments

This project is configured for deployment as a serverless function [Vercel](https://vercel.com).

## Associated Projects

This project leverages a small constellation of federated GraphQL services that are made available through an Apollo Gateway (https://graph.spaceapi.dev).

- [space-api](https://github.com/sjungling/space-api)
- [spaceapi-gateway-graphql](https://github.com/sjungling/spaceapi-gateway-graphql)
- [spaceapi-media-graphql](https://github.com/sjungling/spaceapi-media-graphql)
