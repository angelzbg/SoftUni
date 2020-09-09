encodeAndDecodeMessages = () => {
    const textAreaEncode = document.querySelectorAll('textarea')[0];
    const textAreaDecode = document.querySelectorAll('textarea')[1];

    const ascii = (char = '', val = 0) => String.fromCharCode(char.charCodeAt() + val);
    const transf = (text = [], val = 0) => text.map((ch) => ascii(ch, val)).join('');

    document.querySelectorAll('button')[0].addEventListener('click', () => {
        [textAreaDecode.value, textAreaEncode.value] = [transf(textAreaEncode.value.split(''), 1), ''];
    });
    document.querySelectorAll('button')[1].addEventListener('click', () => {
        textAreaDecode.value = transf(textAreaDecode.value.split(''), -1);
    });
};
