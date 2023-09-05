function getContent(comment) {
    const content = []

    if (comment.paragraph) {
        content.push({
            type: "paragraph",
            content: [{ type: "text", text: comment.paragraph }],
        })
    }

    function filterList(list) {
        return list.filter(
            item => typeof item === "string" 
                && item.trim().length > 0
        )
    }

    function createListItem(filteredList) {
        return filteredList.map((item) => ({
            type: "listItem",
            content: [
                {
                    type: "paragraph",
                    content: [{ type: "text", text: item.trim() }],
                },
            ],
        }))
    }

    if (comment.list) {
        content.push({
            type: "bulletList",
            content: createListItem(filterList(comment.list))
        })
    }

    if (content.length == 0) {
        throw new Error("Worklog content is empty")
    } else {
        return content
    }
}

module.exports = getContent
