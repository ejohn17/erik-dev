// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { create as createYoutubeDL } from 'youtube-dl-exec'
import { getVideoRef, uploadVideoArray } from '@/firebaseUtils/storage'
import { StorageReference } from 'firebase/storage'
import os from 'os'
import { getSubtitles } from 'youtube-captions-scraper'

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

	let path = 'utilities/ytdlp/yt-dlp'
	const platform = os.platform()
	if (os.platform() === 'win32') {
		path = 'utilities/ytdlp/yt-dlp.exe'
	} else if (platform == 'darwin') {
		path = 'utilities/ytdlp/yt-dlp_macos'
	}
	const youtubeDl = createYoutubeDL(path)

	const videoID = getVideoID(reqData.youtubeURL)

	const subtitles = await new Promise<YoutubeSubtitle[]>((res) => {
		getSubtitles({
			videoID: videoID,
			lang: 'en',
		})
			.then((captions) => {
				res(captions)
			})
			.catch((e) => {
				console.log('SUBTITLE ERROR', e)
				res([])
			})
	})

	let title = ''
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
				title = output.title
				res(null)
			})
			.catch(rej)
	})

	const bufs = [] as Buffer[]
	await new Promise((res, rej) => {
		const child = (youtubeDl as any).exec([`${reqData.youtubeURL}`, `-o`, `-`])
		child.stdout.on('data', (data: Buffer) => {
			bufs.push(data)
		})
		child.on('exit', res)
	})
		.then(async () => {
			const videoBuffer = Buffer.concat(bufs)
			const videoArray = new Uint8Array(videoBuffer)

			const refTitle = `${title.replace(/[/\\?%*:|"<>]/g, '')}.mp4`
			const downloadURL = await uploadVideoArray(refTitle, videoArray)
			const downloadRef = getVideoRef(refTitle)

			res.status(200).json({ downloadURL, title, downloadRef, subtitles })
		})
		.catch(() => {
			console.log('REJ')
		})
}
