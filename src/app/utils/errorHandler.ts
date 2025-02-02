export const mapErrorMessage = (message: string | undefined): string => {
    switch (message) {
      case 'The password field must be at least 8 characters.':
        return 'A senha deve ter pelo menos 8 caracteres.';
      case 'The email field is required.':
        return 'O campo de e-mail é obrigatório.';
      case 'The email has already been taken.':
        return 'O e-mail já está em uso.';
      default:
        return 'Ocorreu um erro. Por favor, tente novamente.';
    }
  };