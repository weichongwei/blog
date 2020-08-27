import fentch from './fentch';

export default{
    create(params){
        return fentch.post('/comment',params)
    },
    targetList(params){
        return fentch.get('/comment/target/list',params)
    }
}