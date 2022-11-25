import * as THREE from 'three';
import projcn from '@/utils/proj';

class Viewer {
    constructor(config) {
        this.config = config;
        this.app = {
            //  设置地图中心点
            centerWgs84: null,
            centerMercator: null,
            origin: null,
            styleVersion: 15,
            width: 0,
            height: 0,
            three: {
                //  场景
                scene: {
                    background: null
                },
                //  相机对象
                camera: null,
                //  渲染对象
                renderer: null
            },
            domElement: null,
            bgColor: ''
        };
    }
    init(initCallback) {
        this.app.centerWgs84 = [this.config.center.lng, this.config.center.lat];
        this.app.centerMercator = projcn.lonlatTomercator(this.app.centerWgs84);
        this.app.origin = {x: this.app.centerMercator[0], y: 0, z: this.app.centerMercator[1]};
        this.app.styleVersion = this.config.styleVersion || 15;
        this.app.domElement = document.getElementById(this.config.container);
        this.app.width = this.app.domElement.clientWidth;
        this.app.height = this.app.domElement.clientHeight;
        this.app.bgColor = this.config.bgColor;
        this.app.three = {
            scene: new THREE.Scene()
        };
        this.app.three.scene.background = new THREE().Color(this.app.bgColor);
        this.app.three.camera = new THREE.OrthographicCamera(this.app.width / -2, this.app.width / 2, this.app.height / 2, this.app.height / -2, 0.1, 10000);
        //  透视相机，这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式
        // this.app.three.perspectiveCamera = new THREE.PerspectiveCamera(75, this.app.width / this.app.height, 0.1, 10000);
        //  正交相机，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变
        // this.app.three.orthoCamera = new THREE.OrthographicCamera(this.app.width / -2, this.app.width / 2, this.app.height / 2, this.app.height / -2, 0.1, 10000);
        this.app.three.renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: false
        });

        this.app.domElement.appendChild(this.app.three.renderer.domElement);
    }
}

export default Viewer;
