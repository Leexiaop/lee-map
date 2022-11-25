import {useEffect} from 'react';
import {connect} from 'umi';
import MapLayout from '@/components/MapLayout';
import './index.less';

const {BMapGL} = window;
const BDMap = ({setState, styleOperate}) => {
    useEffect(() => {
        initMap();
    }, []);

    const initMap = () => {
        const map = new BMapGL.Map('bdmap');
        let point = new BMapGL.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
    };
    return (
        <MapLayout>
            <div id="bdmap" />
        </MapLayout>
    );
};

const mapStateToProps = ({mapstate}) => {
    return {
        styleOperate: mapstate.styleOperate
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setState(data) {
            dispatch({type: 'mapstate/setState', data});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BDMap);
