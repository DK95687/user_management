
async function submitAuthForm(formId, messageId, buttonId, endpoint) {
    const form = document.getElementById(formId);

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const message = document.getElementById(messageId);
        const button = document.getElementById(buttonId);

        const data = Object.fromEntries(new FormData(form).entries());

        message.textContent = "";
        message.className = "message";
        button.disabled = true;

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    result.detail ||
                    "Request failed. Please try again."
                );
            }

            message.textContent = result.message;
            message.classList.add("success");

            form.reset();

        } catch (error) {
            message.textContent =
                error.message === "Failed to fetch"
                    ? "Server connection failed. Please try again."
                    : error.message;

            message.classList.add("error");
        } finally {
            button.disabled = false;
        }
    });
}

submitAuthForm(
    "registerForm",
    "registerMessage",
    "registerButton",
    "/api/auth/register"
);

submitAuthForm(
    "loginForm",
    "loginMessage",
    "loginButton",
    "/api/auth/login"
);
