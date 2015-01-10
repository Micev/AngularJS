app.factory('adsData',['$resource', 'baseServiceUrl', 'authentication', function ($resource, baseServiceUrl, authentication) {
    var resource = $resource(baseServiceUrl + 'ads:adId', {adId: '@id'}, {update: {method: 'PUT'}});

    function getPublicAds(filterParam){
        return resource.get(filterParam);
    }

    function editAd(adId, ad){
        return resource.update({id:adId}, ad)
    }

    function getAdById(adId){
        return resource.get({id: adId});
    }

    function addAd(ad){

        var adsResource = $resource(
            baseServiceUrl + 'user/ads',
            null, {
                'publishAd': {
                    method: 'POST',
                    headers: {
                        Authorization: "Bearer " + authentication.getUser().access_token
                    },
                    data: ad
                }
            }
        );

        return adsResource.publishAd(ad);
    }

    function deleteAd(adId){
        return resource.delete(({id: adId}));
    }
    return{
        getPublicAds: getPublicAds,
        edit : editAd,
        getAdById : getAdById,
        add: addAd,
        delete : deleteAd
    }
}]);