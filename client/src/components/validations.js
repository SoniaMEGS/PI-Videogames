function validations({ name, image, description, released, rating }) {
  const errors = {};
  const regexText = /^[A-Z].*$/;
  const regexImage =
    /^https?:\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w-_.]+)*\/[^\/]+\.(?:jpg|jpeg|png|gif)(?:\?.*)?$/i;
  const regexReleased =
    /^(19[5-9]\d|20\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
  const regexRating = /^(?:[0-4](?:\.\d{2})?|5)$/;
  if (!regexText.test(name)) {
    errors.name = "It must start with a capital letter.";
  }
  if (name.length > 15) {
    errors.name = "Must be less than 15 characters";
  }
  //--
  if (!regexImage.test(image)) {
    errors.image = "It must be the link of an image";
  }
  //--
  if (!regexText.test(description)) {
    errors.description = "It must start with a capital letter.";
  }
  if (description.length < 50) {
    errors.description = "Must be at least 50 characters.";
  }
  //--
  if (!regexReleased.test(released)) {
    errors.released =
      "It must be a date in the order year, month, day. And the year must be greater than 1950.";
  }
  //--
  if (!regexRating.test(rating)) {
    errors.rating =
      "The first digit can be any number from 0 to 5 and if there are decimals, there must be two.";
  }
  return errors;
}

export default validations;
