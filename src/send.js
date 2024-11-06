async function send(content) {
    const main = document.querySelector("#main")
	const textarea = main.querySelector(`div[contenteditable="true"]`)
    if (!textarea) {
        throw new Error("Open a WhatsApp Web chat to send")
    }
    const length = content.length
    if (length <= 0) {
        throw new Error("No content to send")
    }

    for(const line of content) {
        console.log(line)
        textarea.focus()
        document.execCommand('insertText', false, line)
        textarea.dispatchEvent(new Event('change', {bubbles: true}))

        setTimeout(() => {
            main.querySelector('[data-icon="send"]').click()
        }, 100);

        if (content.indexOf(line) !== length - 1) {
            await new Promise(resolve => setTimeout(resolve, 250))
        }
    }
    return content.length;
}