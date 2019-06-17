import zerorpc
import sqlite3
from model import train_model
from evaluation import evaluate

class StreamingRPC(object):
    @zerorpc.stream
    def streaming_range(self, stage, json, arg):
        if stage == 1:
            train_model(json)
            return (stage, arg)
        elif stage == 2:
            print(2)
            return (evaluate(json), arg)



s = zerorpc.Server(StreamingRPC())
s.bind("tcp://127.0.0.1:4242")
s.run()

