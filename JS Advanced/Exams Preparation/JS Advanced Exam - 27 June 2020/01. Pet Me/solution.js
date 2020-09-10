solve = () => {
    const createElements = (...types) => types.map((type) => document.createElement(type));

    const append = (child, parent) => {
        parent.appendChild(child);
        return (nextChild, nextParent) => append(nextChild, nextParent || parent);
    };

    const [adoptionUL, adoptedUL, nameInput, ageInput, kindInput, ownerInput] = [
        ...document.querySelectorAll('ul'),
        ...document.querySelectorAll('#container input'),
    ];

    const [state, setState] = [
        { pets: [] },
        (newState) => {
            Object.assign(state, newState);
            Object.keys(newState).forEach(render);
        },
    ];

    function render(property) {
        ({
            pets: () => {
                [adoptionUL.innerHTML, adoptedUL.innerHTML] = ['', ''];
                state.pets.forEach(generateItem);
            },
        }[property]());
    }

    function generateItem(pet, index) {
        const [li, p, span, button] = createElements('li', 'p', 'span', 'button');
        p.innerHTML = `<strong>${pet.name}</strong> is a <strong>${pet.age}</strong> year old <strong>${pet.kind}</strong>`;
        span.textContent = `${pet.adopted ? 'New Owner' : 'Owner'}: ${pet.owner}`;
        append(p, li)(span)(li, pet.adopted ? adoptedUL : adoptionUL);
        button.textContent = !pet.adopted ? (pet.adopting ? 'Yes! I take it!' : 'Contact with owner') : 'Checked';
        if (!pet.adopted) {
            if (pet.adopting) {
                const [div, input] = createElements('div', 'input');
                input.placeholder = 'Enter your names';
                append(div, li)(input, div)(button);
                button.addEventListener('click', () => {
                    if (input.value) {
                        [pet.owner, pet.adopted] = [input.value, true];
                        setState({ pets: state.pets });
                    }
                });
            } else {
                append(button, li);
                button.addEventListener('click', () => {
                    pet.adopting = true;
                    setState({ pets: state.pets });
                });
            }
        } else {
            append(button, li);
            button.addEventListener('click', () => {
                state.pets.splice(index, 1);
                setState({ pets: state.pets });
            });
        }
    }

    document.getElementById('add').addEventListener('submit', (event) => {
        event.preventDefault();
        const [name, age, kind, owner] = [nameInput, ageInput, kindInput, ownerInput].map((el) => el.value);
        if (![name, age, kind, owner].filter((value) => !value).length && !isNaN(age)) {
            [nameInput.value, ageInput.value, kindInput.value, ownerInput.value] = ['', '', '', ''];
            setState({ pets: state.pets.concat({ name, age, kind, owner }) });
        }
    });
};
