import {useEffect, useState} from 'react';
import {SketchPicker} from 'react-color';
import {Divider} from 'antd';
import './index.less';

const ColorPicker = ({value, onChange}) => {
    const [visible, setVisible] = useState(false);
    const [colorV, setcolorV] = useState(value || {r: 0, g: 0, b: 0, a: 1});


    const colorRGB2Hex = (color) => {
        let r = parseInt(color.r, 10);
        let g = parseInt(color.g, 10);
        let b = parseInt(color.b, 10);

        let hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex;
    };

    const styleColor = `rgba(${colorV?.r || 0}, ${colorV?.g || 0}, ${colorV?.b || 0}, ${colorV?.a || 1})`;
    useEffect(() => {
        if (_.has(value, 'r')) {
            setcolorV(value);
        }
    }, [value]);

    const changeColor = (color) => {
        setcolorV(color.rgb);
        onChange && onChange(color.rgb);
    };
    return (
        <>
            <div onClick={() => setVisible(!visible)} className="im-color-show">
                <span className="color-value">{colorRGB2Hex(colorV)}</span>
                <Divider type="vertical" style={{top: 5}}/>
                <span className="color-btn-border">
                    <span className="color-btn" style={{background: styleColor}} />
                </span>
            </div>
            {
                visible ? <div className="im-color-panel">
                    <div className="color-cover" onClick={() => setVisible(false)}/>
                    <SketchPicker color={colorV} onChange={changeColor}/>
                </div> : null
            }
        </>
    );
};

export default ColorPicker;
