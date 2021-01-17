import { AxiosService } from './AxiosService';

class PartnersServices {
    reachOutToPartnersInRange(params, onSuccess, onError){
        AxiosService('post', '/partners/in-range', params, onSuccess, onError);
    }
}

export default PartnersServices;