import {useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import doorTextureColor from '@/assets/texture/door/color.jpg';

const DoorCase = () => {
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        //  获取画布
        const door = document.getElementById('door');
        //  创建场景
        const scene = new THREE.Scene();
        //  创建相机
        const camera = new THREE.PerspectiveCamera(75, door.clientWidth / door.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 10);
        scene.add(camera);
        //  创建几何物体
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        //  创建材质
        //  导入纹理
        const textureLoader = new THREE.TextureLoader();
        const doorTexture = textureLoader.load(doorTextureColor);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            map: doorTexture
        });
        //  创建网格
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        //  创建渲染对象
        const renderer = new THREE.WebGLRenderer();
        //  设置渲染的尺寸
        renderer.setSize(door.clientWidth, door.clientHeight);
        //  将webgl渲染的canvas添加到画布中
        door.appendChild(renderer.domElement);
        //  创建控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        //  添加阻尼，使得动画更逼真
        controls.enableDamping = true;
        //  添加坐标轴
        const axesHelper = new THREE.AxesHelper(10, 10, 10);
        scene.add(axesHelper);
        // renderer.render(scene, camera);
        const render = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        };
        render();
        //  动态适配窗口大小
        window.addEventListener('resize', () => {
            camera.aspect = door.clientWidth / door.clientHeight;
            //   更新摄像机的投影矩阵
            camera.updateProjectionMatrix();
            //   更新渲染器
            renderer.setSize(door.clientWidth, door.clientHeight);
            //   设置渲染器的像素比
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

    return <div id="door" className="case" />;
};

export default DoorCase;
