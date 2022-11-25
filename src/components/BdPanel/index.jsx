import {useEffect, useState} from 'react';
import instance from '@/utils/request';
import url from '@/assets/api/url';
import {connect} from 'umi';
import {Select, Card, Tree} from 'antd';
import ColorPicker from '@/components/ColorPicker';
import _ from 'lodash';
const BdPanel = ({setState, styleOperate, record}) => {
    const [scenceList, setScenceList] = useState([]);
    const [treeList, setTreeList] = useState([]);

    useEffect(() => {
        instance.post(url.getBdVersionScence, {
            vid: record.id
        }).then(res => {
            if (res.ErrNo === 0) {
                setScenceList(res?.Data?.scences);
                setState({styleOperate: {...styleOperate, scenceId: res?.Data?.scences[0]?.id}});
            }
        });
    }, [record]);

    useEffect(() => {
        const scenceObj = scenceList.find(scence => scence.id === styleOperate.scenceId);
        if (styleOperate.scenceId && !_.isEmpty(scenceObj)) {
            instance.post(url.getSearchStyle, {
                mode: 'mode_17',
                scence: scenceObj?.scence,
                scid: styleOperate.scenceId
            }).then((res) => {
                let result = [];
                styleTreeTransform(res.Data, result);
                result.forEach((v, i) => {
                    v.children.forEach((h, j) => {
                        result = h.children;
                    });
                });
                setTreeList(result);
            });
        }
    }, [styleOperate.scenceId, scenceList]);


    const styleTreeTransform = (data, result) => {
        if (data[0] === undefined) {
            Object.getOwnPropertyNames(data).forEach((key) => {
                let children = [];
                styleTreeTransform(data[key], children);
                result.push({title: key, key: _.uniqueId('key'), children: children});
            });
        } else {
            data.forEach((v, i) => {
                result.push({title: v.name, key: _.uniqueId('key'), styleid: v.styleid});
            });
        }
        return result;
    };

    const onScenceChange = e => {
        setState({styleOperate: {...styleOperate, scenceId: e}});
    };

    return (

        <Card className="panelTree" bordered={false}>
            <h2>{record.versionname}</h2>
            <Select style={{width: '100%'}} value={styleOperate?.scenceId} onChange={onScenceChange}>
                {
                    scenceList?.map(scence => {
                        return <Select.Option key={scence.id} value={scence.id}>{scence.scenename}</Select.Option>;
                    })
                }
            </Select>
            <div style={{display: 'flex', alignItems: 'center', marginTop: 8}}>
                <span style={{whiteSpace: 'nowrap'}}>地图底色：</span>
                <ColorPicker />
            </div>
            <Tree
                treeData={treeList}
            />
        </Card>
    );
};

const mapStateToProps = ({mapstate}) => {
    return {
        styleOperate: mapstate.styleOperate
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setState(data) {
            dispatch({type: 'mapstate/setState', data});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BdPanel);

