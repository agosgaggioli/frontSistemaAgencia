export const validateVehiculo = (inputs) => {
    const errors = {};
    if (!inputs.marca) errors.marca = "*Debe completar el campo"
    const marcaRegex = /^[A-Z][a-z]+(?:[ -][A-Z][a-z]+)*$/;
    if (!marcaRegex.test(inputs.marca)) {
        errors.marca = "*Formato inválido. Ej: 'Volkswagen', 'Alfa Romeo', 'Mercedes-Benz' (sin acentos ni siglas).";
    }

    if (!inputs.modelo) errors.modelo = "*Debe completar el campo"
    if (inputs.modelo.trim().length < 3) {
    errors.modelo = "*El modelo debe tener al menos 3 caracteres";
    }

    if (!inputs.version) errors.version = "*Debe completar el campo"
    if (inputs.version.trim().length < 3) {
    errors.version = "*La version debe tener al menos 3 caracteres";
    }

    if (!inputs.transmision) errors.transmision = "*Debe completar el campo"
    if (inputs.transmision.trim().length < 3) {
    errors.transmision = "*La transmision debe tener al menos 3 caracteres";
    }

    if (!inputs.combustible) errors.combustible = "*Debe completar el campo"
    if (inputs.combustible.trim().length < 3) {
    errors.combustible = "*El combustible debe tener al menos 3 caracteres";
    }
    if (!inputs.año) errors.año = "*Debe completar el campo"

    const patenteAR = /^(?:[A-Z]{3}[ -]?\d{3}|[A-Z]{2}[ -]?\d{3}[ -]?[A-Z]{2})$/;
    if (!inputs.dominio) errors.dominio = "*Debe completar el campo"
    if (!patenteAR.test(inputs.dominio)) {
    errors.dominio = "Formato inválido. Ej: 'AAA 123' o 'AA 123 AA' (espacios/guiones opcionales).";
    }


    if (!inputs.kilometros) errors.kilometros = "*Debe completar el campo"
    const km = Number(inputs.kilometros);
    if (!Number.isSafeInteger(km)) {errors.kilometros = "Número inválido";}
    

    if (!inputs.color) errors.color = "*Debe completar el campo"
    if (inputs.color.trim().length < 3) {
    errors.color = "*El color debe tener al menos 3 caracteres";
    }

    if (!inputs.observaciones) errors.observaciones = "*Debe completar el campo"

    return errors;
}