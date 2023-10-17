// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { YoutubeSubtitle } from './youtubeUpload'
import ffmpeg from '@/utilities/ffmpeg'

import path from 'path'

import md5 from 'md5'
import fs from 'fs'
import * as fsExtra from 'fs-extra'
import { addHeadingZero, addMultipleHeadingZero } from '@/utilities/addHeadingZero'
import { uploadVideoArray } from '@/firebaseUtils/storage'

import http from 'https'
import { Readable } from 'stream'
import languages from '@/utilities/languages'

const buildSRT = (data: YoutubeSubtitle, idx: number): string => {
	const start = parseFloat(data.start)
	const end = parseFloat(data.start)

	const startH = addHeadingZero(Math.floor(start / 3600))
	const startM = addHeadingZero(Math.floor(start / 60))
	const startS = addHeadingZero(Math.floor(start % 60.0))
	const startMilli = addMultipleHeadingZero(parseFloat(((start - Math.floor(start)) * 1000).toFixed(0)))

	const endH = addHeadingZero(Math.floor(end / 3600))
	const endM = addHeadingZero(Math.floor(end / 60))
	const endS = addHeadingZero(Math.floor(end % 60.0))
	const endMilli = addMultipleHeadingZero(parseFloat(((end - Math.floor(end)) * 1000).toFixed(0)))

	let srt = `${idx + 1}\n`
	srt += `${startH}:${startM}:${startS},${startMilli} --> ${endH}:${endM}:${endS},${endMilli}\n`
	srt += `${data.text}\n`

	return srt
}

interface RequestData {
	cloudURL: string
	captions: YoutubeSubtitle[]
	title: string
	lang: string
	langKey: string
}

interface ResponseData {
	downloadURL: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	const reqData = req.body as RequestData

	try {
		const randomHashForThisRequest = md5(`${new Date().getTime() + Math.random() * 10000}`)

		const srtPath = path.resolve('temp', 'srt', randomHashForThisRequest, 'videoCaptions.srt')
		const videoPath = path.resolve('temp', 'srt', randomHashForThisRequest, 'tempVideo.mp4')
		const convertedVideo = path.resolve('temp', 'srt', randomHashForThisRequest, 'convertedVideo.mp4')
		if (!fs.existsSync(path.resolve('temp', 'srt', randomHashForThisRequest))) {
			fsExtra.ensureDirSync(path.resolve('temp', 'srt', randomHashForThisRequest))
		}
		const timings = reqData.captions.map((t, idx) => {
			return buildSRT(t, idx)
		})
		fs.writeFileSync(srtPath, timings.join('\n'), 'utf-8')

		const iso = languages.find((lang) => lang.code === reqData.langKey).iso

		await new Promise((res) => {
			const file = fs.createWriteStream(videoPath)

			http.get(reqData.cloudURL, (response) => {
				response.pipe(file)
			})
			file.on('finish', res)
		})

		const videoBufs = [] as Buffer[]
		await new Promise((resolve, reject) => {
			ffmpeg()
				.input(videoPath)
				.input(srtPath)
				.outputOptions(
					iso
						? [
								'-map 0', // Map all streams from the first input (video)
								'-map 1', // Map all streams from the second input (subtitles)
								'-scodec mov_text', // Specifies the codec for subtitle stream
								`-metadata:s:s:0 language=${iso}`, // Set language for the first subtitle stream to English
						  ]
						: [
								'-map 0', // Map all streams from the first input (video)
								'-map 1', // Map all streams from the second input (subtitles)
								'-scodec mov_text', // Specifies the codec for subtitle stream
						  ],
				)
				.toFormat('mp4')
				.save(convertedVideo)
				.on('end', resolve)
				.on('error', (error) => {
					console.log('Error Code:', error.code)
					console.log('Error Message:', error.message)
					console.log('Error Stack:', error.stack)
					reject(error)
				})
		})

		await new Promise((resolve, reject) => {
			const readable = fs.createReadStream(convertedVideo)
			readable.on('data', (data) => videoBufs.push(data as Buffer))
			readable.on('end', resolve)
		})

		const videoBuffer = Buffer.concat(videoBufs)
		const videoArray = new Uint8Array(videoBuffer)

		const refTitle = `${reqData.title.replace(/[/\\?%*:|"<>]/g, '')}-${reqData.lang}.mp4`
		const downloadURL = await uploadVideoArray(refTitle, videoArray)

		fsExtra.emptyDirSync(path.resolve('temp', 'srt', randomHashForThisRequest))
		fsExtra.rmdirSync(path.resolve('temp', 'srt', randomHashForThisRequest))

		res.status(200).json({ downloadURL })
	} catch (e) {
		console.log('Translation error: ', e)
		res.status(500).send(e)
	}
}
