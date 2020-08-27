import fentch from './fentch';

export default{
    login(params){
        return fentch.post('/admin/login',params)
    },
    getUser(params){
        return fentch.get('/admin/getUser',params)
    }
}