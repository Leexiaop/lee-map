import {useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import menu from '@/routers/threejsRouter';
import {useHistory} from 'umi';
import {
    AlertOutlined,
    AppstoreAddOutlined,
    BankOutlined,
    AuditOutlined,
    BlockOutlined,
    BulbOutlined,
    AlignCenterOutlined,
    CoffeeOutlined,
    DollarOutlined,
    FileProtectOutlined,
    MergeCellsOutlined,
    ShakeOutlined,
    VideoCameraAddOutlined
} from '@ant-design/icons';
const {Sider, Content} = Layout;

const components = [
    <AlertOutlined key="1" />,
    <AppstoreAddOutlined key="2" />,
    <BankOutlined key="3" />,
    <AuditOutlined key="4" />,
    <BlockOutlined key="5" />,
    <BulbOutlined key="6" />,
    <AlignCenterOutlined key="7" />,
    <CoffeeOutlined key="8" />,
    <DollarOutlined key="9" />,
    <FileProtectOutlined key="10" />,
    <MergeCellsOutlined key="11" />,
    <ShakeOutlined key="12" />,
    <VideoCameraAddOutlined key="13" />
];
const ThreeJs = ({children}) => {
    const [items] = useState(() => {
        return menu.filter(me => me.key).map((me, index) => {
            return {
                ...me,
                icon: components[index]
            };
        });
    });
    const [selectedKey, setSelectedKey] = useState('5-1');
    const history = useHistory();

    useEffect(() => {
        setSelectedKey(items.find(item => history.location.pathname.indexOf(item.path) > -1)?.key);
    }, [history.location.pathname]);

    const onMenuChange = e => {
        setSelectedKey(e.key);
        history.push(items.find(item => item.key === e.key)?.path);
    };
    return (
        <Layout>
            <Sider>
                <Menu
                    theme="dark"
                    mode="vertical"
                    selectedKeys={selectedKey}
                    items={items}
                    onClick={onMenuChange}
                />
            </Sider>
            <Content>
                {children}
            </Content>
        </Layout>
    );
};

export default ThreeJs;
