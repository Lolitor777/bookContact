import { DataTypes } from "sequelize";
import db from "../database/db.js";
import User from './User.js'

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
    is_active: {
        type: DataTypes.TINYINT,
        defaultValue: 1 
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        }
    }
});

export default Contact;