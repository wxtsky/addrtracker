import axios from 'axios';

export const getLxpL = async () => {
    const response = await axios.get('https://kx58j6x5me.execute-api.us-east-1.amazonaws.com/linea/getUserPointsSearch', {
        params: {
            'user': '0x43c45194b941a6276515fe822a87177dc0466c2e'
        },
        headers: {
            'accept': '*/*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'origin': 'https://www.openblocklabs.com',
            'referer': 'https://www.openblocklabs.com/',
            'sec-ch-ua': '"Microsoft Edge";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0'
        }
    });
    return response.data[0].xp;
}