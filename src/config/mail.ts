interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}
export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'heitorh3@gmail.com', // Aqui vai o email configurado na AWS-SES
      name: 'Heitor Neto',
    },
  },
} as IMailConfig;
