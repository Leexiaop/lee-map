import {useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const PointLight = () => {
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const point = document.getElementById('point');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, point.clientWidth / point.clientHeight, 0.1, 1000);
        camera.position.set(10, 10, 10);
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

        const smallBall = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 20, 20),
            new THREE.MeshBasicMaterial({color: 0xff0000})
        );
        smallBall.position.set(2, 2, 2);

        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        // spotLight.position.set(5, 5, 5);
        pointLight.castShadow = true;
        // 设置阴影贴图模糊度
        pointLight.shadow.radius = 20;
        // 设置阴影贴图的分辨率
        pointLight.shadow.mapSize.set(512, 512);
        pointLight.decay = 0;

        // 设置透视相机的属性
        smallBall.add(pointLight);
        scene.add(smallBall);

        const axesHelper = new THREE.AxesHelper(6, 6, 6);
        scene.add(axesHelper);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(point.clientWidth, point.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.physicallyCorrectLights = true;
        point.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        const clock = new THREE.Clock();
        const render = () => {
            controls.update();
            let time = clock.getElapsedTime();
            smallBall.position.x = Math.sin(time) * 3;
            smallBall.position.z = Math.cos(time) * 3;
            smallBall.position.y = 2 + Math.sin(time * 10) / 2;
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        };
        render();
        window.addEventListener('resize', () => {
            camera.aspect = point.clientWidth / point.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(point.clientWidth, point.clientHeight);
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

    return <div id="point" className="case"/>;
};

export default PointLight;
