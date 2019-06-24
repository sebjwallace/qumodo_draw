## Qumodo CNN MNIST

![Screen Shot of Qumodo Draw](./screenshot.png)

A simple web app to predict the digit that you draw on the canvas. It uses TensorflowJS to execute a CNN model. After the prediction is made the activations of the network are rendered as either feature maps for the 3d tensors or vectors for the 1d tensors.

To install:

```bash
$ npm install
```

To start:

Run the NodeJS HTTP server to serve the CNN model:
```bash
$ npm run server
```

Run the app in dev:
```bash
$ npm start
```

View on `localhost:8080`