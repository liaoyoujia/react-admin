import jsonp from 'jsonp'
import { message } from 'antd'
export const loadWeather = (city) => {
  return new Promise((res, rej) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        res({ dayPictureUrl, weather })
      } else {
        message.error('获取天气信息失败!')
      }
    })

  })
}
