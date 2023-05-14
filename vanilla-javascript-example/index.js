//const { focusTrap } = require("magicthecat-trapfocus")


function focusTrap(elem, selectors = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') {
    const focusableEls = elem.querySelectorAll(selectors);
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    function handleKeyDown(e) {
        if (e.key !== "Tab") {
            return;
        }

        if (e.shiftKey && document.activeElement === firstFocusableEl) {
            e.preventDefault();
            lastFocusableEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusableEl) {
            e.preventDefault();
            firstFocusableEl.focus();
        }
    }

    firstFocusableEl.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            lastFocusableEl.focus();
        }
    });

    lastFocusableEl.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            firstFocusableEl.focus();
        }
    });

    elem.addEventListener('keydown', handleKeyDown);

    firstFocusableEl.focus();

    return function removeTrap() {
        elem.removeEventListener('keydown', handleKeyDown);
    };
}

const createModalElement = () => {


    const myElement = document.createElement('div');
    myElement.id = 'myElement';

    const background = document.createElement('div');
    background.id = "modalBackground";
    myElement.appendChild(background);




    const removeButton = document.createElement('button');
    removeButton.textContent = 'Close Modal';
    removeButton.addEventListener('click', () => removeChildren('modal-element'));
    myElement.appendChild(removeButton);

    const p = document.createElement('p');
    p.textContent = 'I am a div with id "myElement"';
    myElement.appendChild(p);

    const button1 = document.createElement('button');
    button1.textContent = 'First Button';
    myElement.appendChild(button1);

    const button2 = document.createElement('button');
    button2.textContent = 'Second Button';
    myElement.appendChild(button2);

    const button3 = document.createElement('button');
    button3.textContent = 'Third Button';
    myElement.appendChild(button3);

    const input = document.createElement('input');
    myElement.appendChild(input);



    const modalElement = document.getElementById('modal-element');
    modalElement.appendChild(myElement);


    return document.getElementById('myElement')
}

function removeChildren(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}


function createButton() {
    const createModal = () => {
        focusTrap(createModalElement())
    }
    const button = document.createElement('button');
    button.textContent = 'OpenModal';
    button.addEventListener('click', createModal);
    button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            createModal;
        }
    });

    const modalElement = document.getElementById('modal-button');
    modalElement.appendChild(button);
}
createButton()
