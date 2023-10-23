const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
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
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio']
    },
    image: {
      type: String,
      default: 'https://cdn.icon-icons.com/icons2/3066/PNG/512/user_person_profile_avatar_icon_190943.png',
      required: [false]
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
