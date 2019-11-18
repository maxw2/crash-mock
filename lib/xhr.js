const OriginXMLHttpRequest = window.XMLHttpRequest

function XMLHttpRequest() {
    this.originXML = null
    //
    this.url = null
    this.res = null

    this.open = function (method, url, async, user, password) {
        if (!window.mockData) throw new Error('mockData is ' + window.resData)
        if (!method) throw new Error(method)
        if (!url || typeof url !== 'string') throw new Error(url)

        window.mockData.forEach(element => {
            let eleUrl = element.url
            let eleRes = element.res
            let regUrl = new RegExp(eleUrl)
            if (regUrl.test(url)) {
                this.url = eleUrl
                this.res = eleRes
            }
        });

        // 判断链接是否匹配 不匹配则调用原生XMLHttpRequest
        // 
        if (!this.url || !this.res) {
            this.originXML = new OriginXMLHttpRequest()
            this.originXML.open(method, url, async, user, password)
        }
    }

    this.send = function () {
        // 判断链接是否匹配 不匹配则调用原生XMLHttpRequest
        if (this.url && this.res) {
            this.readyState = 4
            this.status = 200
            this.responseText = JSON.stringify(this.res)
            this.onreadystatechange()
        } else {
            this.originXML.send()
        }
    }

    this.recovery = function () {
        window.XMLHttpRequest = OriginXMLHttpRequest
        OriginXMLHttpRequest = null
    }

}

export default XMLHttpRequest