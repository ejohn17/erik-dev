// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { create as createYoutubeDL } from 'youtube-dl-exec'
import { getVideoRef, uploadAudioArray, uploadVideoArray } from '@/firebaseUtils/storage'
import { StorageReference } from 'firebase/storage'
import os from 'os'
import { getSubtitles } from 'youtube-caption-extractor'

import ffmpeg from '@/utilities/ffmpeg'
import { Readable } from 'stream'
import path from 'path'
import fs from 'fs'
import md5 from 'md5'

interface RequestData {
	youtubeURL: string
}

interface ResponseData {
	downloadURL: string
	title: string
	downloadRef: StorageReference
	subtitles: YoutubeSubtitle[]
}

const getVideoID = (url) => {
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
	var match = url.match(regExp)
	return match && match[7].length == 11 ? match[7] : false
}

export interface YoutubeSubtitle {
	start: string
	dur: string
	text: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	const reqData = req.body as RequestData

	const youtubeDl = createYoutubeDL('utilities/ytdlp/yt-dlp')

	const videoID = getVideoID(reqData.youtubeURL)

	const subtitles = await new Promise<YoutubeSubtitle[]>((res) => {
		getSubtitles({ videoID, lang: 'en' })
			.then((captions) => {
				res(captions)
			})
			.catch((e) => {
				console.log('SUBTITLE ERROR', e)
				res([])
			})
	})

	let title = ''
	let finalFileName
	await new Promise((res, rej) => {
		youtubeDl(reqData.youtubeURL, {
			dumpSingleJson: true,
			noCheckCertificates: true,
			noWarnings: true,
			preferFreeFormats: true,
			skipDownload: true,
			addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
		})
			.then((output) => {
				const randHash = md5(output.title + Date.now()).substring(0, 6) // 6 le
				finalFileName = randHash
				title = output.title
				res(null)
			})
			.catch(rej)
	})

	await new Promise(async (res, rej) => {
		await youtubeDl(reqData.youtubeURL, {
			output: `temp/${finalFileName}`,
		})

		const readStream = fs.createReadStream(`temp/${finalFileName}.webm`)
		const bufs = []
		readStream.on('data', function (d) {
			bufs.push(d)
		})
		readStream.on('end', function () {
			res(Buffer.concat(bufs))
		})
	})
		.then(async (videoBuffer: Buffer) => {
			const videoArray = new Uint8Array(videoBuffer)

			const readable = new Readable()
			readable._read = (): void => {} // we already have all data in memory, so no-op this function;
			readable.push(videoBuffer) // stream all data in the buffer to the stream
			readable.push(null)
			const audioBufs = []
			await new Promise((res) => {
				const outStream = ffmpeg(readable)
					.noVideo()
					.withAudioCodec('libmp3lame')
					.audioBitrate(128)
					.audioChannels(1)
					.audioFrequency(22050)
					.audioQuality(0)
					.outputFormat('mp3')
					.on('end', res)
					.pipe()
				outStream.on('data', (d): void => {
					audioBufs.push(d)
				})
			})

			const audioBuffer = Buffer.concat(audioBufs)
			const audioArray = new Uint8Array(audioBuffer)

			const refTitle = `${title.replace(/[/\\?%*:|"<>]/g, '')}.mp4`
			const audioRefTitle = `${title.replace(/[/\\?%*:|"<>]/g, '')}.mp3`
			const [downloadURL] = await Promise.all([
				uploadVideoArray(refTitle, videoArray),
				uploadAudioArray(audioRefTitle, audioArray),
			])
			const downloadRef = getVideoRef(refTitle)

			fs.unlinkSync(`temp/${finalFileName}.webm`)

			res.status(200).json({ downloadURL, title, downloadRef, subtitles })
		})
		.catch((e) => {
			console.log('REJ', e)
		})
}
