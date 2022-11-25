import {useEffect} from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import './index.less';

const Openlayer = () => {
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const olmap = new Map({ // 创建一个地图
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            target: 'olmap',
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });
        console.log(olmap);
    };
    return (
        <>
            <div id="olmap" style={{width: '100%', height: '100%'}}/>
        </>
    );
};

export default Openlayer;
