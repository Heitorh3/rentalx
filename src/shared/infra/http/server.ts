import { app } from './app';

app.listen(process.env.PORT || 3333, () => {
  console.info(
    `⚡️ Server listening on http://localhost:${process.env.PORT || 3333}`,
  );
});
