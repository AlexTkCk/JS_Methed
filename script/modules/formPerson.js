import createElement from "./createElement.js";

const createFormPerson = (n) => {
    const form = createElement('form', {
        className: 'person',
    });

    const title = createElement('h2', {
        className: 'person__title',
        textContent: `Passenger #${n}`,
    });

    const labelName = createElement('label', {
        className: 'field__label',
        textContent: 'Full name',
        for: `name${n}`,
    });

    const inputName = createElement('input', {
        className: 'field__input',
        textContent: `Passenger #${n}`,
        id: `name${n}`,
        name: 'name',
        type: 'text',
        placeholder: 'Input your full name',
        required: true,
    });

    const fieldName = createElement('div', {
        className: 'field',
    });

    fieldName.append(labelName, inputName);

    const button = createElement('button', {
        className: 'btn-confirm',
        type: 'submit',
        textContent: 'Accept',
    });


    const fieldTicket = createElement('div', {
        className: 'field',
    })

    const labelTicket = createElement('label', {
        className: 'field__label',
        textContent: 'Ticket number (10 digits)',
        for: `ticket${n-1}`,
    })

    const inputTicket = createElement('input', {
        className: 'field__input',
        id: `ticket${n-1}`,
        name: 'ticket',
        type: 'text',
        placeholder: 'Ticket number',
        required: true,
        minlength: 10,
        maxlength: 10,
    })

    fieldTicket.append(labelTicket, inputTicket)

    form.append(title, fieldName, fieldTicket, button);

    return form;
}

const getFormPerson = (count) => {
    const forms = [];
    if (count > 6) count = 6;
    for (let i = 0; i < count; i++){
        forms.push(createFormPerson(i+1));
    }

    return forms;
};

export default getFormPerson;