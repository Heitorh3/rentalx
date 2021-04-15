import { container } from 'tsyringe';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';
import MailtrapMailProvider from './implementations/MailtrapMailProvider';
import IMailTemplateProvider from './IParseMailTemplateDTO';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
  mailTrap: MailtrapMailProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
