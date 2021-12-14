import request from 'request'
import cheerio from 'cheerio'

interface Product {
    name: string,
    price: string,
    imageSrcs: string[]
}

const createRandomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const crawlDetail = (url: string, imgSrcs: any[], name: string, price: number) => {
    return new Promise((resolve: any) => {
        request('https://newbox.com.vn'.concat(url), async (err, res, body) => {
            if(!err && res.statusCode === 200) {
                const $ = cheerio.load(body)
                const imgs = $('#surround .inner a').not(':first')
                $(imgs).each((index, img) => imgSrcs.push($(img).attr('href')))
                resolve({
                    name,
                    price,
                    imgSrcs: imgSrcs.map(src => 'https:'.concat(src))
                })
            }
        })
    })
}

const crawl = (url: string) => {
    return new Promise((resolve: any) => {
        request(url, async (err: any, res: any, body: any) => {
            if(!err && res.statusCode === 200) {
                let requests: any[] = []
                const $ = cheerio.load(body)
                const items = $('.product-item')
                let products: Product[] = []
                $(items).each(async (index: number, item: any) => {
                    let imgSrcs: any = []
                    const imgSrc = $(item).find('img').first().attr('src')
                    const name = $(item).find('.product-title a').first().text()
                    const price = $(item).find('.product-price span').first().text()
                    const link: any = $(item).find('.product-title a').first().attr('href')
                    imgSrcs.push(imgSrc)
                    requests.push(crawlDetail(
                        link, imgSrcs, name, 
                    parseInt(price.replaceAll(",", "").replaceAll("đ", ""))))
                })
                let values = await Promise.all(requests)
                resolve(values)
            }
        })
    })
}

const crawlMany = (url: string, lastPage: number) => {
    const requests: Array<any> = []
    for(let i = 1; i <= lastPage; i ++) {
        requests.push(crawl(`${url}?page=${i}`))
    }
    return Promise.all(requests)
}


// app.get('/db', async (req: any, res: any) => {
//     let values = await crawlMany('https://newbox.com.vn/collections/apparel', 4)
//     //console.log(values)
//     values = values.reduce((arr, el) => {
//         arr = [...arr, ...el]
//         return arr
//     }, [])
//     values = values.map(value => {
//         const { imgSrcs, ...rest } = value
//         return {
//             ...rest,
//             imageSrcs: imgSrcs,
//             ratingsQty: {
//                 1: createRandomNum(0, 9),
//                 2: createRandomNum(0, 9),
//                 3: createRandomNum(0, 9),
//                 4: createRandomNum(0, 100),
//                 5: createRandomNum(0, 50)
//             },
//             buyingsQty: createRandomNum(0, 50),
//             salePercent: createRandomNum(0, 4) === 0
//                 ? 20
//                 : (
//                     createRandomNum(0, 4) === 1
//                         ? 15
//                         : (
//                             createRandomNum(0, 4) === 2
//                                 ? 10
//                                 : (
//                                     createRandomNum(0, 4) === 3
//                                         ? 5
//                                         : 0
//                                 )
//                         )
//                 ),
//             createdAt: createRandomNum(
//                 Date.now() - 1000 * 60 * 60 * 60 * 24 * 30 * 2,
//                 Date.now() - 1000 * 60 * 60 * 60 * 24 * 30
//             ),
//             category: 'apparel'
//         }
//     })
//     console.log(values.length)
//     let undefinedImgs: any
//     if(values.length > 0) {
//         undefinedImgs = values.filter(value => value.imageSrcs.length === 0)
//     }
//     res.json({
//         values,
//         undefinedImgs
//     })
// })