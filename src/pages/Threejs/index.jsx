import {useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import menu from '../../routers/threejsRouter';
import {useHistory} from 'umi';
const {Sider, Content} = Layout;

const ThreeJs = ({children}) => {
    const [items] = useState(() => {
        return menu.filter(me => me.key);
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
