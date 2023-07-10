require("dotenv").config();
const JiraApi = require("jira-client");

const jira = new JiraApi({
    protocol: "https",
    host: process.env.JIRA_URL.replace("https://", ""),
    username: process.env.JIRA_EMAIL,
    password: process.env.JIRA_API_TOKEN,
    apiVersion: "2",
});

/**
 * Obtain all issues in a sprint
 * @param {*} sprintId
 * @returns Promise<JiraApi.JsonResponse>
 */
async function getIssuesInSprint(sprintId) {
    try {
        console.log(`Getting issues in sprint ${sprintId}`);
        const issues = await jira.searchJira(
            `project = "UNI" AND Sprint='${sprintId}' ORDER BY Rank ASC`
        );
        console.log(`Found ${issues.total} issues in sprint ${sprintId}`);
        return issues;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Generate a url to issue in Jira
 * @param {*} issueKey
 * @returns string
 */
function getIssueUrl(issueKey) {
    return `${process.env.JIRA_URL}/browse/${issueKey}`;
}

/**
 * Save in a CSV file the urls to all issues in a sprint
 * @param {*} issuesGenerator
 * @returns void
 */
async function saveIssuesUrls(issuesGenerator) {
    const csv = require("csv-writer").createObjectCsvWriter({
        path: process.env.CSV_OUTPUT_NAME || "issues.csv",
        header: [{ id: "url", title: "Url" }],
    });

    try {
        const records = Array.from(issuesGenerator).map((issue) => ({
            url: issue.url,
        }));
        await csv.writeRecords(records);
        console.log("...Done");
    } catch (error) {
        console.error(error);
    }
}

/**
 * Function to validate arguments
 * @param {*} args
 * @returns boolean
 * @throws Error
 */
function validateArgs(args) {
    const sprintId = process.argv[2];
    if (!sprintId) {
        console.error("ERROR: Sprint id is required");
        throw new Error("Sprint id is required");
    }
    return {
        sprintId,
    };
}

// Execute this script with:
// node src/getSprintTickets.js
(async () => {
    const { sprintId } = validateArgs(process.argv);
    // Get all issues in sprint and implement a generator to iterate over them
    // generate a url to issue in Jira
    const issues = await getIssuesInSprint(sprintId);
    const issuesGenerator = (function* () {
        for (const issue of issues.issues)
            yield {
                key: issue.key,
                url: getIssueUrl(issue.key),
            };
    })();
    // Save the urls to all issues in a CSV file
    saveIssuesUrls(issuesGenerator);
})();
