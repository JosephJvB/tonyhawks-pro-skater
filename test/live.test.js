const axios = require('axios')

axios({
  method: 'post',
  url: 'https://qos3ykxv4d.execute-api.us-west-2.amazonaws.com/Prod/save',
  data: {
    user: {
      id: 'api-testid',
      avatar: 'api-testavatar',
      nickname: 'api-testname'
    }
  }
})
.then(r => console.log(r.status))
.catch(console.log)