import { createConnection, getConnectionOptions } from 'typeorm';
// performs connection
interface IOptions {
  host: string;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'rentx_postgres'; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  createConnection({
    ...options,
  });
});
