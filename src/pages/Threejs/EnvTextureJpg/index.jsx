import {useEffect, useState} from 'react';
import {Spin} from 'antd';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const EnvTextureJpg = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const jpg = document.getElementById('jpg');
        //  创建场景
        const scene = new THREE.Scene();
        //  创建相机
        const camera = new THREE.PerspectiveCamera(75, jpg.clientWidth / jpg.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 10);
        scene.add(camera);
        const loadingManager = new THREE.LoadingManager();
        loadingManager.onProgress = (_, itemsLoaded, itemsTotal) => {
            setValue((itemsLoaded / itemsTotal).toFixed());
        };
        //  纹理加载
        const cubTextureLoader = new THREE.CubeTextureLoader(loadingManager);
        const envMapTexture = cubTextureLoader.load([
            require('@/assets/texture/envJpg/1/px.jpg'),
            require('@/assets/texture/envJpg/1/nx.jpg'),
            require('@/assets/texture/envJpg/1/py.jpg'),
            require('@/assets/texture/envJpg/1/ny.jpg'),
            require('@/assets/texture/envJpg/1/pz.jpg'),
            require('@/assets/texture/envJpg/1/nz.jpg')
        ]);
        //  给场景添加背景
        scene.background = envMapTexture;
        //  创建圆球
        const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
        const material = new THREE.MeshStandardMaterial({
            metalness: 0.7,
            roughness: 0.1,
            envMap: envMapTexture
        });
        const shader = new THREE.Mesh(sphereGeometry, material);
        scene.add(shader);
        //  添加坐标轴
        const axesHelper = new THREE.AxesHelper(6, 6, 6);
        scene.add(axesHelper);
        //  创建环境光源
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);
        //  设置平行光
        const directLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directLight.position.set(10, 10, 10);
        scene.add(directLight);
        //  创建渲染
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(jpg.clientWidth, jpg.clientHeight);
        jpg.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        const render = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        };
        render();
        window.addEventListener('resize', () => {
            camera.aspect = jpg.clientWidth / jpg.clientHeight;
            //   更新摄像机的投影矩阵
            camera.updateProjectionMatrix();
            //   更新渲染器
            renderer.setSize(jpg.clientWidth, jpg.clientHeight);
            //   设置渲染器的像素比
            renderer.setPixelRatio(window.devicePixelRatio);
        });
        window.addEventListener('dblclick', () => {
            const fullscreenElement = document.fullscreenElement;
            if (!fullscreenElement) {
                renderer.domElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
    };

    return (
        <>
            <div id="jpg" className="case"/>
            {
                value < 1 ? (
                    <div className="mask">
                        <Spin tip={`加载中${value * 100}%...`} size="large" />
                    </div>
                ) : null
            }
        </>
    );
};

export default EnvTextureJpg;
