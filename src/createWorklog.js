const axios = require("axios")

const jiraHost = process.env.JIRA_URL
const apiToken = process.env.JIRA_API_TOKEN
const accountId = process.env.JIRA_EMAIL

const headers = {
    Authorization: `Basic ${Buffer.from(accountId + ":" + apiToken).toString(
        "base64"
    )}`,
    "Content-Type": "application/json",
}

async function doRequest({ rowId, issueKey, worklogData }) {
    try {
        console.debug(JSON.stringify(worklogData))
        const response = await axios.post(
            `${jiraHost}/rest/api/3/issue/${issueKey}/worklog`,
            worklogData,
            { headers }
        )
        console.info(
            `${rowId} - OK - Worklog for issue ${issueKey} created with id ${response.data.id}`
        )
    } catch (error) {
        console.error(
            `${rowId} - ERROR - Issue ${issueKey}: ${error.message}
            ${error?.response.data}`
        )
    }
}

function getContent(comment) {
    const content = []

    if (comment.paragraph) {
        content.push({
            type: "paragraph",
            content: [{ type: "text", text: comment.paragraph }],
        })
    }

    if (comment.list) {
        content.push({
            type: "bulletList",
            content: comment.list.map((item) => ({
                type: "listItem",
                content: [
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: item.trim() }],
                    },
                ],
            })),
        })
    }

    if (content.length == 0) {
        throw new Error("Worklog content is empty")
    } else {
        return content
    }
}

async function createWorklog({
    rowId,
    issueKey,
    started,
    timeSpentSeconds,
    comment,
}) {
    const worklogData = {
        comment: {
            type: "doc",
            version: 1,
            content: getContent(comment),
        },
        started,
        timeSpentSeconds,
    }

    await doRequest({ rowId, issueKey, worklogData })
}

module.exports = createWorklog
