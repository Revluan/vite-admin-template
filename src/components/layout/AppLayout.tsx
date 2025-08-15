import {
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
} from '@ant-design/icons';
import {
  PageContainer,
  ProConfigProvider,
  ProLayout,
} from '@ant-design/pro-components';
import { ConfigProvider, Dropdown } from 'antd';
import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { menuItems } from '@/routes/menuConfig';
// import SearchInput from './SearchInput';

const AppLayout: React.FC = () => {
  // const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
  //   fixSiderbar: true,
  //   layout: 'mix',
  //   splitMenus: true,
  // });

  const location = useLocation();
  const navigate = useNavigate();

  if (typeof document === 'undefined') {
    return <div />;
  }

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('test-pro-layout') || document.body;
          }}
        >
          <ProLayout
            prefixCls="my-prefix"
            layout="mix"
            fixSiderbar={true}
            splitMenus={false}
            siderMenuType='group'
            contentWidth='Fluid'
            route={{
              path: '/',
              routes: menuItems,
            }}
            location={{
              pathname: location.pathname,
            }}
            token={{
              header: {
                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
              },
            }}
            menu={{
              collapsedShowGroupTitle: true,
            }}
            avatarProps={{
              src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
              size: 'small',
              title: '七妮妮',
              render: (_, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'logout',
                          icon: <LogoutOutlined />,
                          label: '退出登录',
                          onClick: () => {
                            navigate('/login');
                          },
                        },
                      ],
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === 'undefined') return [];
              return [
                // props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                //   <SearchInput key="search" />
                // ) : undefined,
                <InfoCircleFilled key="InfoCircleFilled" />,
                <QuestionCircleFilled key="QuestionCircleFilled" />,
                // <GithubFilled key="GithubFilled" />,
              ];
            }}
            headerTitleRender={(logo, title, _) => {
              const defaultDom = (
                <a>
                  {logo}
                  {title}
                </a>
              );
              if (typeof window === 'undefined') return defaultDom;
              if (document.body.clientWidth < 1400) {
                return defaultDom;
              }
              if (_.isMobile) return defaultDom;
              return (
                <>
                  {defaultDom}
                </>
              );
            }}
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined;
              return (
                <div
                  style={{
                    textAlign: 'center',
                    paddingBlockStart: 12,
                  }}
                >
                  <div>© 2025 Made with love</div>
                  <div>By UCloud AI</div>
                </div>
              );
            }}
            onMenuHeaderClick={(e) => console.log(e)}
            menuItemRender={(item, dom) => (
              <div
                onClick={() => {
                  if (item.path?.startsWith('http')) {
                    window.open(item.path, item.target || '_self');
                  } else {
                    navigate(item.path || '/welcome');
                  }
                }}
              >
                {dom}
              </div>
            )}
            // {...settings}
          >
            <PageContainer>
              <Outlet />
            </PageContainer>

            {/* <SettingDrawer
              pathname={location.pathname}
              enableDarkTheme
              getContainer={(e: any) => {
                if (typeof window === 'undefined') return e;
                return document.getElementById('test-pro-layout');
              }}
              settings={settings}
              onSettingChange={(changeSetting) => {
                setSetting(changeSetting);
              }}
              disableUrlParams={false}
            /> */}
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};

export default AppLayout; 


// {
//   "fixSiderbar": true,
//   "layout": "mix",
//   "splitMenus": false,
//   "navTheme": "light",
//   "contentWidth": "Fluid",
//   "colorPrimary": "#1677FF",
//   "siderMenuType": "sub"
// }