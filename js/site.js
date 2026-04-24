document.addEventListener("DOMContentLoaded", () => {
    const yearElements = document.querySelectorAll("[data-current-year]");
    const currentYear = new Date().getFullYear();

    yearElements.forEach((element) => {
        element.textContent = String(currentYear);
    });

    const copyButtons = Array.from(document.querySelectorAll("[data-copy]"));

    const fallbackCopy = (text) => {
        const helper = document.createElement("textarea");
        helper.value = text;
        helper.setAttribute("readonly", "");
        helper.style.position = "absolute";
        helper.style.left = "-9999px";
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        document.body.removeChild(helper);
    };

    copyButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            const text = button.dataset.copy || "";
            const feedbackId = button.dataset.copyFeedback || "";
            const feedback = feedbackId ? document.getElementById(feedbackId) : null;

            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(text);
                } else {
                    fallbackCopy(text);
                }

                if (feedback) {
                    feedback.textContent = "Email copied.";
                }
            } catch (error) {
                if (feedback) {
                    feedback.textContent = "Copy did not work automatically.";
                }
            }
        });
    });
});
