taskTwo = (text = '') => {
    const matches = (text.match(/([=\/])([A-Z][A-Za-z]{2,})\1/g) || []).map((x) => x.substring(1, x.length - 1));
    const points = (matches || []).reduce((sum, el) => sum + el.length, 0);
    console.log(`Destinations: ${matches.join(', ')}`.trim());
    console.log(`Travel Points: ${points}`);
};

taskTwo('=Hawai=/Cyprus/=Invalid/invalid==i5valid=/I5valid/=i=');
