import {useEffect, useState} from 'react';
import {LeftCircleFilled, RightCircleFilled} from '@ant-design/icons';
import {Card, Table, Drawer} from 'antd';
import {useHistory} from 'umi';
import instance from '@/utils/request';
import url from '@/assets/api/url';
import HdPanel from '@/components/HdPanel';
import BdPanel from '@/components/BdPanel';
import {connect} from 'dva';
import _ from 'lodash';
import './index.less';

const MapLayout = ({children, setState}) => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [result, setResult] = useState([]);
    const [columns, setColumns] = useState([]);
    const [record, setRecord] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (history.location.pathname === '/hd') {
            getHdList();
        }
        if (history.location.pathname === '/bd') {
            getBdList();
        }
    }, [history]);

    const getBdList = () => {
        instance.post(url.getBdVersionList).then(res => {
            if (res?.ErrNo === 0) {
                res?.Data?.versions.forEach(version => {
                    version.key = _.uniqueId();
                });
                setResult(res?.Data?.versions);
                setColumns([
                    {
                        title: '版本名称',
                        dataIndex: 'versionname',
                        key: 'versionname'
                    },
                    {
                        title: '车厂',
                        dataIndex: 'vendorname',
                        key: 'vendorname'
                    },
                    {
                        title: '最近修改人',
                        dataIndex: 'modifyusername',
                        key: 'modifyusername'
                    },
                    {
                        title: '最近修改时间',
                        dataIndex: 'mtime',
                        key: 'mtime'
                    },
                    {
                        title: '场景',
                        dataIndex: 'scenename',
                        key: 'scenename'
                    }
                ]);
            }
        });
    };

    const getHdList = () => {
        instance.get(`${url.getHdVersionList}?isbase=0`).then(res => {
            if (res?.errno === 0) {
                res?.data?.forEach(version => {
                    version.key = _.uniqueId();
                });
                setState({versionId: window.localStorage.getItem('versionId') ? window.localStorage.getItem('versionId') - 0 : _.get(res, 'data[0].Id')});
                setResult(res?.data);
                setColumns([
                    {
                        title: '版本名称',
                        dataIndex: 'Name',
                        key: 'Name'
                    },
                    {
                        title: '车厂',
                        dataIndex: 'Oem',
                        key: 'Oem'
                    },
                    {
                        title: '车型',
                        dataIndex: 'Model',
                        key: 'Model'
                    },
                    {
                        title: '最近修改人',
                        dataIndex: 'UpdatedBy',
                        key: 'UpdatedBy'
                    },
                    {
                        title: '角色',
                        dataIndex: 'Role',
                        key: 'Role'
                    },
                    {
                        title: '最近修改时间',
                        dataIndex: 'UpdatedAt',
                        key: 'UpdatedAt'
                    },
                    {
                        title: '状态',
                        dataIndex: 'StateName',
                        key: 'StateName'
                    }
                ]);
            }
        });
    };

    const onIconClick = () => {
        setOpen(!open);
    };

    const onRowClick = record => {
        setState({versionId: record.Id});
        window.localStorage.setItem('versionId', record.Id);
        setRecord(record);
        setVisible(true);
        setOpen(false);
    };
    return (
        <>
            <div
                style={{
                    height: open ? 'calc(100% - 380px)' : '100%',
                    width: '100%',
                    background: 'red'
                }}
            >{children}</div>
            {
                open ? (
                    <Card style={{height: 380, overflow: 'scroll'}}>
                        <Table
                            rowKey="key"
                            bordered
                            dataSource={result}
                            columns={columns}
                            onRow={record => {
                                return {
                                    onClick: event => onRowClick(record)
                                };
                            }}
                        />
                    </Card>
                ) : null
            }
            <div
                style={{
                    cursor: 'pointer',
                    position: 'fixed',
                    left: 20,
                    bottom: 40,
                    zIndex: 10000
                }}
                onClick={onIconClick}
            >
                {
                    open ? <LeftCircleFilled style={{fontSize: 28}} /> : <RightCircleFilled style={{fontSize: 28}} />
                }
            </div>
            <Drawer
                open={visible}
                title="样式编辑看版"
                mask={false}
                onClose={() => setVisible(false)}
            >
                {
                    history.location.pathname === '/hd' ? <HdPanel record={record} /> : <BdPanel record={record} />
                }
            </Drawer>
        </>
    );
};

const mapStateToProps = ({mapstate}) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setState(data) {
            dispatch({type: 'mapstate/setState', data});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapLayout);
