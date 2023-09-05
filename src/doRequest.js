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
            `${rowId} - OK - Worklog for issue ${issueKey}`
            + ` created with id ${response.data.id}`
        )
    } catch (error) {
        console.error(
            `${rowId} - ERROR - Issue ${issueKey}: ${error.message}`
            + ` ${JSON.stringify(error?.response.data)}`
        )
    }
}

module.exports = doRequest
