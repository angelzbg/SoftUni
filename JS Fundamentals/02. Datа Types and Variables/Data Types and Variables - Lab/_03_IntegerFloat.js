integerAndFloat = (n1, n2, n3) => {
    console.log( (sum = n1 + n2 + n3) + (sum % 1 === 0 ? ' - Integer' : ' - Float'));
}