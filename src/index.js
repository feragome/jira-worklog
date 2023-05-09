require("dotenv").config()
const fs = require("fs")
const parse = require("csv-parser")
const fecha = require("fecha")
const createWorklog = require("./createWorklog")

const csvFilePath = process.env.WORKLOG_PATH
let rowId = 1

if (!fs.existsSync(csvFilePath)) {
    console.error("CSV file path doesn't exists: " + csvFilePath)
    process.exit(1)
}

fs.createReadStream(csvFilePath)
    .pipe(parse())
    .on("data", async (data) => {
        const comment = {
            list: null,
            paragraph: null,
        }

        // Convert string to array of items
        // Remove empty items by filtering them
        const items = data.comment.split(";").filter((item) => item.length > 0)

        // Now a worklog can only have a bullet list or a single paragraph
        // TODO: Define a structure to have both: bullet list and paragraph
        if (items.length < 1) {
            throw new Error("Worklog must have at least 1 item")
        } else if (items.length == 1) {
            comment.paragraph = items.pop()
        } else {
            comment.list = items
        }

        const worklog = {
            rowId,
            issueKey: data.issueKey.toUpperCase(),
            started: fecha.format(
                new Date(data.date),
                "YYYY-MM-DDTHH:mm:ss.SSSZZ"
            ),
            timeSpentSeconds: data.timeSpentHours * 3600,
            comment,
        }

        rowId += 1
        await createWorklog(worklog)
    })
    .on("end", () => {
        console.log("CSV file successfully processed")
    })
    .on("error", (error) => {
        console.error("ERROR -> " + error.message)
    })
