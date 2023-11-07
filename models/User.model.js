const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
    },
    lastName: {
      type: String,
      required: [true, 'El apellido es obligatorio']
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria.'],
      minlength: [5, 'La contraseña tiene que tener al menos 5 caracteres.'],
    },
    avatar: {
      type: String,
      required: [false],
      default: 'https://cdn.icon-icons.com/icons2/3066/PNG/512/user_person_profile_avatar_icon_190943.png'
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    favoritePaintings: [
      {
        ref: 'Painting',
        type: Schema.Types.ObjectId
      }
    ]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
