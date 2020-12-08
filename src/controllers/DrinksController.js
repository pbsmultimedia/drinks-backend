const connection = require('../database/connection');
const multer = require("multer");
const path = require("path");

module.exports = {
    async index (request, response) {                            
        // TODO: lazy load
        const drinks = await connection('drinks').select('id', 'name', 'picture');        
        return response.json(drinks);
    },

    async details (request, response) {                                        
        const details = await connection('drinks').select('*').where('id', request.query.id).first();
        return response.json(details);
    },

    async create (request, response) {                                       
        let filename;

        // upload image
        // TODO: validation
        const storage = multer.diskStorage({
            destination: "./public/uploads/",
            filename: function(req, file, cb){                
                filename = Date.now()+path.extname(file.originalname);
                cb(null, filename);
            }
            });
        
        const upload = multer({
            storage: storage,
            limits:{fileSize: 1000000},
        }).single("picture");                

        upload(request, response, (error) => {                        
            const {name, description, price} = request.body;                        

            if (error) {                
                return response.status(500).send({ error });
            } else {                
                connection('drinks').insert({
                    name,
                    description,
                    price,            
                    picture: request.file.filename
                }).then((result)=>{
                    return response.status(200).json({        
                        "id": result[0]
                    }); 
                });         
            }                        
        });              
    },    
}