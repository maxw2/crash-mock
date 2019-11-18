import XMLHttpRequest from './xhr'

function Mock(option) {
    if (!option) throw new Error('输入配置文件')
    if (!option.response || typeof option.response !== 'object') throw new Error('返回数据不能为空')

    // XMLHttpResquest
    this.ajax = function (data) {
        if (!data) throw new Error('you need data')
        if (!Array.isArray(data)) throw new Error('data is array')

        window.mockData = data
        window.XMLHttpRequest = XMLHttpRequest
    }
    // fetch
    this.fetch = function (data) {

    }

    if (option.mode === 'ajax' || !option.mode) {
        this.ajax(option.response)
    } else if (option.mode === 'fetch') {
        this.fetch(option.response)
    }
}
// console.log(Mock)
export default Mock





