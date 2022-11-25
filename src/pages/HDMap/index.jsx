import {useEffect} from 'react';
import {connect} from 'umi';
import MapLayout from '@/components/MapLayout';
import IM from './core/index';
import proj from '@/utils/proj.js';
import * as THREE from 'three';

const HDMap = ({setState, versionId, styleOperate}) => {
    useEffect(() => {
        if (!versionId) return;
        let center = [116.56553454670357, 40.03468756698015];
        const mars = proj.baiduTomars(center);
        const wgs84 = proj.marsTowgs(mars);
        const HdMap = new IM.Viewer({
            container: 'hdmap',
            centter: {lng: wgs84[0], lat: wgs84[1]},
            styleVersion: versionId,
            bgColor: '#e9e9e9'
        });
        console.log(HdMap);
        initHdMap();
    }, [versionId]);

    const initHdMap = () => {
        const div = document.getElementById('hdmap');
        const scene = new THREE.Scene({
            background: {
                color: '#fff'
            }
        });
        const camera = new THREE.PerspectiveCamera(75, div.clientWidth / div.clientHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(div.clientWidth, div.clientHeight);
        div.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        let light = new THREE.PointLight(0xFFFFFF, 1, 500);
        light.position.set(10, 0, 25);
        scene.add(light);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        }

        animate();
    };

    return (
        <MapLayout>
            <div id="hdmap" style={{height: '100%', width: '100%'}}/>
        </MapLayout>
    );
};

const mapStateToProps = ({mapstate}) => {
    return {
        styleOperate: mapstate.styleOperate,
        versionId: mapstate.versionId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setState(data) {
            dispatch({type: 'mapstate/setState', data});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HDMap);
