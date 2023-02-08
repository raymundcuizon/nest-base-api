import * as sharp from "sharp"
import { decode, encode } from "blurhash"

export const encodeBlurHash = async (image) => {
    const { data, info } = await sharp(image)
    .ensureAlpha()
    .raw()
    .toBuffer({
      resolveWithObject: true
    });

    return encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4);
}

export const createBuffer = async (createReadStream) => {
    let fileStream = createReadStream();
    
    const chunks = [];
    for await (const chunk of fileStream) {
        chunks.push(chunk);
    }

    return Buffer.concat(chunks);
}

export const getFileExtension = (filename) => {

    const extension = filename.split('.').pop();
    return extension;
}

export const generateUpdateQuery = (fields) => {
    let exp = {
        UpdateExpression: 'set',
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {}
    }
    Object.entries(fields).forEach(([key, item]) => {
        exp.UpdateExpression += ` #${key} = :${key},`;
        exp.ExpressionAttributeNames[`#${key}`] = key;
        exp.ExpressionAttributeValues[`:${key}`] = item
    })
    exp.UpdateExpression = exp.UpdateExpression.slice(0, -1); 
    return exp
}


export const SplitBatch = (params: any) => {
    const max_items = 25;
    let tables = Object.entries(params.RequestItems);
    let transactions = {};

    for (const [table, requests] of tables as any) {
        for (let index = 0; index < requests.length; index += max_items) {
            let block = requests.slice(index, index + max_items);
            if (!transactions[table]) {
                transactions[table] = [block]
            } else {
                let last = transactions[table][transactions[table].length - 1];
                let idx = last.length;

                if(idx < max_items){
                    let first = block.slice(0, idx);
                    let second = block.slice(idx);
                    last.splice(idx, 0, ...first);
                    transactions[table].push(second)
                } else {
                    transactions[table].push(block)
                }
            }
        }
    }

    let reduced = Object.entries(transactions)
    .reduce((acc, [table, requests]) => {
        for (const req of requests  as any){
            acc.push({
                RequestItems: {
                    [table]: req
                }
            });
        }
        return acc;
    }, [])

    return reduced;
}