const countryCodes: Record<
  string,
  { name: string; code: string; dial_code: string }
> = {
  '1': {
    name: 'United States',
    code: 'US',
    dial_code: '+1',
  },
  '7': {
    name: 'Russia',
    code: 'RU',
    dial_code: '+7',
  },
  '20': {
    name: 'Egypt',
    code: 'EG',
    dial_code: '+20',
  },
  '27': {
    name: 'South Africa',
    code: 'ZA',
    dial_code: '+27',
  },
  '30': {
    name: 'Greece',
    code: 'GR',
    dial_code: '+30',
  },
  '31': {
    name: 'Netherlands',
    code: 'NL',
    dial_code: '+31',
  },
  '32': {
    name: 'Belgium',
    code: 'BE',
    dial_code: '+32',
  },
  '33': {
    name: 'France',
    code: 'FR',
    dial_code: '+33',
  },
  '34': {
    name: 'Spain',
    code: 'ES',
    dial_code: '+34',
  },
  '36': {
    name: 'Hungary',
    code: 'HU',
    dial_code: '+36',
  },
  '39': {
    name: 'Italy',
    code: 'IT',
    dial_code: '+39',
  },
  '40': {
    name: 'Romania',
    code: 'RO',
    dial_code: '+40',
  },
  '41': {
    name: 'Switzerland',
    code: 'CH',
    dial_code: '+41',
  },
  '43': {
    name: 'Austria',
    code: 'AT',
    dial_code: '+43',
  },
  '44': {
    name: 'United Kingdom',
    code: 'GB',
    dial_code: '+44',
  },
  '45': {
    name: 'Denmark',
    code: 'DK',
    dial_code: '+45',
  },
  '46': {
    name: 'Sweden',
    code: 'SE',
    dial_code: '+46',
  },
  '47': {
    name: 'Svalbard and Jan Mayen',
    code: 'SJ',
    dial_code: '+47',
  },
  '48': {
    name: 'Poland',
    code: 'PL',
    dial_code: '+48',
  },
  '49': {
    name: 'Germany',
    code: 'DE',
    dial_code: '+49',
  },
  '51': {
    name: 'Peru',
    code: 'PE',
    dial_code: '+51',
  },
  '52': {
    name: 'Mexico',
    code: 'MX',
    dial_code: '+52',
  },
  '53': {
    name: 'Cuba',
    code: 'CU',
    dial_code: '+53',
  },
  '54': {
    name: 'Argentina',
    code: 'AR',
    dial_code: '+54',
  },
  '55': {
    name: 'Brasil',
    code: 'BR',
    dial_code: '+55',
  },
  '56': {
    name: 'Chile',
    code: 'CL',
    dial_code: '+56',
  },
  '57': {
    name: 'Colombia',
    code: 'CO',
    dial_code: '+57',
  },
  '58': {
    name: 'Venezuela, Bolivarian Republic of Venezuela',
    code: 'VE',
    dial_code: '+58',
  },
  '60': {
    name: 'Malaysia',
    code: 'MY',
    dial_code: '+60',
  },
  '61': {
    name: 'Cocos (Keeling) Islands',
    code: 'CC',
    dial_code: '+61',
  },
  '62': {
    name: 'Indonesia',
    code: 'ID',
    dial_code: '+62',
  },
  '63': {
    name: 'Philippines',
    code: 'PH',
    dial_code: '+63',
  },
  '64': {
    name: 'New Zealand',
    code: 'NZ',
    dial_code: '+64',
  },
  '65': {
    name: 'Singapore',
    code: 'SG',
    dial_code: '+65',
  },
  '66': {
    name: 'Thailand',
    code: 'TH',
    dial_code: '+66',
  },
  '77': {
    name: 'Kazakhstan',
    code: 'KZ',
    dial_code: '+77',
  },
  '81': {
    name: 'Japan',
    code: 'JP',
    dial_code: '+81',
  },
  '82': {
    name: 'Korea, Republic of South Korea',
    code: 'KR',
    dial_code: '+82',
  },
  '84': {
    name: 'Vietnam',
    code: 'VN',
    dial_code: '+84',
  },
  '86': {
    name: 'China',
    code: 'CN',
    dial_code: '+86',
  },
  '90': {
    name: 'Turkey',
    code: 'TR',
    dial_code: '+90',
  },
  '91': {
    name: 'India',
    code: 'IN',
    dial_code: '+91',
  },
  '92': {
    name: 'Pakistan',
    code: 'PK',
    dial_code: '+92',
  },
  '93': {
    name: 'Afghanistan',
    code: 'AF',
    dial_code: '+93',
  },
  '94': {
    name: 'Sri Lanka',
    code: 'LK',
    dial_code: '+94',
  },
  '95': {
    name: 'Myanmar',
    code: 'MM',
    dial_code: '+95',
  },
  '98': {
    name: 'Iran, Islamic Republic of Persian Gulf',
    code: 'IR',
    dial_code: '+98',
  },
  '211': {
    name: 'South Sudan',
    code: 'SS',
    dial_code: '+211',
  },
  '212': {
    name: 'Morocco',
    code: 'MA',
    dial_code: '+212',
  },
  '213': {
    name: 'Algeria',
    code: 'DZ',
    dial_code: '+213',
  },
  '216': {
    name: 'Tunisia',
    code: 'TN',
    dial_code: '+216',
  },
  '218': {
    name: 'Libyan Arab Jamahiriya',
    code: 'LY',
    dial_code: '+218',
  },
  '220': {
    name: 'Gambia',
    code: 'GM',
    dial_code: '+220',
  },
  '221': {
    name: 'Senegal',
    code: 'SN',
    dial_code: '+221',
  },
  '222': {
    name: 'Mauritania',
    code: 'MR',
    dial_code: '+222',
  },
  '223': {
    name: 'Mali',
    code: 'ML',
    dial_code: '+223',
  },
  '224': {
    name: 'Guinea',
    code: 'GN',
    dial_code: '+224',
  },
  '225': {
    name: "Cote d'Ivoire",
    code: 'CI',
    dial_code: '+225',
  },
  '226': {
    name: 'Burkina Faso',
    code: 'BF',
    dial_code: '+226',
  },
  '227': {
    name: 'Niger',
    code: 'NE',
    dial_code: '+227',
  },
  '228': {
    name: 'Togo',
    code: 'TG',
    dial_code: '+228',
  },
  '229': {
    name: 'Benin',
    code: 'BJ',
    dial_code: '+229',
  },
  '230': {
    name: 'Mauritius',
    code: 'MU',
    dial_code: '+230',
  },
  '231': {
    name: 'Liberia',
    code: 'LR',
    dial_code: '+231',
  },
  '232': {
    name: 'Sierra Leone',
    code: 'SL',
    dial_code: '+232',
  },
  '233': {
    name: 'Ghana',
    code: 'GH',
    dial_code: '+233',
  },
  '234': {
    name: 'Nigeria',
    code: 'NG',
    dial_code: '+234',
  },
  '235': {
    name: 'Chad',
    code: 'TD',
    dial_code: '+235',
  },
  '236': {
    name: 'Central African Republic',
    code: 'CF',
    dial_code: '+236',
  },
  '237': {
    name: 'Cameroon',
    code: 'CM',
    dial_code: '+237',
  },
  '238': {
    name: 'Cape Verde',
    code: 'CV',
    dial_code: '+238',
  },
  '239': {
    name: 'Sao Tome and Principe',
    code: 'ST',
    dial_code: '+239',
  },
  '240': {
    name: 'Equatorial Guinea',
    code: 'GQ',
    dial_code: '+240',
  },
  '241': {
    name: 'Gabon',
    code: 'GA',
    dial_code: '+241',
  },
  '242': {
    name: 'Congo',
    code: 'CG',
    dial_code: '+242',
  },
  '243': {
    name: 'Congo, The Democratic Republic of the Congo',
    code: 'CD',
    dial_code: '+243',
  },
  '244': {
    name: 'Angola',
    code: 'AO',
    dial_code: '+244',
  },
  '245': {
    name: 'Guinea-Bissau',
    code: 'GW',
    dial_code: '+245',
  },
  '246': {
    name: 'British Indian Ocean Territory',
    code: 'IO',
    dial_code: '+246',
  },
  '248': {
    name: 'Seychelles',
    code: 'SC',
    dial_code: '+248',
  },
  '249': {
    name: 'Sudan',
    code: 'SD',
    dial_code: '+249',
  },
  '250': {
    name: 'Rwanda',
    code: 'RW',
    dial_code: '+250',
  },
  '251': {
    name: 'Ethiopia',
    code: 'ET',
    dial_code: '+251',
  },
  '252': {
    name: 'Somalia',
    code: 'SO',
    dial_code: '+252',
  },
  '253': {
    name: 'Djibouti',
    code: 'DJ',
    dial_code: '+253',
  },
  '254': {
    name: 'Kenya',
    code: 'KE',
    dial_code: '+254',
  },
  '255': {
    name: 'Tanzania, United Republic of Tanzania',
    code: 'TZ',
    dial_code: '+255',
  },
  '256': {
    name: 'Uganda',
    code: 'UG',
    dial_code: '+256',
  },
  '257': {
    name: 'Burundi',
    code: 'BI',
    dial_code: '+257',
  },
  '258': {
    name: 'Mozambique',
    code: 'MZ',
    dial_code: '+258',
  },
  '260': {
    name: 'Zambia',
    code: 'ZM',
    dial_code: '+260',
  },
  '261': {
    name: 'Madagascar',
    code: 'MG',
    dial_code: '+261',
  },
  '262': {
    name: 'Reunion',
    code: 'RE',
    dial_code: '+262',
  },
  '263': {
    name: 'Zimbabwe',
    code: 'ZW',
    dial_code: '+263',
  },
  '264': {
    name: 'Namibia',
    code: 'NA',
    dial_code: '+264',
  },
  '265': {
    name: 'Malawi',
    code: 'MW',
    dial_code: '+265',
  },
  '266': {
    name: 'Lesotho',
    code: 'LS',
    dial_code: '+266',
  },
  '267': {
    name: 'Botswana',
    code: 'BW',
    dial_code: '+267',
  },
  '268': {
    name: 'Swaziland',
    code: 'SZ',
    dial_code: '+268',
  },
  '269': {
    name: 'Comoros',
    code: 'KM',
    dial_code: '+269',
  },
  '290': {
    name: 'Saint Helena, Ascension and Tristan Da Cunha',
    code: 'SH',
    dial_code: '+290',
  },
  '291': {
    name: 'Eritrea',
    code: 'ER',
    dial_code: '+291',
  },
  '297': {
    name: 'Aruba',
    code: 'AW',
    dial_code: '+297',
  },
  '298': {
    name: 'Faroe Islands',
    code: 'FO',
    dial_code: '+298',
  },
  '299': {
    name: 'Greenland',
    code: 'GL',
    dial_code: '+299',
  },
  '345': {
    name: 'Cayman Islands',
    code: 'KY',
    dial_code: '+ 345',
  },
  '350': {
    name: 'Gibraltar',
    code: 'GI',
    dial_code: '+350',
  },
  '351': {
    name: 'Portugal',
    code: 'PT',
    dial_code: '+351',
  },
  '352': {
    name: 'Luxembourg',
    code: 'LU',
    dial_code: '+352',
  },
  '353': {
    name: 'Ireland',
    code: 'IE',
    dial_code: '+353',
  },
  '354': {
    name: 'Iceland',
    code: 'IS',
    dial_code: '+354',
  },
  '355': {
    name: 'Albania',
    code: 'AL',
    dial_code: '+355',
  },
  '356': {
    name: 'Malta',
    code: 'MT',
    dial_code: '+356',
  },
  '357': {
    name: 'Cyprus',
    code: 'CY',
    dial_code: '+357',
  },
  '358': {
    name: 'Finland',
    code: 'FI',
    dial_code: '+358',
  },
  '359': {
    name: 'Bulgaria',
    code: 'BG',
    dial_code: '+359',
  },
  '370': {
    name: 'Lithuania',
    code: 'LT',
    dial_code: '+370',
  },
  '371': {
    name: 'Latvia',
    code: 'LV',
    dial_code: '+371',
  },
  '372': {
    name: 'Estonia',
    code: 'EE',
    dial_code: '+372',
  },
  '373': {
    name: 'Moldova',
    code: 'MD',
    dial_code: '+373',
  },
  '374': {
    name: 'Armenia',
    code: 'AM',
    dial_code: '+374',
  },
  '375': {
    name: 'Belarus',
    code: 'BY',
    dial_code: '+375',
  },
  '376': {
    name: 'Andorra',
    code: 'AD',
    dial_code: '+376',
  },
  '377': {
    name: 'Monaco',
    code: 'MC',
    dial_code: '+377',
  },
  '378': {
    name: 'San Marino',
    code: 'SM',
    dial_code: '+378',
  },
  '379': {
    name: 'Holy See (Vatican City State)',
    code: 'VA',
    dial_code: '+379',
  },
  '380': {
    name: 'Ukraine',
    code: 'UA',
    dial_code: '+380',
  },
  '381': {
    name: 'Serbia',
    code: 'RS',
    dial_code: '+381',
  },
  '382': {
    name: 'Montenegro',
    code: 'ME',
    dial_code: '+382',
  },
  '385': {
    name: 'Croatia',
    code: 'HR',
    dial_code: '+385',
  },
  '386': {
    name: 'Slovenia',
    code: 'SI',
    dial_code: '+386',
  },
  '387': {
    name: 'Bosnia and Herzegovina',
    code: 'BA',
    dial_code: '+387',
  },
  '389': {
    name: 'Macedonia',
    code: 'MK',
    dial_code: '+389',
  },
  '420': {
    name: 'Czech Republic',
    code: 'CZ',
    dial_code: '+420',
  },
  '421': {
    name: 'Slovakia',
    code: 'SK',
    dial_code: '+421',
  },
  '423': {
    name: 'Liechtenstein',
    code: 'LI',
    dial_code: '+423',
  },
  '500': {
    name: 'South Georgia and the South Sandwich Islands',
    code: 'GS',
    dial_code: '+500',
  },
  '501': {
    name: 'Belize',
    code: 'BZ',
    dial_code: '+501',
  },
  '502': {
    name: 'Guatemala',
    code: 'GT',
    dial_code: '+502',
  },
  '503': {
    name: 'El Salvador',
    code: 'SV',
    dial_code: '+503',
  },
  '504': {
    name: 'Honduras',
    code: 'HN',
    dial_code: '+504',
  },
  '505': {
    name: 'Nicaragua',
    code: 'NI',
    dial_code: '+505',
  },
  '506': {
    name: 'Costa Rica',
    code: 'CR',
    dial_code: '+506',
  },
  '507': {
    name: 'Panama',
    code: 'PA',
    dial_code: '+507',
  },
  '508': {
    name: 'Saint Pierre and Miquelon',
    code: 'PM',
    dial_code: '+508',
  },
  '509': {
    name: 'Haiti',
    code: 'HT',
    dial_code: '+509',
  },
  '590': {
    name: 'Saint Martin',
    code: 'MF',
    dial_code: '+590',
  },
  '591': {
    name: 'Bolivia, Plurinational State of',
    code: 'BO',
    dial_code: '+591',
  },
  '593': {
    name: 'Ecuador',
    code: 'EC',
    dial_code: '+593',
  },
  '594': {
    name: 'French Guiana',
    code: 'GF',
    dial_code: '+594',
  },
  '595': {
    name: 'Paraguay',
    code: 'PY',
    dial_code: '+595',
  },
  '596': {
    name: 'Martinique',
    code: 'MQ',
    dial_code: '+596',
  },
  '597': {
    name: 'Suriname',
    code: 'SR',
    dial_code: '+597',
  },
  '598': {
    name: 'Uruguay',
    code: 'UY',
    dial_code: '+598',
  },
  '599': {
    name: 'Netherlands Antilles',
    code: 'AN',
    dial_code: '+599',
  },
  '670': {
    name: 'Timor-Leste',
    code: 'TL',
    dial_code: '+670',
  },
  '672': {
    name: 'Norfolk Island',
    code: 'NF',
    dial_code: '+672',
  },
  '673': {
    name: 'Brunei Darussalam',
    code: 'BN',
    dial_code: '+673',
  },
  '674': {
    name: 'Nauru',
    code: 'NR',
    dial_code: '+674',
  },
  '675': {
    name: 'Papua New Guinea',
    code: 'PG',
    dial_code: '+675',
  },
  '676': {
    name: 'Tonga',
    code: 'TO',
    dial_code: '+676',
  },
  '677': {
    name: 'Solomon Islands',
    code: 'SB',
    dial_code: '+677',
  },
  '678': {
    name: 'Vanuatu',
    code: 'VU',
    dial_code: '+678',
  },
  '679': {
    name: 'Fiji',
    code: 'FJ',
    dial_code: '+679',
  },
  '680': {
    name: 'Palau',
    code: 'PW',
    dial_code: '+680',
  },
  '681': {
    name: 'Wallis and Futuna',
    code: 'WF',
    dial_code: '+681',
  },
  '682': {
    name: 'Cook Islands',
    code: 'CK',
    dial_code: '+682',
  },
  '683': {
    name: 'Niue',
    code: 'NU',
    dial_code: '+683',
  },
  '685': {
    name: 'Samoa',
    code: 'WS',
    dial_code: '+685',
  },
  '686': {
    name: 'Kiribati',
    code: 'KI',
    dial_code: '+686',
  },
  '687': {
    name: 'New Caledonia',
    code: 'NC',
    dial_code: '+687',
  },
  '688': {
    name: 'Tuvalu',
    code: 'TV',
    dial_code: '+688',
  },
  '689': {
    name: 'French Polynesia',
    code: 'PF',
    dial_code: '+689',
  },
  '690': {
    name: 'Tokelau',
    code: 'TK',
    dial_code: '+690',
  },
  '691': {
    name: 'Micronesia, Federated States of Micronesia',
    code: 'FM',
    dial_code: '+691',
  },
  '692': {
    name: 'Marshall Islands',
    code: 'MH',
    dial_code: '+692',
  },
  '850': {
    name: "Korea, Democratic People's Republic of Korea",
    code: 'KP',
    dial_code: '+850',
  },
  '852': {
    name: 'Hong Kong',
    code: 'HK',
    dial_code: '+852',
  },
  '853': {
    name: 'Macao',
    code: 'MO',
    dial_code: '+853',
  },
  '855': {
    name: 'Cambodia',
    code: 'KH',
    dial_code: '+855',
  },
  '856': {
    name: 'Laos',
    code: 'LA',
    dial_code: '+856',
  },
  '872': {
    name: 'Pitcairn',
    code: 'PN',
    dial_code: '+872',
  },
  '880': {
    name: 'Bangladesh',
    code: 'BD',
    dial_code: '+880',
  },
  '886': {
    name: 'Taiwan',
    code: 'TW',
    dial_code: '+886',
  },
  '960': {
    name: 'Maldives',
    code: 'MV',
    dial_code: '+960',
  },
  '961': {
    name: 'Lebanon',
    code: 'LB',
    dial_code: '+961',
  },
  '962': {
    name: 'Jordan',
    code: 'JO',
    dial_code: '+962',
  },
  '963': {
    name: 'Syrian Arab Republic',
    code: 'SY',
    dial_code: '+963',
  },
  '964': {
    name: 'Iraq',
    code: 'IQ',
    dial_code: '+964',
  },
  '965': {
    name: 'Kuwait',
    code: 'KW',
    dial_code: '+965',
  },
  '966': {
    name: 'Saudi Arabia',
    code: 'SA',
    dial_code: '+966',
  },
  '967': {
    name: 'Yemen',
    code: 'YE',
    dial_code: '+967',
  },
  '968': {
    name: 'Oman',
    code: 'OM',
    dial_code: '+968',
  },
  '970': {
    name: 'Palestinian Territory, Occupied',
    code: 'PS',
    dial_code: '+970',
  },
  '971': {
    name: 'United Arab Emirates',
    code: 'AE',
    dial_code: '+971',
  },
  '972': {
    name: 'Israel',
    code: 'IL',
    dial_code: '+972',
  },
  '973': {
    name: 'Bahrain',
    code: 'BH',
    dial_code: '+973',
  },
  '974': {
    name: 'Qatar',
    code: 'QA',
    dial_code: '+974',
  },
  '975': {
    name: 'Bhutan',
    code: 'BT',
    dial_code: '+975',
  },
  '976': {
    name: 'Mongolia',
    code: 'MN',
    dial_code: '+976',
  },
  '977': {
    name: 'Nepal',
    code: 'NP',
    dial_code: '+977',
  },
  '992': {
    name: 'Tajikistan',
    code: 'TJ',
    dial_code: '+992',
  },
  '993': {
    name: 'Turkmenistan',
    code: 'TM',
    dial_code: '+993',
  },
  '994': {
    name: 'Azerbaijan',
    code: 'AZ',
    dial_code: '+994',
  },
  '995': {
    name: 'Georgia',
    code: 'GE',
    dial_code: '+995',
  },
  '996': {
    name: 'Kyrgyzstan',
    code: 'KG',
    dial_code: '+996',
  },
  '998': {
    name: 'Uzbekistan',
    code: 'UZ',
    dial_code: '+998',
  },
  '1242': {
    name: 'Bahamas',
    code: 'BS',
    dial_code: '+1242',
  },
  '1246': {
    name: 'Barbados',
    code: 'BB',
    dial_code: '+1246',
  },
  '1264': {
    name: 'Anguilla',
    code: 'AI',
    dial_code: '+1264',
  },
  '1268': {
    name: 'Antigua and Barbuda',
    code: 'AG',
    dial_code: '+1268',
  },
  '1284': {
    name: 'Virgin Islands, British',
    code: 'VG',
    dial_code: '+1284',
  },
  '1340': {
    name: 'Virgin Islands, U.S.',
    code: 'VI',
    dial_code: '+1340',
  },
  '1441': {
    name: 'Bermuda',
    code: 'BM',
    dial_code: '+1441',
  },
  '1473': {
    name: 'Grenada',
    code: 'GD',
    dial_code: '+1473',
  },
  '1649': {
    name: 'Turks and Caicos Islands',
    code: 'TC',
    dial_code: '+1649',
  },
  '1664': {
    name: 'Montserrat',
    code: 'MS',
    dial_code: '+1664',
  },
  '1670': {
    name: 'Northern Mariana Islands',
    code: 'MP',
    dial_code: '+1670',
  },
  '1671': {
    name: 'Guam',
    code: 'GU',
    dial_code: '+1671',
  },
  '1684': {
    name: 'AmericanSamoa',
    code: 'AS',
    dial_code: '+1684',
  },
  '1758': {
    name: 'Saint Lucia',
    code: 'LC',
    dial_code: '+1758',
  },
  '1767': {
    name: 'Dominica',
    code: 'DM',
    dial_code: '+1767',
  },
  '1784': {
    name: 'Saint Vincent and the Grenadines',
    code: 'VC',
    dial_code: '+1784',
  },
  '1849': {
    name: 'Dominican Republic',
    code: 'DO',
    dial_code: '+1849',
  },
  '1868': {
    name: 'Trinidad and Tobago',
    code: 'TT',
    dial_code: '+1868',
  },
  '1869': {
    name: 'Saint Kitts and Nevis',
    code: 'KN',
    dial_code: '+1869',
  },
  '1876': {
    name: 'Jamaica',
    code: 'JM',
    dial_code: '+1876',
  },
  '1939': {
    name: 'Puerto Rico',
    code: 'PR',
    dial_code: '+1939',
  },
}

export { countryCodes }
