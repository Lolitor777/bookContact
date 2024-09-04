import { DataTypes } from "sequelize";
import db from "../database/db.js";
import Contact from "./Contact.js";
import User from "./User.js";

const UserContact = db.define('tb_user_contact', {
    user_contact_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: "user_id"
        }
    },
    contact_id: {
        type: DataTypes.INTEGER,
        references:{
            model: Contact,
            key: "contact_id"
        }
    },
})

export default UserContact;