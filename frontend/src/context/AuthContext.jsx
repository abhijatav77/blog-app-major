import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { BACKEND_URL } from "../../utils/utils";

const AuthContext = createContext();

//provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])
    const [admins, setAdmins] = useState([])
    const [adminBlogs, setAdminBlogs] = useState([])


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(
                    `${BACKEND_URL}/user/my-profile`,
                    { withCredentials: true }
                );

                setUser(data.userData);
                setIsAuthenticated(true);
                setRole(data.userData.role);
            } catch (error) {
                setIsAuthenticated(false);
                setRole(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true)
            setRole(user.role)
        } else {
            setIsAuthenticated(false)
            setRole(null)
        }
    }, [user])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                setBlogs([])
                setAdminBlogs([])

                //fetch blogs
                const blogRes = await axios.get(`${BACKEND_URL}/blog/blogs`, { withCredentials: true })
                setBlogs(blogRes.data.blogs)

                const adminRes = await axios.get(`${BACKEND_URL}/user/admins`, { withCredentials: true })
                setAdmins(adminRes.data.adminData)

                const adminBlogRes = await axios.get(`${BACKEND_URL}/blog/specific-blogs`, { withCredentials: true })
                setAdminBlogs(adminBlogRes.data.blogs)
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [user])

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        setRole(null)
        setBlogs([])
        setAdmins([])
        setAdminBlogs([])
    }

    return (
        <AuthContext.Provider value={{ user, setUser, adminBlogs, isAuthenticated, setIsAuthenticated, loading, role, setRole, blogs, admins, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}