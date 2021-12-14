export const getPricesRange = (priceQueryStr: string | undefined) => {

    // let pricesRange: undefined | undefined[] | number[]
    // let min, max

    // switch(true) {
    //     case priceQueryStr?.includes('>'):
    //         if(priceQueryStr?.includes('>')) {
    //             min = parseInt(priceQueryStr.replaceAll('>', ''))
    //             pricesRange = [min, Infinity]
    //         }
    //         break
    //     case priceQueryStr?.includes('<'):
    //         if(priceQueryStr?.includes('<')) {
    //             max = parseInt(priceQueryStr.replaceAll('<', ''))
    //             pricesRange = [-Infinity, max]
    //         }
    //         break
    //     case priceQueryStr?.includes(','):
    //         if(priceQueryStr?.includes(',')) {
    //             const indexOfComma = priceQueryStr.indexOf(',')
    //             min = parseInt(priceQueryStr.substr(0, indexOfComma))
    //             max = parseInt(priceQueryStr.substr(indexOfComma + 1))
    //             pricesRange = [min, max]
    //         }
    //         break
    //     default:
    //         pricesRange = [undefined, undefined]
    //         break
    // }

    // return pricesRange

    let pricesRange: undefined | undefined[] | number[]

    switch(priceQueryStr !== undefined) {
        case true:
            priceQueryStr?.includes(',')
                ? pricesRange = priceQueryStr?.split(',').map(price => parseInt(price))
                : pricesRange = [parseInt(String(priceQueryStr)), Infinity]
            break
        default:
            pricesRange = [-Infinity, Infinity]
            break
    }

    return pricesRange
}