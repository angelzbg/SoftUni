palindromeInteger = (arr = []) => {
    let isPalindrome = (str = '') => {
        let len = str.length;
        for (let i = 0; i < len / 2; i++) {
            if (str[i] !== str[len - 1 - i]) {
                return false;
            }
        }
        return true;
    };

    for (let i = 0; i < arr.length; i++) {
        console.log(isPalindrome(arr[i].toString()));
    }
};
