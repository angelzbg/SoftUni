solve = () => {
    document.getElementById('send').addEventListener('click', () => {
        const input = document.getElementById('chat_input');

        document
            .getElementById('chat_messages')
            .insertAdjacentHTML('beforeend', '<div class="message my-message">' + input.value + '</div>');

        input.value = '';
    });
};
