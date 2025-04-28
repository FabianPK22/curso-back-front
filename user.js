require('dotenv').config();
const mongoose = require('mongoose');

// 1) Conexión a MongoDB (puedes extraerlo luego a otro archivo si quieres)
const password = process.env.DB_PASSWORD;
const url = `mongodb+srv://fperez:${encodeURIComponent(password)}@cluster0.q7vmyl0.mongodb.net/userApp?retryWrites=true&w=majority`;
mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch(err => console.log('error connecting to MongoDB:', err.message));

// 2) Definición del schema
const userSchema = new mongoose.Schema({
  name:     String,
  email:    String,
  password: String,
  isActive: Boolean,
});

// (Opcional) transforma _id → id y quita __v
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

// 3) Exporta el modelo
module.exports = mongoose.model('User', userSchema);
