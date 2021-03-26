export const FormaterCnpj = (string: string) => {
    return string.replace(/\./g, '')
        .replace(/\//g, '')
        .replace(/\-/g, '')
}

export const addMask = (string: string) => {
    return string.replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

export const AddMaskMoney = (item: string) => {

    item = item.replace(/\D/g, '')
        .replace(/([0-9]{2})$/, ',$1');

    if (item.length > 6) {
        item = item.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    return item;
}

export const FormaterMoney = (string: string) => {
    return string.replace(/\./g, '')
        .replace(/\,/g, '')
        .replace(/\R/g, '')
        .replace(/\$/g, '')
}