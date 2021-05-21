import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import train_test_split

from tensorflow.keras import layers, models


# MAKE SURE THAT THE FILE HAS THE CORRECT FORMAT
def validate_prediction_format():
    loaded = np.load('prediction.npy')
    assert loaded.shape == (300, )
    assert loaded.dtype == int
    assert (loaded <= 2).all()
    assert (loaded >= 0).all()


classes = ['cat', 'dog', 'frog']


def plot_sample(X, y, index):
    plt.figure(figsize=(4, 4))
    plt.imshow(X[index])
    plt.xlabel(classes[int(y[index])])
    plt.show()


def save_images(X):
    prediction = np.load('prediction.npy')
    for i in range(len(prediction)):
        plt.clf()
        plt.figure(figsize=(4, 4))
        plt.imshow(X[i])
        plt.xlabel(classes[prediction[i]])
        plt.savefig(f'images/prediction_{i}_{classes[prediction[i]]}.jpg')


def model():
    cnn = models.Sequential([
        layers.Conv2D(filters=32,
                      kernel_size=(3, 3),
                      activation='relu',
                      input_shape=(32, 32, 3)),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(filters=64, kernel_size=(3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(3, activation='softmax')
    ])

    cnn.compile(optimizer='adam',
                loss='sparse_categorical_crossentropy',
                metrics=['accuracy'])
    return cnn


with np.load('prediction-challenge-02-data.npz') as fh:
    x_train = fh['x_train']
    y_train = fh['y_train']
    x_test = fh['x_test']

# TRAINING DATA: INPUT (x) AND OUTPUT (y)
# 1. INDEX: IMAGE SERIAL NUMBER (6000)
# 2/3. INDEX: PIXEL VALUE (32 x 32)
# 4. INDEX: COLOR CHANNELS (3)
print(x_train.shape, x_train.dtype)
print(y_train.shape, y_train.dtype)
# TEST DATA: INPUT (x) ONLY
print(x_test.shape, x_test.dtype)
# split dataset
X_train, X_val, Y_train, Y_val = train_test_split(x_train,
                                                  y_train,
                                                  test_size=.2)
# TRAIN MODEL ON x_train, y_train
debug = False
if debug:
    ep = 5
else:
    ep = 20
cnn = model()
cnn.fit(x_train, y_train, epochs=ep)

cnn.evaluate(X_val, Y_val)
y_predict = cnn.predict(x_test)
y_classes = [np.argmax(element) for element in y_predict]
y_cla = np.array(y_classes)
y_cla.astype(np.int32)
y_cla = y_cla.tolist()
np.save('prediction.npy', y_cla)
validate_prediction_format()
# plot_sample(x_test, y_classes, index)
# PREDICT prediction FROM x_test

# AND SAVE EXACTLY AS SHOWN BELOW
# np.save('prediction.npy', prediction.astype(int))

# validate_prediction_format()
