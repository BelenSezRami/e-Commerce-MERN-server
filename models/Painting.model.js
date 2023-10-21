const { Schema, model } = require("mongoose");

const paintingSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El título es obligatorio'],
            trim: true
        },
        image: {
            type: String,
            default: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png',
            required: [false]
        },
        height: {
            type: Number,
            required: [true, 'La altura es obligatoria']
        },
        width: {
            type: Number,
            required: [true, 'El ancho es obligatorio']
        },
        techniques: {
            type: [String],
            required: [true, 'Al menos una técnica es obligatoria'],
            enum: [
                'Acuarela',
                'Arena',
                'Barniz',
                'Carboncillo',
                'Espátula',
                'Óleo sobre lienzo',
                'Pan de oro',
                'Pigmento en polvo',
                'Serrín',
                'Témpera',
                'Tinta',
                'Yeso'
            ]
        },
        description: {
            type: String,
        },
        year: {
            type: Number,
            required: [true, 'El año de creación es obligatorio']
        },
        price: {
            type: Number,
            required: [true, 'El precio es obligatorio']
        },
        sold: {
            type: Boolean,
            default: false,
            required: [true, 'Por favor, indique si el cuadro está vendido o no']
        }
    },
    {
        timestamps: true
    }
);

const Painting = model("Painting", paintingSchema);

module.exports = Painting;
