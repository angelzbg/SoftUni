const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateHotel = ({ name, city, rooms, imageUrl }) => {
  if (!name || name.length < 4) {
    return 'Hotel name must be at least 4 characters!';
  }

  if (!city || city.length < 3) {
    return 'City name must be at least 3 characters!';
  }

  if (!rooms) {
    return 'Please enter a number of free rooms!';
  }

  try {
    const number = parseInt(rooms);
    if (number < 1 || number > 100) {
      return 'Number of free rooms should be between 1 and 100!';
    }
  } catch (ex) {
    return 'Number of free rooms should be between 1 and 100!';
  }

  if (!imageUrl || !imageUrl.match('^https?')) {
    return 'Image URLs should start with http or https!';
  }
};

module.exports = { validateEmail, validateHotel };
