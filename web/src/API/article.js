import fentch from './fentch';

export default{
    list(params){
        return fentch.get('/article',params)
    },
    detail(params){
        return fentch.get('/article/'+params._id)
    }
}