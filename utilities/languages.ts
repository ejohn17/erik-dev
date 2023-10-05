const languages = [
	{
		label: 'Afrikaans',
		code: 'af',
	},
	{
		label: 'Albanian',
		code: 'sq',
	},
	{
		label: 'Amharic',
		code: 'am',
	},
	{
		label: 'Arabic',
		code: 'ar',
	},
	{
		label: 'Armenian',
		code: 'hy',
	},
	{
		label: 'Assamese',
		code: 'as',
	},
	{
		label: 'Aymara',
		code: 'ay',
	},
	{
		label: 'Azerbaijani',
		code: 'az',
	},
	{
		label: 'Bamara',
		code: 'bm',
	},
	{
		label: 'Basque',
		code: 'eu',
	},
	{
		label: 'Belarusian',
		code: 'be',
	},
	{
		label: 'Bengali',
		code: 'bn',
	},
	{
		label: 'Bhojpuri',
		code: 'bho',
	},
	{
		label: 'Bosnian',
		code: 'bs',
	},
	{
		label: 'Bulgarian',
		code: 'bg',
	},
	{
		label: 'Catalan',
		code: 'ca',
	},
	{
		label: 'Cebuano',
		code: 'ceb',
	},
	{
		label: 'Chinese (Simplified)',
		code: 'zh',
	},
	{
		label: 'Chinese (Traditional)',
		code: 'zh-TW',
	},
	{
		label: 'Corsician',
		code: 'co',
	},
	{
		label: 'Croatian',
		code: 'hr',
	},
	{
		label: 'Czech',
		code: 'cs',
	},
	{
		label: 'Danish',
		code: 'da',
	},
	{
		label: 'Dhivehi',
		code: 'dv',
	},
	{
		label: 'Dogri',
		code: 'doi',
	},
	{
		label: 'Dutch',
		code: 'nl',
	},
	{
		label: 'English',
		code: 'en',
	},
	{
		label: 'Esperanto',
		code: 'eo',
	},
	{
		label: 'Estonian',
		code: 'et',
	},
	{
		label: 'Ewe',
		code: 'ee',
	},
	{
		label: 'Filipino',
		code: 'fil',
	},
	{
		label: 'Finnish',
		code: 'fi',
	},
	{
		label: 'French',
		code: 'fr',
	},
	{
		label: 'Frisian',
		code: 'fy',
	},
	{
		label: 'Galician',
		code: 'gl',
	},
	{
		label: 'Georgian',
		code: 'ka',
	},
	{
		label: 'German',
		code: 'de',
	},
	{
		label: 'Greek',
		code: 'el',
	},
	{
		label: 'Guarani',
		code: 'gn',
	},
	{
		label: 'Gujarati',
		code: 'gu',
	},
	{
		label: 'Hatian Creole',
		code: 'ht',
	},
	{
		label: 'Hausa',
		code: 'ha',
	},
	{
		label: 'Hawaiian',
		code: 'haw',
	},
	{
		label: 'Hebrew',
		code: 'he',
	},
	{
		label: 'Hindi',
		code: 'hi',
	},
	{
		label: 'Hmong',
		code: 'hmn',
	},
	{
		label: 'Hungarian',
		code: 'hu',
	},
	{
		label: 'Icelandic',
		code: 'is',
	},
	{
		label: 'Igbo',
		code: 'ig',
	},
	{
		label: 'Ilocano',
		code: 'ilo',
	},
	{
		label: 'Indonesian',
		code: 'id',
	},
	{
		label: 'Irish',
		code: 'ga',
	},
	{
		label: 'Italian',
		code: 'it',
	},
	{
		label: 'Japanese',
		code: 'ja',
	},
	{
		label: 'Javanese',
		code: 'jv',
	},
	{
		label: 'Kannada',
		code: 'kn',
	},
	{
		label: 'Kazakh',
		code: 'kk',
	},
	{
		label: 'Khmer',
		code: 'km',
	},
	{
		label: 'Kinyarwanda',
		code: 'rw',
	},
	{
		label: 'Konkani',
		code: 'gom',
	},
	{
		label: 'Korean',
		code: 'ko',
	},
	{
		label: 'Krio',
		code: 'kri',
	},
	{
		label: 'Kurdish',
		code: 'ku',
	},
	{
		label: 'Kurdish (Sorani)',
		code: 'ckb',
	},
	{
		label: 'Kyrgyz',
		code: 'ky',
	},
	{
		label: 'Lao',
		code: 'lo',
	},
	{
		label: 'Latin',
		code: 'la',
	},
	{
		label: 'Latvian',
		code: 'lv',
	},
	{
		label: 'Lingala',
		code: 'ln',
	},
	{
		label: 'Lithuanian',
		code: 'lt',
	},
	{
		label: 'Luganda',
		code: 'lg',
	},
	{
		label: 'Luxembourgish',
		code: 'lb',
	},
	{
		label: 'Macedonian',
		code: 'mk',
	},
	{
		label: 'Maithili',
		code: 'mai',
	},
	{
		label: 'Malagasy',
		code: 'mg',
	},
	{
		label: 'Malay',
		code: 'ms',
	},
	{
		label: 'Malayalam',
		code: 'ml',
	},
	{
		label: 'Maltese',
		code: 'mt',
	},
	{
		label: 'Maori',
		code: 'mi',
	},
	{
		label: 'Marathi',
		code: 'mr',
	},
	{
		label: 'Mizo',
		code: 'lus',
	},
	{
		label: 'Mongolian',
		code: 'mn',
	},
	{
		label: 'Myanmar',
		code: 'my',
	},
	{
		label: 'Nepali',
		code: 'ne',
	},
	{
		label: 'Norwegian',
		code: 'no',
	},
	{
		label: 'Nyanja',
		code: 'ny',
	},
	{
		label: 'Odia',
		code: 'or',
	},
	{
		label: 'Oromo',
		code: 'om',
	},
	{
		label: 'Pashto',
		code: 'ps',
	},
	{
		label: 'Persian',
		code: 'fa',
	},
	{
		label: 'Polish',
		code: 'pl',
	},
	{
		label: 'Portugese',
		code: 'pt',
	},
	{
		label: 'Punjabi',
		code: 'pa',
	},
	{
		label: 'Quechua',
		code: 'qu',
	},
	{
		label: 'Romanian',
		code: 'ro',
	},
	{
		label: 'Russian',
		code: 'ru',
	},
	{
		label: 'Samoan',
		code: 'sm',
	},
	{
		label: 'Sanskrit',
		code: 'sa',
	},
	{
		label: 'Scots Gaelic',
		code: 'gd',
	},
	{
		label: 'Sepedi',
		code: 'nso',
	},
	{
		label: 'Serbian',
		code: 'sr',
	},
	{
		label: 'Sesotho',
		code: 'st',
	},
	{
		label: 'Shona',
		code: 'sn',
	},
	{
		label: 'Sindhi',
		code: 'sd',
	},
	{
		label: 'Sinhala',
		code: 'si',
	},
	{
		label: 'Slovak',
		code: 'sk',
	},
	{
		label: 'Slovenian',
		code: 'sl',
	},
	{
		label: 'Somali',
		code: 'so',
	},
	{
		label: 'Spanish',
		code: 'es',
	},
	{
		label: 'Sudanese',
		code: 'su',
	},
	{
		label: 'Swahili',
		code: 'sw',
	},
	{
		label: 'Swedish',
		code: 'sv',
	},
	{
		label: 'Tagalog',
		code: 'tl',
	},
	{
		label: 'Tajik',
		code: 'tg',
	},
	{
		label: 'Tamil',
		code: 'ta',
	},
	{
		label: 'Tatar',
		code: 'tt',
	},
	{
		label: 'Telugu',
		code: 'te',
	},
	{
		label: 'Thai',
		code: 'th',
	},
	{
		label: 'Tigrinya',
		code: 'ti',
	},
	{
		label: 'Tsonga',
		code: 'ts',
	},
	{
		label: 'Turkish',
		code: 'tr',
	},
	{
		label: 'Turkmen',
		code: 'tk',
	},
	{
		label: 'Twi',
		code: 'ak',
	},
	{
		label: 'Ukrainian',
		code: 'uk',
	},
	{
		label: 'Urdu',
		code: 'ur',
	},
	{
		label: 'Uyghur',
		code: 'ug',
	},
	{
		label: 'Uzbek',
		code: 'uz',
	},
	{
		label: 'Vietnamese',
		code: 'vi',
	},
	{
		label: 'Welsh',
		code: 'cy',
	},
	{
		label: 'Xhosa',
		code: 'xh',
	},
	{
		label: 'Yiddish',
		code: 'yi',
	},
	{
		label: 'Yoruba',
		code: 'yo',
	},
	{
		label: 'Zulu',
		code: 'zu',
	},
]
