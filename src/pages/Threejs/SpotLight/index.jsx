import {useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';


const SpotLight = () => {
    const gui = new dat.GUI();
    useEffect(() => {
        init();
        return () => {
            gui.destroy();
        };
    }, []);

    const init = () => {
        const spot = document.getElementById('spot');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, spot.clientWidth / spot.clientHeight, 0.1, 1000);
        camera.position.set(0, 10, 10);
        scene.add(camera);

        const sphereGemotery = new THREE.SphereGeometry(1, 20, 20);
        const material = new THREE.MeshStandardMaterial();
        const sphere = new THREE.Mesh(sphereGemotery, material);
        sphere.castShadow = true;
        scene.add(sphere);

        const planeGeometry = new THREE.PlaneGeometry(30, 30, 30);
        const planeCube = new THREE.Mesh(planeGeometry, material);
        planeCube.position.set(0, -1, 0);
        planeCube.rotation.x = -Math.PI / 2;
        // 接收阴影
        planeCube.receiveShadow = true;
        scene.add(planeCube);

        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);
        const spotLight = new THREE.SpotLight(0xffffff, 0.5);
        spotLight.position.set(5, 5, 5);
        spotLight.castShadow = true;
        spotLight.intensity = 2;
        // 设置阴影贴图模糊度
        spotLight.shadow.radius = 20;
        // 设置阴影贴图的分辨率
        spotLight.shadow.mapSize.set(512, 512);

        // console.log(directionalLight.shadow);
        spotLight.target = sphere;
        spotLight.angle = Math.PI / 6;
        spotLight.distance = 0;
        spotLight.penumbra = 0;
        spotLight.decay = 0;

        scene.add(spotLight);
        gui.add(sphere.position, 'x').min(-5).max(5).step(0.1);
        gui
            .add(spotLight, 'angle')
            .min(0)
            .max(Math.PI / 2)
            .step(0.01);
        gui.add(spotLight, 'distance').min(0).max(10).step(0.01);
        gui.add(spotLight, 'penumbra').min(0).max(1).step(0.01);
        gui.add(spotLight, 'decay').min(0).max(5).step(0.01);

        const axesHelper = new THREE.AxesHelper(6, 6, 6);
        scene.add(axesHelper);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(spot.clientWidth, spot.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.physicallyCorrectLights = true;
        spot.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        const render = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        };
        render();
        window.addEventListener('resize', () => {
            camera.aspect = spot.clientWidth / spot.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(spot.clientWidth, spot.clientHeight);
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

    return <div id="spot" className="case"/>;
};

export default SpotLight;
