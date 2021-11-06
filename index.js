#! /usr/bin/env node

const axios = require("axios");
const cheerio = require("cheerio");

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

readline.question('Article: ', articleNumber => {
	const url =  'https://www.constitutionofindia.net/constitution_of_india/23/articles/Article ' + articleNumber;
	readline.close();
	scrapeData(url, articleNumber)
});

const scrapeData = async (url, articleNumber) => {
	try {
		console.log('Fetching data...')
		const { data } = await axios.get(url)
		const $ = cheerio.load(data)
		const articleContent = $(".description-wrapper p")
		const clauseArray=[]

		articleContent.each((id, el) => {
			const content = el.children
			const clause = content[content.length - 1].data.trim()
			if(clause != '') {
				// Add separator before new clause
				if (id > 0 && !!clause.match(/^\(\d+\)/)) {
					clauseArray.push("\x1b[93m" + "------" + "\x1b[0m")
				}
				clauseArray.push(clause)
			}
		})

		console.clear()
		console.log("\x1b[1;93m" + `Article ${articleNumber}` + "\x1b[0m") //yellow bold
		console.log(clauseArray.join('\n'))
	} catch (err) {
		console.log('Error: Request failed with status code ' + err.response.status)
	}
}
