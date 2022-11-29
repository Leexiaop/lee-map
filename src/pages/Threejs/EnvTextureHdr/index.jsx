import {useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';

const EnvTextureHdr = () => {
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const hdr = document.getElementById('hdr');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, hdr.clientWidth / hdr.clientHeight, 0.01, 1000);
        camera.position.set(10, 0, 10);
        scene.add(camera);
        const rgbeLoader = new RGBELoader();
        rgbeLoader.loadAsync('https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr').then(texture => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = texture;
            scene.environment = texture;
        });
        const sphereGemotery = new THREE.SphereGeometry(4, 20, 20);
        const material = new THREE.MeshStandardMaterial({
            metalness: 0.7,
            roughness: 0.1
        });
        const cube = new THREE.Mesh(sphereGemotery, material);
        scene.add(cube);
        const axesHelper = new THREE.AxesHelper(6, 6, 5);
        scene.add(axesHelper);
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);
        const directLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directLight.position.set(10, 10, 10);
        scene.add(directLight);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(hdr.clientWidth, hdr.clientHeight);
        hdr.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        const render = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        };
        render();
        window.addEventListener('resize', () => {
            camera.aspect = hdr.clientWidth / hdr.clientHeight;
            //   更新摄像机的投影矩阵
            camera.updateProjectionMatrix();
            //   更新渲染器
            renderer.setSize(hdr.clientWidth, hdr.clientHeight);
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

    return <div id="hdr" className="case" />;
};

export default EnvTextureHdr;
