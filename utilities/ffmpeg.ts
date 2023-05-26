import ffmpeg from 'fluent-ffmpeg'

let hasExternalFFMPEG = false
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
ffmpeg.setFfmpegPath(ffmpegPath)

const ffprobePath = require('@ffprobe-installer/ffprobe').path
ffmpeg.setFfprobePath(ffprobePath)

export default ffmpeg
