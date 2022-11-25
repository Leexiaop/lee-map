export default [
    {
        path: '/threejs',
        redirect: '/threejs/door'
    },
    {
        path: '/threejs/door',
        component: '@/pages/Threejs/DoorCase/index',
        label: '门案例',
        key: '5-1'
    },
    {
        path: '/threejs/demo',
        component: '@/pages/Threejs/DemoCase/index',
        label: 'Demo案例',
        key: '5-2'
    }
];
