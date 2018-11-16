import { toast } from 'react-toastify';

export default class Check {

    static isString = (data, minLength) => {
        if(typeof data === 'string' || data instanceof String) {
            if (!/[^a-zA-Z]/.test(data)) {
                if(data.length >= minLength) {
                    return true
                }
    
                return false
            }

            return false
        }

        return false
    }

    static isPhoneNumber = (data) => {
        let regex = /^\d{10}$/

        if(data.match(regex)) {
            return true
        }

        return false
    }

    static isDate = (data) => {
        let regex = /^\d{2}-\d{2}-\d{4}$/
        
        if(data.match(regex)) {
            return true
        }

        return false
    }

    static checkType = (data) => {
        let pets = ['bird', 'cat','dog', 'hamster', 'lizard', 'snake']

        if(pets.includes(data)) return true
        else return false
    }

    static checkLength = (data, minLength) => {
        return data.length >= minLength
    }

    static errorMessage = (message) => {
        toast.error(`⚠️ ${message}`, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
 

}

