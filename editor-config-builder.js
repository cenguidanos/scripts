const axios = require('axios')
const path = require('path')
const fs = require('fs')
const prettier = require('prettier')

const dirContext = process.argv.slice(2)[0]

const folderPath = path.join(dirContext, '.vscode')
const filePath = path.join(dirContext, '.vscode', 'settings.json')

function createFolder() {
	try {
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath)
			console.log('Folder created on: ' + folderPath)
		}
	} catch (error) {
		console.log(error)
		process.kill(process.pid)
	}
}

async function extractConfigFile() {
	const file = 'https://raw.githubusercontent.com/cenguidanos/scripts/main/vscode-default-config.json'

	try {
		if (!fs.existsSync(filePath)) {
			const { data } = await axios.get(file)
			const stringifyJSON = JSON.stringify(data)

			const formatOptions = { parser: 'json-stringify' }
			const formatInput = prettier.format(stringifyJSON, formatOptions)

			fs.appendFileSync(filePath, formatInput)

			console.log('File created on: ' + filePath)
		}
	} catch (error) {
		console.log(error)
		process.kill(process.pid)
	}
}

function main() {
	createFolder()
	extractConfigFile()
}

main()
