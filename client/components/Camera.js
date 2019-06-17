import {drawKeyPoints, drawSkeleton} from './utils'
import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import io from 'socket.io-client'
import {PRISYAD, PRISYADONE} from './Events'

const socketURL = 'http://localhost:3030'
class PoseNet extends Component {
  static defaultProps = {
    videoWidth: 900,
    videoHeight: 700,
    flipHorizontal: true,
    algorithm: 'single-pose',
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.01,
    minPartConfidence: 0.05,
    maxPoseDetections: 2,
    nmsRadius: 20,
    outputStride: 32,
    imageScaleFactor: 0.5,
    skeletonColor: '#fff',
    skeletonLineWidth: 6,
    loadingText: 'Loading...please be patient...'
  }

  constructor(props) {
    super(props, PoseNet.defaultProps)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      isRecording: false,
      arr: [],
      socket: null,
      cadr: 0
    }
  }

  getCanvas = elem => {
    this.canvas = elem
  }

  getVideo = elem => {
    this.video = elem
  }

  componentWillMount() {
    this.initSocket()
  }

  initSocket = () => {
    const socket = io(socketURL)
    socket.on('connect', () => {
      console.log('connected')
    })
    this.setState({socket})
  }
  async componentDidMount() {
    try {
      await this.setupCamera()
    } catch (error) {
      throw new Error(
        'This browser does not support video capture, or this device does not have a camera'
      )
    }

    try {
      this.posenet = await posenet.load()
    } catch (error) {
      throw new Error('PoseNet failed to load')
    } finally {
      setTimeout(() => {
        this.setState({loading: false})
      }, 200)
    }

    this.detectPose()
  }

  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      )
    }
    const {videoWidth, videoHeight} = this.props
    const video = this.video
    video.width = videoWidth
    video.height = videoHeight

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: videoWidth,
        height: videoHeight
      }
    })

    video.srcObject = stream

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play()
        resolve(video)
      }
    })
  }

  detectPose() {
    const {videoWidth, videoHeight} = this.props
    const canvas = this.canvas
    const canvasContext = canvas.getContext('2d')

    canvas.width = videoWidth
    canvas.height = videoHeight

    this.poseDetectionFrame(canvasContext)
  }

  poseDetectionFrame(canvasContext) {
    const {
      algorithm,
      imageScaleFactor,
      flipHorizontal,
      outputStride,
      minPoseConfidence,
      minPartConfidence,
      maxPoseDetections,
      nmsRadius,
      videoWidth,
      videoHeight,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth
    } = this.props

    const posenetModel = this.posenet
    const video = this.video

    const findPoseDetectionFrame = async () => {
      let poses = []

      switch (algorithm) {
        case 'multi-pose': {
          poses = await posenetModel.estimateMultiplePoses(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride,
            maxPoseDetections,
            minPartConfidence,
            nmsRadius
          )
          break
        }
        case 'single-pose': {
          const pose = await posenetModel.estimateSinglePose(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride
          )
          poses.push(pose)
          break
        }
      }

      canvasContext.clearRect(0, 0, videoWidth, videoHeight)

      if (showVideo) {
        canvasContext.save()
        canvasContext.scale(-1, 1)
        canvasContext.translate(-videoWidth, 0)
        canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
        canvasContext.restore()
      }
      poses.forEach(({score, keypoints}) => {
        if (score >= minPoseConfidence) {
          if (showPoints) {
            drawKeyPoints(
              keypoints,
              minPartConfidence,
              skeletonColor,
              canvasContext
            )
            if (this.state.isRecording === true) {
              let newobj = {
                keypoints: keypoints,
                cadr: this.state.cadr++
              }
              this.setState({arr: [...this.state.arr, newobj]})
            }
          }
          if (showSkeleton) {
            drawSkeleton(
              keypoints,
              minPartConfidence,
              skeletonColor,
              skeletonLineWidth,
              canvasContext
            )
          }
        }
      })
      requestAnimationFrame(findPoseDetectionFrame)
    }
    findPoseDetectionFrame()
  }
  handleClickForOne = () => {
    this.setState({isRecording: true});
    let sock1 = setInterval(async () => {
     await this.state.socket.emit(
          PRISYADONE,
          JSON.stringify(this.state.arr[this.state.arr.length - 1])
      )
      this.setState({
        arr: [],
      })
    }, 150);

    setTimeout(() => {

      // this.state.socket.emit(
      //     PRISYAD,
      //     JSON.stringify(this.state.arr)
      // );

      // var blob = new Blob([JSON.stringify(this.state.arr, null, 2)], {
      //   type: 'application/json;charset=utf-8'
      // }).slice(2, -1)
      // var url = URL.createObjectURL(blob)
      // var elem = document.createElement('a')
      // elem.href = url
      // elem.download = 'filename.txt'
      // document.body.appendChild(elem)
      // elem.click();
      // document.body.removeChild(elem)
      // clearInterval(sock)
      clearInterval(sock1);
      this.setState({
        isRecording: false,
        arr: [],
        cadr: 0
      })
    }, 3000)
  };

  handleClick = () => {
    this.setState({isRecording: true});
    let sock = setInterval(() => {
      this.state.socket.emit(
        PRISYAD,
        JSON.stringify(this.state.arr)
      )
    }, 3000);
    // let sock1 = setInterval(() => {
    //   this.state.socket.emit(
    //       PRISYADONE,
    //       JSON.stringify(this.state.arr[this.state.arr.length - 1])
    //   )
    // }, 200);

    setTimeout(() => {

        // this.state.socket.emit(
        //     PRISYAD,
        //     JSON.stringify(this.state.arr)
        // );

      var blob = new Blob([JSON.stringify(this.state.arr, null, 2)], {
        type: 'application/json;charset=utf-8'
      }).slice(2, -1)
      var url = URL.createObjectURL(blob)
      var elem = document.createElement('a')
      elem.href = url
      elem.download = 'filename.txt'
      document.body.appendChild(elem)
      // elem.click();
      document.body.removeChild(elem)
      clearInterval(sock)
      // clearInterval(sock1)
      this.setState({
        isRecording: false,
        arr: [],
        cadr: 0
      })
    }, 3000)
  }

  render() {
    return (
      <div>
          <video id="videoNoShow" playsInline ref={this.getVideo} />
          <canvas className="webcam" ref={this.getCanvas} />
          <button onClick={this.handleClick}>start</button>
          <button onClick={this.handleClickForOne}>
          send one
        </button>
        </div>
    )
  }
}

export default PoseNet
