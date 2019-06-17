import zerorpc

class StreamingRPC(object):
    @zerorpc.stream
    def streaming_range(self, fr, to, step):
        return (to, step)

s = zerorpc.Server(StreamingRPC())
s.bind("tcp://127.0.0.1:4242")
s.run()
