import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Contact = db.define('tb_contact', {
    contact_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
    },
    phone_number: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.INTEGER,
        defaultValue: 1 
    }
});

export default Contact;