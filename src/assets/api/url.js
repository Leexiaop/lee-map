const hd = '/render-style/api';
const bd = '/api';
export default {
    //  bd
    getBdVersionScence: `${bd}/version/getscence`,
    getBdVersionList: `${bd}/version/list`,
    getSearchStyle: `${bd}/style/searchStyle`,

    //  hd
    getHdVersionList: `${hd}/version/list`,
    getFeatureList: `${hd}/featureclass/listv`,
    getModelList: `${hd}/model/list`,
    getStyleList: `${hd}/style/list`,
    getColorList: `${hd}/color/list`,
    getTextureList: `${hd}/texture/list`
};
