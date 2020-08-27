import fentch from './fentch';

export default{
    list(params){
        return fentch.get('/category',params)
    }
}