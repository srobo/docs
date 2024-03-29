(function() {
    var data = { };
    var globalRadioName = 0;

    function init() {
        globalRadioName = 0;

        var resetBtnAtTop = document.getElementById("reset-btn-at-top");
        resetBtnAtTop.style.display = "none";

        var troubleshooter = document.getElementById("troubleshooter");
        troubleshooter.innerHTML = "";

        if (window.location.hash != "") {
            resetBtnAtTop.style.display = "inline-block";
        }

        var id = window.location.hash.substr(1); // substr to remove # on fragment
        appendQuestionById(troubleshooter, id);
    }

    function ensureNoTrailingSlash(text) {
        var penultimate_index = text.length - 1;
        if (text.substr(penultimate_index) == '/') {
            text = text.substr(0, penultimate_index);
        }
        return text;
    }

    function fixLinks(text) {
        var root = ensureNoTrailingSlash(ROOT_URL);
        return text.replace(/ROOT_URL/g, root);
    }

    function answerClicked(radioBtn, parent, answer) {
        parent.innerHTML = "";

        if ("message" in answer) {
            var newMessage = document.createElement('p');
            newMessage.className = "message";
            newMessage.innerHTML = fixLinks(answer.message);
            parent.appendChild(newMessage);
        }

        if ("ask_if_fixed" in answer) {
            var question = data.ask_if_fixed_question;
            question.answers[1].next_question = answer.next_question;
            appendQuestion(parent, question);
            return;
        }

        if (!("next_question" in answer)) {
            var newMessage = document.createElement("p");
            newMessage.className = "message";
            newMessage.textContent = "Thank you for using the SR Troubleshooter.";
            parent.appendChild(newMessage);

            var resetBtnAtTop = document.getElementById("reset-btn-at-top");
            resetBtnAtTop.style.display = "inline-block";

            return;
        }

        appendQuestionById(parent, answer.next_question);
    }

    function appendQuestionById(parent, id) {
        var question = data.questions[id];
        appendQuestion(parent, question);

        if (id != '') {
            parent.id = id;
            window.location.hash = "#" + id;
        }
    }

    function appendQuestion(parent, question) {
        var newQuestionCont = document.createElement("div");

        var newQuestionDiv = document.createElement("div");
        newQuestionDiv.className = "question";

        var questionParagraph = document.createElement("p");
        questionParagraph.innerHTML = fixLinks(question.question);
        newQuestionDiv.appendChild(questionParagraph);

        var questionForm = document.createElement("form");
        newQuestionDiv.appendChild(questionForm);

        globalRadioName++;

        for (var i = 0; i < question.answers.length; i++) {
            (function(answer) {
                var answerLabel = document.createElement("label");

                var answerRadioBtn = document.createElement("input");
                answerRadioBtn.type = "radio";
                answerRadioBtn.name = globalRadioName;
                answerRadioBtn.onclick = function() {
                    answerClicked(answerRadioBtn, newQuestionCont, answer);
                };

                var answerSpan = document.createElement("span");
                answerSpan.textContent = fixLinks(answer.answer);

                answerLabel.appendChild(answerRadioBtn);
                answerLabel.appendChild(answerSpan);
                questionForm.appendChild(answerLabel);
            }(question.answers[i]))
        }

        parent.appendChild(newQuestionDiv);
        parent.appendChild(newQuestionCont);
    }

    jQuery.getJSON(TroubleshooterDataURL)
    .done(function(json) {
        data = json;
        init();
    })
    .fail(function(xhr, textStatus, error) {
        var networkError = document.getElementById("troubleshooter_network_error");
        networkError.style.display = "block";
    });
}());
