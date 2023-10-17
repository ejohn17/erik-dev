const languages = [
	{
		label: 'Afrikaans',
		code: 'af',
		iso: 'afr',
	},
	{
		label: 'Albanian',
		code: 'sq',
		iso: 'sqi',
	},
	{
		label: 'Amharic',
		code: 'am',
		iso: 'amh',
	},
	{
		label: 'Arabic',
		code: 'ar',
		iso: 'ara',
	},
	{
		label: 'Armenian',
		code: 'hy',
		iso: 'hye',
	},
	{
		label: 'Assamese',
		code: 'as',
		iso: 'asm',
	},
	{
		label: 'Aymara',
		code: 'ay',
		iso: 'aym',
	},
	{
		label: 'Azerbaijani',
		code: 'az',
		iso: 'aze',
	},
	{
		label: 'Bambara',
		code: 'bm',
		iso: 'bam',
	},
	{
		label: 'Basque',
		code: 'eu',
		iso: 'eus',
	},
	{
		label: 'Belarusian',
		code: 'be',
		iso: 'bel',
	},
	{
		label: 'Bengali',
		code: 'bn',
		iso: 'ben',
	},
	{
		label: 'Bhojpuri',
		code: 'bho',
		iso: 'bho',
	},
	{
		label: 'Bosnian',
		code: 'bs',
		iso: 'bos',
	},
	{
		label: 'Bulgarian',
		code: 'bg',
		iso: 'bul',
	},
	{
		label: 'Catalan',
		code: 'ca',
		iso: 'cat',
	},
	{
		label: 'Cebuano',
		code: 'ceb',
		iso: 'ceb',
	},
	{
		label: 'Chinese (Simplified)',
		code: 'zh',
		iso: 'zho',
	},
	{
		label: 'Chinese (Traditional)',
		code: 'zh-TW',
		iso: 'zh-TW',
	},
	{
		label: 'Corsician',
		code: 'co',
		iso: 'cos',
	},
	{
		label: 'Croatian',
		code: 'hr',
		iso: 'hrv',
	},
	{
		label: 'Czech',
		code: 'cs',
		iso: 'ces',
	},
	{
		label: 'Danish',
		code: 'da',
		iso: 'dan',
	},
	{
		label: 'Dhivehi',
		code: 'dv',
		iso: 'div',
	},
	{
		label: 'Dogri',
		code: 'doi',
		iso: 'doi',
	},
	{
		label: 'Dutch',
		code: 'nl',
		iso: 'nld',
	},
	{
		label: 'English',
		code: 'en',
		iso: 'eng',
	},
	{
		label: 'Esperanto',
		code: 'eo',
		iso: 'epo',
	},
	{
		label: 'Estonian',
		code: 'et',
		iso: 'est',
	},
	{
		label: 'Ewe',
		code: 'ee',
		iso: 'ewe',
	},
	{
		label: 'Filipino',
		code: 'fil',
		iso: 'fil',
	},
	{
		label: 'Finnish',
		code: 'fi',
		iso: 'fin',
	},
	{
		label: 'French',
		code: 'fr',
		iso: 'fra',
	},
	{
		label: 'Frisian',
		code: 'fy',
		iso: 'fry',
	},
	{
		label: 'Galician',
		code: 'gl',
		iso: 'glg',
	},
	{
		label: 'Georgian',
		code: 'ka',
		iso: 'kat',
	},
	{
		label: 'German',
		code: 'de',
		iso: 'deu',
	},
	{
		label: 'Greek',
		code: 'el',
		iso: 'ell',
	},
	{
		label: 'Guarani',
		code: 'gn',
		iso: 'grn',
	},
	{
		label: 'Gujarati',
		code: 'gu',
		iso: 'guj',
	},
	{
		label: 'Hatian Creole',
		code: 'ht',
		iso: 'hat',
	},
	{
		label: 'Hausa',
		code: 'ha',
		iso: 'hau',
	},
	{
		label: 'Hawaiian',
		code: 'haw',
		iso: 'haw',
	},
	{
		label: 'Hebrew',
		code: 'he',
		iso: 'heb',
	},
	{
		label: 'Hindi',
		code: 'hi',
		iso: 'hin',
	},
	{
		label: 'Hmong',
		code: 'hmn',
		iso: 'hmn',
	},
	{
		label: 'Hungarian',
		code: 'hu',
		iso: 'hun',
	},
	{
		label: 'Icelandic',
		code: 'is',
		iso: 'isl',
	},
	{
		label: 'Igbo',
		code: 'ig',
		iso: 'ibo',
	},
	{
		label: 'Ilocano',
		code: 'ilo',
		iso: 'ilo',
	},
	{
		label: 'Indonesian',
		code: 'id',
		iso: 'ind',
	},
	{
		label: 'Irish',
		code: 'ga',
		iso: 'gle',
	},
	{
		label: 'Italian',
		code: 'it',
		iso: 'ita',
	},
	{
		label: 'Japanese',
		code: 'ja',
		iso: 'jpn',
	},
	{
		label: 'Javanese',
		code: 'jv',
		iso: 'jav',
	},
	{
		label: 'Kannada',
		code: 'kn',
		iso: 'kan',
	},
	{
		label: 'Kazakh',
		code: 'kk',
		iso: 'kaz',
	},
	{
		label: 'Khmer',
		code: 'km',
		iso: 'khm',
	},
	{
		label: 'Kinyarwanda',
		code: 'rw',
		iso: 'kin',
	},
	{
		label: 'Konkani',
		code: 'gom',
		iso: 'gom',
	},
	{
		label: 'Korean',
		code: 'ko',
		iso: 'kor',
	},
	{
		label: 'Krio',
		code: 'kri',
		iso: 'kri',
	},
	{
		label: 'Kurdish',
		code: 'ku',
		iso: 'kur',
	},
	{
		label: 'Kurdish (Sorani)',
		code: 'ckb',
		iso: 'ckb',
	},
	{
		label: 'Kyrgyz',
		code: 'ky',
		iso: 'kir',
	},
	{
		label: 'Lao',
		code: 'lo',
		iso: 'lao',
	},
	{
		label: 'Latin',
		code: 'la',
		iso: 'lat',
	},
	{
		label: 'Latvian',
		code: 'lv',
		iso: 'lav',
	},
	{
		label: 'Lingala',
		code: 'ln',
		iso: 'lin',
	},
	{
		label: 'Lithuanian',
		code: 'lt',
		iso: 'lit',
	},
	{
		label: 'Luganda',
		code: 'lg',
		iso: 'lug',
	},
	{
		label: 'Luxembourgish',
		code: 'lb',
		iso: 'ltz',
	},
	{
		label: 'Macedonian',
		code: 'mk',
		iso: 'mkd',
	},
	{
		label: 'Maithili',
		code: 'mai',
		iso: 'mai',
	},
	{
		label: 'Malagasy',
		code: 'mg',
		iso: 'mlg',
	},
	{
		label: 'Malay',
		code: 'ms',
		iso: 'msa',
	},
	{
		label: 'Malayalam',
		code: 'ml',
		iso: 'mal',
	},
	{
		label: 'Maltese',
		code: 'mt',
		iso: 'mlt',
	},
	{
		label: 'Maori',
		code: 'mi',
		iso: 'mri',
	},
	{
		label: 'Marathi',
		code: 'mr',
		iso: 'mar',
	},
	{
		label: 'Mizo',
		code: 'lus',
		iso: 'lus',
	},
	{
		label: 'Mongolian',
		code: 'mn',
		iso: 'mon',
	},
	{
		label: 'Myanmar',
		code: 'my',
		iso: 'mya',
	},
	{
		label: 'Nepali',
		code: 'ne',
		iso: 'nep',
	},
	{
		label: 'Norwegian',
		code: 'no',
		iso: 'nor',
	},
	{
		label: 'Nyanja',
		code: 'ny',
		iso: 'nya',
	},
	{
		label: 'Oria',
		code: 'or',
		iso: 'ori',
	},
	{
		label: 'Oromo',
		code: 'om',
		iso: 'orm',
	},
	{
		label: 'Pashto',
		code: 'ps',
		iso: 'pus',
	},
	{
		label: 'Persian',
		code: 'fa',
		iso: 'fas',
	},
	{
		label: 'Polish',
		code: 'pl',
		iso: 'pol',
	},
	{
		label: 'Portugese',
		code: 'pt',
		iso: 'por',
	},
	{
		label: 'Punjabi',
		code: 'pa',
		iso: 'pan',
	},
	{
		label: 'Quechua',
		code: 'qu',
		iso: 'que',
	},
	{
		label: 'Romanian',
		code: 'ro',
		iso: 'ron',
	},
	{
		label: 'Russian',
		code: 'ru',
		iso: 'rus',
	},
	{
		label: 'Samoan',
		code: 'sm',
		iso: 'smo',
	},
	{
		label: 'Sanskrit',
		code: 'sa',
		iso: 'san',
	},
	{
		label: 'Scots Gaelic',
		code: 'gd',
		iso: 'gd',
	},
	{
		label: 'Sepedi',
		code: 'nso',
		iso: 'nso',
	},
	{
		label: 'Serbian',
		code: 'sr',
		iso: 'srp',
	},
	{
		label: 'Sesotho',
		code: 'st',
		iso: 'sto',
	},
	{
		label: 'Shona',
		code: 'sn',
		iso: 'sna',
	},
	{
		label: 'Sindhi',
		code: 'sd',
		iso: 'snd',
	},
	{
		label: 'Sinhala',
		code: 'si',
		iso: 'sin',
	},
	{
		label: 'Slovak',
		code: 'sk',
		iso: 'slk',
	},
	{
		label: 'Slovenian',
		code: 'sl',
		iso: 'slv',
	},
	{
		label: 'Somali',
		code: 'so',
		iso: 'som',
	},
	{
		label: 'Spanish',
		code: 'es',
		iso: 'spa',
	},
	{
		label: 'Sudanese',
		code: 'su',
		iso: 'sun',
	},
	{
		label: 'Swahili',
		code: 'sw',
		iso: 'swa',
	},
	{
		label: 'Swedish',
		code: 'sv',
		iso: 'swe',
	},
	{
		label: 'Tagalog',
		code: 'tl',
		iso: 'tgl',
	},
	{
		label: 'Tajik',
		code: 'tg',
		iso: 'tgk',
	},
	{
		label: 'Tamil',
		code: 'ta',
		iso: 'tam',
	},
	{
		label: 'Tatar',
		code: 'tt',
		iso: 'tat',
	},
	{
		label: 'Telugu',
		code: 'te',
		iso: 'tel',
	},
	{
		label: 'Thai',
		code: 'th',
		iso: 'tha',
	},
	{
		label: 'Tigrinya',
		code: 'ti',
		iso: 'tir',
	},
	{
		label: 'Tsonga',
		code: 'ts',
		iso: 'tso',
	},
	{
		label: 'Turkish',
		code: 'tr',
		iso: 'tur',
	},
	{
		label: 'Turkmen',
		code: 'tk',
		iso: 'tuk',
	},
	{
		label: 'Twi',
		code: 'ak',
		iso: 'twi',
	},
	{
		label: 'Ukrainian',
		code: 'uk',
		iso: 'ukr',
	},
	{
		label: 'Urdu',
		code: 'ur',
		iso: 'urd',
	},
	{
		label: 'Uyghur',
		code: 'ug',
		iso: 'uig',
	},
	{
		label: 'Uzbek',
		code: 'uz',
		iso: 'uzb',
	},
	{
		label: 'Vietnamese',
		code: 'vi',
		iso: 'vie',
	},
	{
		label: 'Welsh',
		code: 'cy',
		iso: 'cym',
	},
	{
		label: 'Xhosa',
		code: 'xh',
		iso: 'xho',
	},
	{
		label: 'Yiddish',
		code: 'yi',
		iso: 'yid',
	},
	{
		label: 'Yoruba',
		code: 'yo',
		iso: 'yor',
	},
	{
		label: 'Zulu',
		code: 'zu',
		iso: 'zul',
	},
]

export default languages
