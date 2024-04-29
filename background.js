chrome.commands.onCommand.addListener(function (command) {
    // chesk command key from manifest file and call specific method.
    if (command === "generate-random-text") {
        generateRandomText();
    } 
});

function generateRandomText() {
    // Inject the random text into the currently focused input field
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: function () {
                function generateRandomEmail() {
                    // Generate and return a random email address
                    return "random@email.com"
                }

                function generateRandomKatakanaLastName() {
                    // Generate and return a random Katakana last name
                    return "サトウ"
                }

                function generateRandomTextValue() {
                    // Generate and return random text
                    return "Generate and return random text"
                }
                function generateRandomValue(inputElement) {
                    var name = inputElement.getAttribute('name');
                    var type = inputElement.getAttribute('type');

                    if (type === "email") {
                        return generateRandomEmail();
                    } else if (name === "katakana_last_name") {
                        return generateRandomKatakanaLastName();
                    } else {
                        return generateRandomTextValue();
                    }
                }

                var focused = document.activeElement;
                if (focused && (focused.tagName === "INPUT" || focused.tagName === "TEXTAREA")) {
                    var randomText = generateRandomValue(focused);
                    focused.value = randomText;

                    // Dispatch input event to trigger Javascript(vue.js) change detection
                    var event = new Event('input', { bubbles: true });
                    focused.dispatchEvent(event);
                }
            },
        });
    });
}




