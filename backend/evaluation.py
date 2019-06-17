import pandas as pd
import numpy as np
import json
from sklearn.preprocessing import PolynomialFeatures
from sklearn import preprocessing
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
import sqlite3
import pickle


def evaluate(json_object):

    data = json.loads(json_object)
    print(data)
    def parse_objects(obj):
        
        dictionary = {}
        for keypoint in obj['keypoints']:
            dictionary[keypoint['part'] + '_x'] = keypoint['position']['x']
            dictionary[keypoint['part'] + '_y'] = keypoint['position']['y']
            dictionary[keypoint['part'] + '_score'] = keypoint['score']
        return dictionary
    l = {}
    l[0] = parse_objects(data)
    cadr = data['cadr'] / 30 * 1000
    print(cadr)
    df = pd.DataFrame(l).transpose()
    df.drop(['leftEye_x', 'leftEye_y',  'nose_x', 'nose_y', 'rightEye_score',
        'rightEye_x', 'rightEye_y'], axis=1, inplace=True)
    x = np.asanyarray(df[['leftElbow_x',
        'leftElbow_y',
        'leftKnee_x', 'leftKnee_y',  'leftShoulder_x',
        'leftShoulder_y',  'leftWrist_x', 'leftWrist_y', 'rightHip_x',
        'rightHip_y',  'rightKnee_x', 'rightKnee_y',
            'rightShoulder_x', 'rightShoulder_y',]])
    #check_x = MinMaxScaler().fit_transform(x)

    with open("linear_model", 'rb') as lr:
        linereg = pickle.load(lr)
    print(x.shape)
    return 0 if (((linereg.predict(x) - cadr ) ** 2) ** 0.5  > 1000) else 1
