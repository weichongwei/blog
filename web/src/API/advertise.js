import fentch from './fentch';

export default{
    list(params){
        return fentch.post('/advertise',params)
    },
}