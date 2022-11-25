import { defineConfig } from 'umi';
import routers from './src/routers';

export default defineConfig({
	nodeModulesTransform: {
		type: 'none',
	},
	history: {
		type: 'hash'
	},
	title: '进阶学习',
	publicPath: "./",
	base: "/",
	routes: [
        {
            path: '/',
            component: '@/pages/index',
            routes: routers
        }
    ],
	fastRefresh: {},
	headScripts: [
		{
			src: '//api.map.baidu.com/api?type=webgl&v=1.0&ak=aBTHDOqunO4sDYDc0ALZlk0poKnecy6O'
		},
		{
			src: '//code.bdstatic.com/npm/mapvgl@1.0.0-beta.141/dist/mapvgl.min.js'
		}
	],
	proxy: {
		'/api': {
			'target': 'https://mapstyle.baidu.com/',
			'changeOrigin': true,
			'pathRewrite': { '^/api' : '' },
		},
		'/render-style/api': {
			'target': 'http://fanlu01.bcc-bdbl.baidu.com:8081/',
			// 'target': 'http://wupeng17.bcc-gzbh.baidu.com:8090',
			'changeOrigin': true,
			'pathRewrite': { '^/render-style/api' : '' },
		},
	}
});
