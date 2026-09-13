document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#contact-form");
    const status = document.querySelector("#contact-form-status");
    const submitButton = form?.querySelector("button[type='submit']");
    if (!form || !status || !submitButton) return;

    const isLocalPreview = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const apiUrl = isLocalPreview && window.location.port !== "3000"
        ? "http://localhost:3000/api/contact"
        : "/api/contact";

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const payload = Object.fromEntries(new FormData(form).entries());
        status.textContent = "Sending secure transmission...";
        status.className = "form-status";
        submitButton.disabled = true;
        try {
            const response = await fetch(apiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            const responseText = await response.text();
            let result = {};

            try {
                result = responseText ? JSON.parse(responseText) : {};
            } catch {
                throw new Error("The server returned an invalid response. Start the backend with npm start and try again.");
            }

            if (!response.ok) throw new Error(result.error || "Unable to send your message.");
            status.textContent = result.message;
            status.className = "form-status success";
            form.reset();
        } catch (error) {
            status.textContent = error.message || "Unable to send your message. Please try again.";
            status.className = "form-status error";
        } finally { submitButton.disabled = false; }
    });
});
