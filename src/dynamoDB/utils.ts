
export class Utils {
    
    static generateUpdateQuery(fields) {
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

    static SplitBatch(params: any) {
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

}

export function encode(unencoded: string) {
    return Buffer.from(unencoded).toString('base64');
};

export function decode(encoded: string) {
    return Buffer.from(encoded, 'base64').toString('utf8');
};

export function urlEncode(unencoded: string) {
    let encoded = encode(unencoded);
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

export function urlDecode(encoded: string) {
    let decoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (decoded.length % 4) decoded += '=';
    return decode(decoded);
};