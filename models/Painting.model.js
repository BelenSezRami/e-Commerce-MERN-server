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
            required: [true, 'La imagen es obligatoria']
        },
        heigh: {
            type: Number,
            required: [true, 'La altura es obligatoria']
        },
        width: {
            type: Number,
            required: [true, 'El ancho es obligatorio']
        },
        technique: {
            type: String,
            required: [true, 'La técnica es obligatoria']
        },
        description: {
            type: String,
        },
        year: {
            type: Date,
            required: [true, 'El año de creación es obligatorio']
        },
        price: {
            type: Number,
            required: [true, 'El precio es obligatorio']
        },
        sold: {
            type: Boolean,
            default: false,
            required: [true, 'Debe indicar si el cuadro está vendido o no']
        }
    },
    {
        timestamps: true
    }
);

const Painting = model("Painting", paintingSchema);

module.exports = Painting;
