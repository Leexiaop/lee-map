import {useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const Light = () => {
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const light = document.getElementById('light');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, light.clientWidth / light.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 10);
        scene.add(camera);
        const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
        const material = new THREE.MeshStandardMaterial();
        const sphere = new THREE.Mesh(sphereGeometry, material);
        sphere.castShadow = true;
        scene.add(sphere);
        const planeGeometry = new THREE.PlaneGeometry(30, 30);
        const planeCube = new THREE.Mesh(planeGeometry, material);
        planeCube.position.set(0, -1, 0);
        planeCube.rotation.x = -Math.PI / 2;
        planeCube.receiveShadow = true;
        scene.add(planeCube);

        const envLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(envLight);

        const directLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directLight.position.set(10, 10, 10);
        directLight.castShadow = true;
        directLight.shadow.radius = 20;
        directLight.shadow.mapSize.set(4096, 4096);
        directLight.shadow.camera.near = 0.5;
        directLight.shadow.camera.far = 500;
        directLight.shadow.camera.top = 5;
        directLight.shadow.camera.right = 5;
        directLight.shadow.camera.bottom = -5;
        directLight.shadow.camera.left = -5;
        scene.add(directLight);
        const axesHelper = new THREE.AxesHelper(6, 6, 6);
        scene.add(axesHelper);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(light.clientWidth, light.clientHeight);
        renderer.shadowMap.enabled = true;
        light.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        const render = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        };
        render();
        window.addEventListener('resize', () => {
            camera.aspect = light.clientWidth / light.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(light.clientWidth, light.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
        });
        window.addEventListener('dblclick', () => {
            const fullScreenElement = document.fullscreenElement;
            if (!fullScreenElement) {
                renderer.domElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
    };

    return <div id="light" className="case" />;
};

export default Light;
