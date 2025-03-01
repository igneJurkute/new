console.clear();

type Product = {
    id: number;
    name: string;
    acquisitionPrice: number;
    sellingPrice: number;
    amount: number;
};

type Shop = {
    lastProductId: number;
    name: string;
    currency: string;
    inventor: Product[];
}

type FuncReturnBoolStr = [boolean, string];
type FuncReturnBoolProd = [boolean, Product];

const kioskas: Shop = {
    lastProductId: 0,
    name: 'Kioskas',
    currency: 'Eur',
    inventor: [],
};

function intro(): string {
    return `Sveiki atvyke i ${kioskas.name}!`;
}

function findProductById(productId: number): FuncReturnBoolStr | FuncReturnBoolProd {
    let foundProduct = null;

    for (const product of kioskas.inventor) {
        if (product.id === productId) {
            foundProduct = product;
            break;
        }
    }

    if (!foundProduct) {
        return [true, `❌ Nepavyko rasti prekes pagal id: ${productId}`];
    }

    return [false, foundProduct];
}

function addProduct(name: string, buyPrice: number, sellPrice: number, amount: number): FuncReturnBoolStr {
    const product: Product = {
        id: ++kioskas.lastProductId,
        name: name,
        acquisitionPrice: buyPrice,
        sellingPrice: sellPrice,
        amount: amount,
    };

    kioskas.inventor.push(product);

    return [false, '✅ Preke prideta'];
}

function sellProduct(productId: number, amount: number): FuncReturnBoolStr {
    const [err, result] = findProductById(productId);
    if (err) {
        return [err, result] as FuncReturnBoolStr;
    }

    const foundProduct = result as Product;
    if (foundProduct.amount < amount) {
        return [true, `❌ Nera norimo ${foundProduct.name} kiekio: nori ${amount}; turim ${foundProduct.amount}.`];
    }

    foundProduct.amount -= amount;

    return [false, '✅ Preke parduota'];
}

function dropProduct(productId: number): FuncReturnBoolStr {
    const [err, result] = findProductById(productId);
    if (err) {
        return [err, result] as FuncReturnBoolStr;
    }

    const foundProduct = result as Product;
    foundProduct.amount = 0;

    return [false, '✅ Atsikratytas prekes likutis'];
}

function fillInventor(productId: number, amount: number): FuncReturnBoolStr {
    const [err, result] = findProductById(productId);
    if (err) {
        return [err, result] as FuncReturnBoolStr;
    }

    const foundProduct = result as Product;
    foundProduct.amount += amount;

    return [false, '✅ Preke papildyta'];
}

function summary(): string {
    const listStrings = [];
    const title = `Parduotuves "${kioskas.name}" ataskaita:`;
    let list = 'Nera prekiu.';

    if (kioskas.inventor.length) {
        let i = 0;

        for (const { name, acquisitionPrice, sellingPrice, amount } of kioskas.inventor) {
            listStrings.push(`${++i}) ${name}: ${acquisitionPrice}; ${sellingPrice}; ${amount};`);
        }

        list = listStrings.join('\r\n');
    }

    let longestString = title.length;
    for (const str of listStrings) {
        if (str.length > longestString) {
            longestString = str.length;
        }
    }

    const line = '='.repeat(longestString);

    return `\r\n${line}\r\n${title}\r\n${line}\r\n${list}\r\n${line}\n`;
}

console.log(intro());

const [err0, msg0] = addProduct('Svogunas', 6, 66, 666);
console.log(err0, msg0);
const [err1, msg1] = addProduct('Labai raudonas pomidoras', 1, 2, 10);
console.log(err1, msg1);
const [err2, msg2] = addProduct('Agurkas', 0.5, 1.5, 20);
console.log(err2, msg2);

const [err3, msg3] = sellProduct(999, 5);
console.log(err3, msg3);
const [err4, msg4] = sellProduct(2, 25);
console.log(err4, msg4);
const [err5, msg5] = sellProduct(2, 5);
console.log(err5, msg5);
const [err6, msg6] = dropProduct(1);
console.log(err6, msg6);
const [err7, msg7] = fillInventor(1, 50);
console.log(err7, msg7);

console.log(kioskas.inventor);
console.log(summary());