import { Schema, model } from "mongoose"

const newsSchema = new Schema({
    titulo: { 
        type: String, 
        required: true 
    },
    data: { 
        type: String, 
        required: true 
    },
    link: { 
        type: String, 
        required: true 
    },
    imagem: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    }
})

const schemaNews = model("news", newsSchema)

export default schemaNews