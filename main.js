
document.addEventListener("DOMContentLoaded", function () {
    function showMessage(id, message, isError = false) {
        const element = document.getElementById(id);
        if (!element) return;

        element.textContent = message;
        element.className = isError
            ? "mt-3 text-danger"
            : "mt-3 text-success";
    }

    const basic = document.getElementById("basicContact");

    if (basic) {
        basic.addEventListener("submit", function (event) {
            event.preventDefault();
            showMessage("basicStatus", "Form submitted successfully!");
        });
    }

    const htmlForm = document.getElementById("htmlValidationForm");

    if (htmlForm) {
        htmlForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (htmlForm.checkValidity()) {
                showMessage("validationStatus", "All fields are valid!");
            } else {
                htmlForm.reportValidity();
            }
        });
    }

    const bootstrapForm = document.getElementById("bootstrapContact");

    if (bootstrapForm) {
        bootstrapForm.addEventListener("submit", function (event) {
            event.preventDefault();
            showMessage("bootstrapStatus", "Form submitted successfully!");
        });
    }

    const styledForm = document.getElementById("styledValidation");

    if (styledForm) {
        styledForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const fields = styledForm.querySelectorAll("input, textarea");
            let valid = true;

            fields.forEach(function (field) {
                if (field.checkValidity()) {
                    field.classList.add("is-valid");
                    field.classList.remove("is-invalid");
                } else {
                    field.classList.add("is-invalid");
                    field.classList.remove("is-valid");
                    valid = false;
                }
            });

            showMessage(
                "styledStatus",
                valid ? "All fields are valid!" : "Please correct the highlighted fields.",
                !valid
            );
        });

        styledForm.addEventListener("reset", function () {
            setTimeout(function () {
                styledForm.querySelectorAll(".is-valid, .is-invalid")
                    .forEach(field => field.classList.remove("is-valid", "is-invalid"));
                showMessage("styledStatus", "");
            }, 0);
        });
    }

    const registration = document.getElementById("registrationForm");

    if (registration) {
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");

        function checkPasswords() {
            confirmPassword.setCustomValidity(
                confirmPassword.value === password.value
                    ? ""
                    : "Passwords do not match"
            );
        }

        password.addEventListener("input", checkPasswords);
        confirmPassword.addEventListener("input", checkPasswords);

        registration.addEventListener("submit", function (event) {
            event.preventDefault();
            checkPasswords();

            const fields = registration.querySelectorAll(
                "input[required], select[required]"
            );

            let valid = true;

            fields.forEach(function (field) {
                if (field.type === "radio") {
                    return;
                }

                if (field.checkValidity()) {
                    field.classList.add("is-valid");
                    field.classList.remove("is-invalid");
                } else {
                    field.classList.add("is-invalid");
                    field.classList.remove("is-valid");
                    valid = false;
                }
            });

            const genderSelected = registration.querySelector(
                'input[name="gender"]:checked'
            );

            if (!genderSelected) {
                valid = false;
            }

            showMessage(
                "registrationStatus",
                valid
                    ? "Registration form is valid! (Demo only)"
                    : "Please check the required fields and passwords.",
                !valid
            );
        });

        registration.addEventListener("reset", function () {
            setTimeout(function () {
                registration.querySelectorAll(".is-valid, .is-invalid")
                    .forEach(field => field.classList.remove("is-valid", "is-invalid"));
                confirmPassword.setCustomValidity("");
                showMessage("registrationStatus", "");
            }, 0);
        });
    }
});
