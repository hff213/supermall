import axios from 'axios'



export function request(config) {




  const instance = axios.create({
    baseURL: 'http://192.168.15.233',
    timeout: 1000
  })

//   instance.interceptors.request.use(config => {
//     console.log(config)
//     return config
//   }, err => {

//   })


instance.interceptors.response.use(config => {
    //console.log(config)
    return config.data
  }, err => {
console.log(err)
  })

  return instance(config)





}
