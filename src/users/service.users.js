import { UserDAO } from "../dao/factory.js";
import { addCart } from "../carts/service.carts.js";
import { createHash } from "../utils/passwordEncryptor.utils.js";
import clientUserDTO from "../DTOs/clientUser.DTO.js";

const um = UserDAO;

export const registerUser = async (newUserInfo) => {
    const { first_name, last_name, age, email, password } = newUserInfo;

    try {
        const user = await findUserByEmail(email);
        if(Object.keys(user).length !== 0) return {status: 'failed', message: 'Ya existe un usuario regitrado con el mismo email'};
        
        
        const newUserCart = await addCart();

        const newUserData = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            cart: newUserCart.payload._id
        };
                
        const response = await um.registerUser(newUserData);
        const newUser = new clientUserDTO(response);
        
        return {status: 'success', message: 'Usuario registrado exitosamente', payload: newUser};
    } catch(error) {
        throw error;
    }
};

export const findUserByEmail = async (emailRef) => {
    try {
        const user = await um.findUserByEmail(emailRef);
        return user;
    } catch(error) {
        throw error;
    }
};

export const findUserById = async (idRef) => {
    try {
        const user = await um.findUserById(idRef);
        return user;
    } catch(error) {
        throw error;
    }
};