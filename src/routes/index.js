import userRoute from './userRoute';
import  express from 'express';
const router = express.Router();
router.use('/use', userRoute);
export default router;