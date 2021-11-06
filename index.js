#! /usr/bin/env node

const axios = require("axios");
const cheerio = require("cheerio");

let url;

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

readline.question('Article: ', number => {
	url =  'https://www.constitutionofindia.net/constitution_of_india/23/articles/Article ' + number
	readline.close();
	scrapeData()
});

const scrapeData = async () => {
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
					clauseArray.push('------')
				}
				clauseArray.push(clause)
			}
		})

		console.clear()
		console.log(clauseArray.join('\n'))
	} catch (err) {
		console.log('Error: Request failed with status code '+err.response.status)
	}
}
