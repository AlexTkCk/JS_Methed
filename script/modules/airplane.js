import createElement from "./createElement.js";

const createCockpit = (titleText) => {

    const cockpit = createElement('div', {
        className: 'cockpit',
    });

    const title = createElement('h1', {
        className: 'cockpit-title',
        textContent: titleText,
    });

    const button = createElement('button', {
        className: 'cockpit-confirm',
        type: 'submit',
        textContent: 'Accept',
    })

    cockpit.append(title, button);

    return cockpit;
};

const createExit = () => {
  const fuselage = createElement('div', {
      className: 'fuselage exit',
  });

  return fuselage;
};

const createSeatBlock = (n, count) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    const fuselage = createElement('ol', {
        className: 'fuselage',
    });

    for (let i = n; i < count + n; i++){
        const rowWrapper = createElement('li');

        const seats = createElement('ol', {
            className: 'seats',
        });

        const seatsRow = letters.map(letter => {
            const seat = createElement('li', {
                className: 'seat',
            });

            const checkWrapper = createElement('label');

            const check = createElement('input', {
                name: 'seat',
                type: 'checkbox',
                value: `${"" + i + letter}`,
            });

            checkWrapper.append(check);
            seat.append(checkWrapper)
            return seat;
        });

        seats.append(...seatsRow);
        rowWrapper.append(seats);
        fuselage.append(rowWrapper);
    }

    return fuselage;
}

const createAirplane = (title, tourData) => {

  const scheme = tourData.scheme;

  const choisesSeat = createElement('form', {
      className: 'choises-seat',
  });

  const plane = createElement('fieldset', {
      className: 'plane',
      name: 'plane',
  });

  const cockpit = createCockpit(title);

  let n = 1;

  const elements = scheme.map((type) => {
      if (type === 'exit'){
          return createExit();
      }

      if (typeof type === 'number'){
        const seatBlock = createSeatBlock(n, type);
        n = n + type;
        return seatBlock;
      }
  })

  plane.append(cockpit, ...elements);
  choisesSeat.append(plane);

  return choisesSeat;
}

const checkSeat = (form, data, main) => {

    form.addEventListener('change', () => {
        const formData = new FormData(form);
        const checked = [...formData].map(([, value]) => value);

        if (checked.length === data.length){
            [...form].forEach(item => {
                if (item.checked === false && item.name === 'seat'){
                    item.disabled = true;
                }
            })
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const booking = [...formData].map(([, value]) => value);

        for(let i = 0; i < data.length; i++){
            data[i].seat = booking[i];
        }

        form.remove()

        const thanks = createElement('h2', {
            className: 'title',
            innerHTML: 'Thanks for your choice!<br/>Your seats ' + `${booking}`,
        })

        main.append(thanks)
    });
}

const airplane = (main, data, tourData) => {
    const title = `Choose ${data.length} ${data.length === 1 ? 'seat' : 'seats'}`;

    const choiceForm = createAirplane(title, tourData);
    checkSeat(choiceForm, data, main);



    main.append(choiceForm)
}

export default airplane;