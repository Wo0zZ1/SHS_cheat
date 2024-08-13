import axios from 'axios'
import readline from 'readline-sync'
import 'dotenv/config'

// ID Аккаунта SHS
const ACCOUNT_ID = process.env.ACCOUNT_ID || readline.question('Введите ID аккаунта: ')

// Bearer токен аккаунта
const BEARER_TOKEN =
	process.env.BEARER_TOKEN || readline.question('Введите Bearer токен: ')

const URL_SET = `https://cloud-save.services.api.unity.com/v1/data/projects/f8e7a96b-6479-4b60-9fd4-0ea26fa77161/players/${ACCOUNT_ID}/item-batch`
const URL_CHECK = `https://cloud-code.services.api.unity.com/v1/projects/f8e7a96b-6479-4b60-9fd4-0ea26fa77161/scripts/DailyRewardHandler`

const startDay = 0

function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}

for (let day = startDay; day <= 140; day += 2) {
	let config = {
		headers: {
			Authorization: `Bearer ${BEARER_TOKEN}`,
			'Content-Type': 'application/json',
		},
	}
	let data = {
		data: [
			{
				key: 'VisitedDaysCount',
				value: day % 7,
			},
		],
	}

	axios.post(URL_SET, data, config).then(res => {
		console.log(res.data)
	})

	await sleep(300)

	axios.post(URL_CHECK, {}, config).then(res => {
		console.log(res.data)
	})

	await sleep(300)
}
