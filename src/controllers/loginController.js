const expression = {
  loginEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  loginPassword: /^.{12,32}$/,
};

const logValidation = (field, isValid, rule) => {
  const message = `[Login] ${field}: ${isValid ? 'válido' : 'inválido'} (${rule}).`;

  if (isValid) {
    console.info(message);
  } else {
    console.warn(message);
  }
};

export const validateForm = ({ loginEmail, loginPassword }) => {
  const isEmailValid =
    typeof loginEmail === 'string' && expression.loginEmail.test(loginEmail);
  const isPasswordValid =
    typeof loginPassword === 'string' && expression.loginPassword.test(loginPassword);

  const errors = {};

  if (!isEmailValid) {
    errors.loginEmail = 'Ingresa un correo electrónico válido.';
  }
  if (!isPasswordValid) {
    errors.loginPassword = 'La contraseña debe tener entre 12 y 32 caracteres.';
  }

  const isFormValid = isEmailValid && isPasswordValid;

  logValidation('Correo', isEmailValid, 'formato de correo');
  logValidation('Contraseña', isPasswordValid, 'entre 12 y 32 caracteres');
  logValidation('Formulario', isFormValid, 'todas las validaciones');

  return { isValid: isFormValid, errors };
};
