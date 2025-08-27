import{ZodError} from 'zod';

export const validation = (schema) => (req,res,next) =>{
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (err) {
        
  
            return res.status(400).json({
              error: err.issues.map((e) => e.message).join(', '),
            });
        }   
};