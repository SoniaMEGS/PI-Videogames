function validations({ name, image, description, released, rating }) {
  const errors = {};
  const regexText = /^[A-Z].*$/;
  const regexImage =
    /^https?:\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w-_.]+)*\/[^\/]+\.(?:jpg|jpeg|png|gif)(?:\?.*)?$/i;
  const regexReleased =
    /^(19[5-9]\d|20\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
  const regexRating = /^(?:[0-4](?:\.\d{2})?|5)$/;
  if (!regexText.test(name)) {
    errors.name = "Debe iniciar con mayuscula.";
  }
  //--
  if (!regexImage.test(image)) {
    errors.image = "Debe ser el link de una imagen";
  }
  //--
  if (!regexText.test(description)) {
    errors.description = "Debe iniciar con mayuscula.";
  }
  if (description.length < 50) {
    errors.description = "Debe tener almenos 50 caracteres.";
  }
  //--
  if (!regexReleased.test(released)) {
    errors.released = "Debe ser una fecha en el ordern año, mes, dia.";
  }
  //--
  if (!regexRating.test(rating)) {
    errors.rating =
      "El primer dígito puede ser cualquier número del 0 al 5 y si hay decimales, deben ser dos.";
  }
  return errors;
}

export default validations;
