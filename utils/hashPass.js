import bcrypt from "bcrypt";
function hashPassword(mongoSchema){
    mongoSchema.pre("save",async function(){
        if(!this.isModified("password"))
            return;
        this.password = await bcrypt.hash(this.password,10);
    })
}

export default hashPassword