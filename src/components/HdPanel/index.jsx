import {useEffect, useState} from 'react';
import instance from '@/utils/request';
import url from '@/assets/api/url';
import {connect} from 'umi';
import {Select, Card, Tree, Form} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import ColorPicker from '@/components/ColorPicker';
import UploadFile from '@/components/UploadFile';


const scenceList = ['白天', '清晨', '黄昏', '夜晚'];

const HdPanel = ({setState, styleOperate, record}) => {
    // const [colorList, setColorList] = useState([]);
    // const [modelList, setModelList] = useState([]);
    // const [styleList, setStyleList] = useState([]);
    // const [textureList, setTextureList] = useState([]);
    const [featureList, setFeatureList] = useState([]);
    const [editVisible, setEditVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        setState({styleOperate: {...styleOperate, scenceId: 1}});
        initData();
    }, [record]);

    const initData = () => {
        instance.post(url.getFeatureList, {VersionId: record.Id}).then(res => {
            if (res?.errno === 0) {
                let firstNodes = [];
                // 设置一级节点
                res.data?.forEach((item, index) => {
                    item.key = item.Id;
                    item.title = item.Name;
                    item.checked = item.Display;
                    item.children = [];
                    item.featureClass = (item.Parent === -1) ? item.Code : item.Parent;
                    item.featureSubClass = (item.Parent === -1) ? 0 : item.Code;
                    if (item.Parent === -1 && item.Editable) {
                        firstNodes?.push(item);
                    }
                });
                // 设置二级节点
                res.data?.forEach(item => {
                    let firstNode = _.find(firstNodes, {Code: item.Parent});
                    if (firstNode && item.Parent !== -1 && item.Editable) {
                        firstNode?.children.push(item);
                    }
                });
                setFeatureList(firstNodes);
            }
        });
    };

    const onScenceChange = e => {
        setState({styleOperate: {...styleOperate, scenceId: e}});
    };

    const onTreeSelect = e => {
        setEditVisible(true);
    };
    return (
        <>
            <Card className="panelTree" bordered={false}>
                <h2>{record.Name}</h2>
                <Select style={{width: '100%'}} value={styleOperate?.scenceId} onChange={onScenceChange}>
                    {
                        scenceList?.map((scence, index) => {
                            return <Select.Option key={scence} value={index + 1}>{scence}</Select.Option>;
                        })
                    }
                </Select>
                <Tree
                    treeData={featureList}
                    onSelect={onTreeSelect}
                />
            </Card>
            {
                editVisible
                    ? <Card
                        className="styleEdit"
                        bordered
                        title="样式编辑"
                        extra={<CloseOutlined onClick={() => setEditVisible(false)}/>}
                    >
                        <Form
                            form={form}
                        >
                            <Form.Item label="颜色">
                                <ColorPicker />
                            </Form.Item>
                            <Form.Item label="纹理">
                                <UploadFile />
                            </Form.Item>
                            <Form.Item label="模型">
                                <UploadFile />
                            </Form.Item>
                        </Form>
                    </Card> : null
            }
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HdPanel);
