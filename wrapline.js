let newTextArray = [];

const wrapline = (text, maxWidth = process.stdout.columns) => {
	if (text.length <= maxWidth || text.search(' ') === -1) {
		newTextArray.push(text)
		const returnString = newTextArray.join('\n')
		newTextArray = [];
		return returnString;
	}

	// Find last space within maxwidth
	const regex = new RegExp(`(^.{1,${maxWidth}})`, '')
	const maxWidthText = text.match(regex)[0]
	const indexOfLastSpaceInMaxWidthText = maxWidthText.lastIndexOf(' ')

	// Slice wrt last space within maxwidth
	const slicedTextTillLastSpaceInMaxWidthText = text.substr(0,indexOfLastSpaceInMaxWidthText)
	const restOfSlicedText = '   ' + text.substr(indexOfLastSpaceInMaxWidthText)

	newTextArray.push(slicedTextTillLastSpaceInMaxWidthText)
	return wrapline(restOfSlicedText, maxWidth)
}

module.exports = wrapline
