import jwt from 'jsonwebtoken';
import User from '../model/user';
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            message: 'Please authenticate',
            status: 'failed'
        });
    }
}
export default auth;