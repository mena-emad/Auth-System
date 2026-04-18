import Joi from "joi"

const validation = (JoiSchema)=>{
    return (req,res,next)=>{
        const data = {
            ...req.body,
            ...req.params,
            ...req.query
        }
        const {error} = JoiSchema.validate(data,{abortEarly:false});

        if(error){
        const message = error.details.map(err=>err.message).join(", ");
            return res.status(400).json({success:false,message});
        }
        next();
    }
}

export default validation