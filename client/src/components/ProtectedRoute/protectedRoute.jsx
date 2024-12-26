import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { hideLoading, showLoading } from "../../store/loadingSlice";
import { getUserDetails } from "../../services/userInstance";
import { Link, useNavigate } from "react-router-dom";
import { setUserDetails } from "../../store/userSlice";
import { message, Layout, Menu } from "antd";
import {
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    UserOutlined,
  } from "@ant-design/icons"
  
  const { Header } = Layout;

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUserDetails = async () => {
        dispatch(showLoading());
        try {
            const data = await getUserDetails();
            if(data?.data) {
                dispatch(setUserDetails(data?.data));
                dispatch(hideLoading());
            }
            else {
                navigate("/login");
                message.error("Not a valid user");
                dispatch(hideLoading());
                dispatch(setUserDetails(null));
            }
        }
        catch(err) {
            navigate("/login");
            message.error(err.message);
            dispatch(hideLoading());
            dispatch(setUserDetails(null));
        }
    };

    const navItems = [
        {
          label: "Home",
          icon: <HomeOutlined />,
        },
        {
          label: `${user ? user.name : ""}`,
          icon: <UserOutlined />,
          children: [{
            label: (
              <span
                onClick={() => {
                  if (user.role === 'admin') {
                    navigate("/admin");
                  } else if (user.role === 'partner') {
                    navigate("/partner");
                  } else {
                    navigate("/profile");
                  }
                }}
              >
                My Profile
              </span>
            ),
            icon: <ProfileOutlined />,
          },
          {
            label: (
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Log Out
              </Link>
            ),
            icon: <LogoutOutlined />,
    
          }],
        },
      ];

    useEffect(() => {
        if(localStorage.getItem("token")) {
            fetchUserDetails();
        }
        else {
            navigate("/login");
        }
    }, []);

    return (
        user && (
          <>
            <Layout>
              <Header
                className="d-flex justify-content-between"
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
                  Book My Show
                </h3>
                <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
              </Header>
    
              <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
                {children}
              </div>
            </Layout>
          </>
        )
      );
};

export default ProtectedRoute;