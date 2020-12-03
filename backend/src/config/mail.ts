interface IMailConfig {
  // driver: 'ethereal' | 'ses';
  driver: 'ethereal';
  defaults: {
    from: {
      mail: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      mail: 'contato@notesflix.com',
      name: 'Ariane Santos Borges',
    },
  },
} as IMailConfig;
