// get the results data from the other imported script
const results = data

// variable for the namespace 
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

// keep frame data, mainly the size
const frame = {
    height: 0,
    width: 0,
    insetOffset: 20
}

// keep some reference data
const resultsMetaData = {
    maxNumberOfDices: 0,
    maxExecutionTime: 0
}

// store version names
const versionNames = results.tests[0].results.map((versionResult) => versionResult.versionName)

/* performancesByVersion: {
    versionName: [
        { numberOfDices, averageExecutionTime },
        { numberOfDices, averageExecutionTime },
        ...
    ],
    ...
} */
const performancesByVersion = {}

for (const version of versionNames) {
    performancesByVersion[version] = results.tests.map((test) => ({
        numberOfDices: test.numberOfDices,
        averageExecutionTime: test.results.find((versionResult) => versionResult.versionName === version).averageExecutionTime
    }))
}


// set color for each version
const versionColors = {}

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

for(let i = 0; i < versionNames.length; i++) {
    // get color as rgb
    const offset = (255 / versionNames.length) * i
    const color = {
        r: 255 - offset,
        g: 0 + offset,
        b: 0
    }

    // convert rgb to hex
    versionColors[versionNames[i]] = rgbToHex(color.r, color.g, color.b)
}

const allDotsElements = []
const allLinesElements = []

function link2Dots(startDotElement, endDotElement, versionName) {
    const svgElement = document.getElementById('svg')

    const startX = startDotElement.getAttribute("cx")
    const startY = startDotElement.getAttribute("cy")

    const endX = endDotElement.getAttribute("cx")
    const endY = endDotElement.getAttribute("cy")

    let newLine = document.createElementNS(SVG_NAMESPACE, "line");

    newLine.setAttribute("x1", startX)
    newLine.setAttribute("y1", startY)
    newLine.setAttribute("x2", endX)
    newLine.setAttribute("y2", endY)
    newLine.setAttribute("stroke", versionColors[versionName])

    svgElement.appendChild(newLine)

    return newLine
}

function addDotFromTestResult(numberOfDices, executionTime, versionName) {

    
    const svgElement = document.getElementById('svg')
    
    let newDot = document.createElementNS(SVG_NAMESPACE, "circle");

    const cropedframeHeight = frame.height - frame.insetOffset
    const cropedframeWidth = frame.width - frame.insetOffset

    const x = (cropedframeWidth / 100 * (executionTime * 100 / resultsMetaData.maxExecutionTime)) + frame.insetOffset / 2
    const y = (cropedframeHeight - (cropedframeHeight / 100 * (numberOfDices * 100 / resultsMetaData.maxNumberOfDices))) + frame.insetOffset / 2

    newDot.setAttribute("cx", x);
    newDot.setAttribute("cy", y);
    newDot.setAttribute("r", "5");
    newDot.setAttribute("fill", versionColors[versionName]);
    newDot.setAttribute("class", `${versionName} dot`)
    newDot.setAttribute("title", `version: ${versionName}, dices: ${numberOfDices}, averageExecutionTime: ${executionTime}`)

    svgElement.appendChild(newDot)

    return newDot
}

function drawVersionPerformances(versionPerfs, versionName) {

    const versionPerfsDots = []
    for (let i = 0; i < versionPerfs.length; i++) {
        const perf = versionPerfs[i]

        const newDotElement = addDotFromTestResult(perf.numberOfDices, perf.averageExecutionTime, versionName)

        // if there is at least 2 dots, link them
        if (versionPerfsDots.length) {
            const lineElement = link2Dots(versionPerfsDots[i - 1], newDotElement, versionName)
            allLinesElements.push(lineElement)
        }

        versionPerfsDots.push(newDotElement)
    }
     
    allDotsElements.push(...versionPerfsDots)
}

function drawGraph() {
    const graph = document.getElementById('graph')
    const svgElement = document.getElementById('svg')

    const graphHeight = graph.clientHeight

    const graphWidth = graph.clientWidth
    svgElement.setAttribute('viewBox', `0 0 ${graphWidth} ${graphHeight}`)
    svgElement.setAttribute('width', graphWidth)
    svgElement.setAttribute('height', graphHeight)

    frame.height = graphHeight
    frame.width = graphWidth

    allDotsElements.forEach((element) => element.remove())
    allDotsElements.length = 0
    allLinesElements.forEach((element) => element.remove())
    allLinesElements.length = 0


    for (const version in performancesByVersion) 
        drawVersionPerformances(performancesByVersion[version], version)
}

function setVersionsLegend() {
    const legends = document.getElementById('versions-legend')

    for(let version of versionNames) {
        const legend = document.createElement("div")
        legend.setAttribute("class", `legend`)

        const versionName = document.createElement("p")
        versionName.textContent = `${version}: `

        const versionColor = document.createElement("div")
        versionColor.setAttribute("style", `background-color: ${versionColors[version]}`)
        versionColor.setAttribute("class", `version-color`)

        legend.appendChild(versionName)
        legend.appendChild(versionColor)

        legends.appendChild(legend)
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // get max values for references
    resultsMetaData.maxNumberOfDices = Math.max(...(results.tests.map((test) => test.numberOfDices)))
    resultsMetaData.maxExecutionTime = Math.ceil(Math.max(...(results.tests.map((test) => Math.max(...(test.results.map((versionResult) => versionResult.averageExecutionTime)))))))

    document.querySelector('.--axe.number-of-dices .axe-range.--max').textContent = resultsMetaData.maxNumberOfDices
    document.querySelector('.--axe.execution-time .axe-range.--max').textContent = `${resultsMetaData.maxExecutionTime}s`

    setVersionsLegend()

    window.onresize = drawGraph
    drawGraph()

})