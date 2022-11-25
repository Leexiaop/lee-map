import {useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import logo from '../assets/texture/logo.png';
import {useHistory} from 'umi';
import menu from '../routers';
import './index.less';

const {Header, Content} = Layout;

const IndexPage = (props) => {
    const [selectedKey, setSelectedKey] = useState('1');
    const [items] = useState(() => {
        return menu.filter(me => me.key);
    });
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
            <Header>
                <img src={logo} className="logo" />
                <Menu
                    style={{
                        width: '100%'
                    }}
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={selectedKey}
                    items={items}
                    onClick={onMenuChange}
                />
            </Header>
            <Content>{props.children}</Content>
        </Layout>
    );
};

export default IndexPage;
