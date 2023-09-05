const getContent = require('./getContent')
const doRequest = require('./doRequest')

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
