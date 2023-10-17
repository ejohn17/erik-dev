import { app } from '@/pages/_app'
import {
	FirebaseStorage,
	StorageReference,
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
	getBlob,
} from 'firebase/storage'

export const getVideoStorage = (): FirebaseStorage => {
	return getStorage(app, 'gs://erik-dev-uploaded-videos')
}

export const getVideoRef = (filePath: string): StorageReference => {
	return ref(getVideoStorage(), filePath)
}

export const uploadVideoArray = async (filePath: string, videoBuffer: Uint8Array) => {
	const metadata = {
		contentType: 'video/mp4',
	}

	return uploadBytes(getVideoRef(filePath), videoBuffer, metadata).then((snapshot) => getDownloadURL(snapshot.ref))
}

export const uploadAudioArray = async (filePath: string, videoBuffer: Uint8Array) => {
	const metadata = {
		contentType: 'audio/mp3',
	}

	return uploadBytes(getVideoRef(filePath), videoBuffer, metadata).then((snapshot) => getDownloadURL(snapshot.ref))
}

export const getVideoBlob = async (ref: StorageReference): Promise<Blob> => {
	return await getBlob(ref)
}
