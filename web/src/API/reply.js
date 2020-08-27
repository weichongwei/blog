import fentch from './fentch';

export default{
    create(params){
        return fentch.post('/reply',params)
    },
}