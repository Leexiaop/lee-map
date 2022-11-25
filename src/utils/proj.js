
let pi = 3.14159265358979324;
let a = 6378245.0;
let ee = 0.00669342162296594323;

let projcn = {
    // 百度坐标转火星坐标
    baiduTomars(bdlonlat) {
        let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        let x = bdlonlat[0] - 0.0065;
        let y = bdlonlat[1] - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
        let lon = z * Math.cos(theta);
        let lat = z * Math.sin(theta);
        return [lon, lat];
    },
    // 火星坐标转百度坐标
    marsTobaidu(lonlat) {
        let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        let x = lonlat[0];
        let y = lonlat[1];
        let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
        let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
        let lon = z * Math.cos(theta) + 0.0065;
        let lat = z * Math.sin(theta) + 0.006;
        return [lon, lat];
    },
    // 经纬度转墨卡托
    lonlatTomercator(lonlat) {
        if (!lonlat) {
            return;
        }
        let x = lonlat[0] * 20037508.34 / 180;
        let y = Math.log(Math.tan((90 + lonlat[1]) * Math.PI / 360)) / (Math.PI / 180);
        y = y * 20037508.34 / 180;
        return [x, y];
    },
    // 墨卡托转经纬度
    mercatorTolonlat(mercator) {
        if (!mercator) {
            return;
        }
        let x = mercator[0] / 20037508.34 * 180;
        let y = mercator[1] / 20037508.34 * 180;
        y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
        return [x, y];
    },
    // WGS84转火星坐标
    wgsTomars(lonlat) {
        let wgLon = lonlat[0];
        let wgLat = lonlat[1];

        if (this.outOfChina(wgLon, wgLat)) {
            return [wgLon, wgLat];
        }
        let dLat = this.transformLat(wgLon - 105.0, wgLat - 35.0);
        let dLon = this.transformLon(wgLon - 105.0, wgLat - 35.0);
        let radLat = wgLat / 180.0 * pi;
        let magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
        let lat = wgLat + dLat;
        let lon = wgLon + dLon;
        return [lon, lat];
    },
    // 火星坐标转wgs84
    marsTowgs(lonlat) {
        let lng = lonlat[0];
        let lat = lonlat[1];
        // 国外不用转
        if (this.outOfChina(lng, lat)) {
            return [lng, lat];
        }
        let dlat = this.transformLat(lng - 105.0, lat - 35.0);
        let dlng = this.transformLon(lng - 105.0, lat - 35.0);
        let radlat = lat / 180.0 * pi;
        let magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        let sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * pi);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * pi);
        let mglat = lat + dlat;
        let mglng = lng + dlng;
        return [lng * 2 - mglng, lat * 2 - mglat];
    },
    // 判断是否在国外
    outOfChina(lon, lat) {
        if ((lon < 72.004 || lon > 137.8347) && (lat < 0.8293 || lat > 55.8271)) {
            return true;
        } else {
            return false;
        }
    },
    transformLat(x, y) {
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformLon(x, y) {
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
        return ret;
    }
};

export default projcn;
