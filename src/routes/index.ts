import { Router } from 'express'
import { categoriesRoutes } from './Categories.routes';

const router = Router();

router.use("/categories", categoriesRoutes);

export { router }
