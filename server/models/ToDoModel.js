const mongoose = require('mongoose');
const { Schema } = mongoose;

const UUID = Schema.Types.UUID;

const elementSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    elements: [{ type: Schema.Types.ObjectId, ref: 'ToDoElement' }]
});

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'ToDoCategory' }]
});

const ToDoElement = mongoose.model('ToDoElement', elementSchema, 'Element');
const ToDoCategory = mongoose.model('ToDoCategory', categorySchema, 'Kategoria');
const ToDoUser = mongoose.model('ToDoUser', userSchema, 'Użytkownik');

module.exports = {
    ToDoElement,
    ToDoCategory,
    ToDoUser
};