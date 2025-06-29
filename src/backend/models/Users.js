import { Schema, model } from "mongoose"

const usersSchema = new Schema({
    nome: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    senha: { 
        type: String, 
        required: true 
    }
})

const schemaUsers = model("usuarios", usersSchema)

export default schemaUsers